import isEmpty from "lodash.isempty";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Database/Action/ConstantAction";
import { postHeaderWithoutToken } from "../../Database/Utils";
import Cookies from "universal-cookie";
import { getNewDeviceList } from "../../Database/Action/DashboardAction";
import NoData from "../Components/NoData";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  
  // State for login information
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  
  // State for map functionality
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  
  // Get device data from Redux store
  const newDeviceList = useSelector((state) => state.DashboardReducer.newDeviceList);
  const apistate = useSelector((state) => state.ConstantReducer.apistate);
  
  // Default center coordinates for India
  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
  };
  
  // Define colors for different donors
  const donorColors = {
    "Luminous": "#3498db",
    "Royal Rajasthan Foundation": "#e84393",
    "default": "#2ecc71"
  };

  // Login function
  const loginUser = () => {
    if (isEmpty(loginInfo.userName)) {
      toast.error("Failed! Please Enter UserName");
    } else if (isEmpty(loginInfo.password)) {
      toast.error("Failed! Please Enter Password");
    } else {
      dispatch(setLoader(true));
      let formData = new FormData();
      formData.append("userId", loginInfo.userName);
      formData.append("pass", loginInfo.password);
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "loginAdmin",
          formData,
          postHeaderWithoutToken
        )
        .then((res) => {
          dispatch(setLoader(false));
          const rememberMe = {
            rememberToken: res?.data?.token,
            checkState: loginInfo.rememberMe
          }
          cookies.set("adminToken", res?.data?.token, { path: "/" });
          cookies.set("rememberMe", JSON.stringify(rememberMe), { path: "/" });
          navigate("/dashboard");
          window.location.reload(false);
          toast.success(res.data.message);
        })
        .catch((error) => {
          dispatch(setLoader(false));
          console.log("error is     ", error);
          toast.error(error?.response?.data?.message || error.message);
        });
    }
  };

  const callRememberMe = () => {
    const rememberMe = cookies.get("rememberMe");
    const config = {
      headers: {
        Accept: "*/*",
        Authorization: rememberMe.rememberToken,
      }
    }
    axios
      .get(
        process.env.REACT_APP_BASE_URL + "rememberMe",
        config
      )
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setLoader(false));
          const info = res?.data?.info;
          setLoginInfo({ ...loginInfo, userName: info.username, password: info.password, rememberMe: true })
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        cookies.remove("rememberMe");
        setLoginInfo({ ...loginInfo, userName: "", password: "", rememberMe: false })
        toast.error("Failed! Session has been expired");
        console.log("error is     ", error);
      });
  }

  // Load Leaflet CSS and JS
  const loadLeaflet = () => {
    return new Promise((resolve, reject) => {
      if (window.L) {
        resolve(window.L);
        return;
      }

      // Load CSS
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(css);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.async = true;

      script.onload = () => {
        if (window.L) {
          resolve(window.L);
        } else {
          reject(new Error('Leaflet failed to load'));
        }
      };

      script.onerror = () => reject(new Error('Failed to load Leaflet'));
      document.head.appendChild(script);
    });
  };

  // Initialize map
  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      const L = await loadLeaflet();

      // Create map centered on India
      const map = L.map(mapRef.current).setView([defaultCenter.lat, defaultCenter.lng], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      leafletMapRef.current = map;
      setMapLoaded(true);

      // Add markers if devices are already loaded
      if (newDeviceList && newDeviceList.length > 0) {
        addMarkersToMap(L, map);
      }
    } catch (error) {
      console.error('Error loading Leaflet:', error);
    }
  };

  // Add markers to the map
  const addMarkersToMap = (L, map) => {
    // Clear existing markers
    clearMarkers();

    if (!newDeviceList || newDeviceList.length === 0) return;

    markersRef.current = newDeviceList.map(item => {
      // Skip items without valid coordinates
      if (!item.Location) return null;

      try {
        const [lat, lng] = item.Location.split(',').map(coord => parseFloat(coord.trim()));
        if (isNaN(lat) || isNaN(lng)) return null;

        // Get color based on donor
        const color = donorColors[item.DonarName] || donorColors.default;

        // Create custom icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        // Create marker with custom icon
        const marker = L.marker([lat, lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 10px; color: ${color};">${item.DonarName || 'Unknown Donor'}</h3>
              <p><strong>Device UID:</strong> ${item.UID}</p>
              <p><strong>Beneficiary:</strong> ${item.NameOfBeneficiary || 'N/A'}</p>
              <p><strong>Village:</strong> ${item.VillageName || 'N/A'}</p>
              <p><strong>Block:</strong> ${item.Block || 'N/A'}</p>
              <p><strong>District:</strong> ${item.District || 'N/A'}</p>
              <p><strong>State:</strong> ${item.State || 'N/A'}</p>
              ${item.InstallationDate ? `<p><strong>Installation Date:</strong> ${item.InstallationDate}</p>` : ''}
            </div>
          `);

        // Add click event to marker
        marker.on('click', () => {
          setSelectedDevice(item);
        });

        return marker;
      } catch (error) {
        console.error('Error creating marker for item:', item, error);
        return null;
      }
    }).filter(marker => marker !== null);
  };

  // Clear all markers from the map
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker && leafletMapRef.current) {
        leafletMapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];
  };

  // Filter devices by donor
  const filterByDonor = (donorName) => {
    if (!leafletMapRef.current || !window.L || !newDeviceList) return;

    // Clear existing markers
    clearMarkers();

    // Add filtered markers
    const filteredDevices = donorName ? newDeviceList.filter(item => item.DonarName === donorName) : newDeviceList;

    // Create new markers for filtered devices
    markersRef.current = filteredDevices.map(item => {
      if (!item.Location) return null;

      try {
        const [lat, lng] = item.Location.split(',').map(coord => parseFloat(coord.trim()));
        if (isNaN(lat) || isNaN(lng)) return null;

        const color = donorColors[item.DonarName] || donorColors.default;

        const customIcon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = window.L.marker([lat, lng], { icon: customIcon })
          .addTo(leafletMapRef.current)
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 10px; color: ${color};">${item.DonarName || 'Unknown Donor'}</h3>
              <p><strong>Device UID:</strong> ${item.UID}</p>
              <p><strong>Beneficiary:</strong> ${item.NameOfBeneficiary || 'N/A'}</p>
              <p><strong>Village:</strong> ${item.VillageName || 'N/A'}</p>
              <p><strong>Block:</strong> ${item.Block || 'N/A'}</p>
              <p><strong>District:</strong> ${item.District || 'N/A'}</p>
              <p><strong>State:</strong> ${item.State || 'N/A'}</p>
              ${item.InstallationDate ? `<p><strong>Installation Date:</strong> ${item.InstallationDate}</p>` : ''}
            </div>
          `);

        marker.on('click', () => {
          setSelectedDevice(item);
        });

        return marker;
      } catch (error) {
        console.error('Error creating marker for item:', item, error);
        return null;
      }
    }).filter(marker => marker !== null);

    setSelectedDevice(null);
  };

  // Fetch device data from API using Redux action
  useEffect(() => {
    dispatch(getNewDeviceList({ navigate: navigate }));
  }, [dispatch, apistate]);

  // Add markers to the map when devices data is available
  useEffect(() => {
    if (mapLoaded && newDeviceList && newDeviceList.length > 0 && window.L && leafletMapRef.current) {
      addMarkersToMap(window.L, leafletMapRef.current);
    }
  }, [newDeviceList, mapLoaded]);

  // Initialize map on component mount
  useEffect(() => {
    initializeMap();

    // Cleanup function to remove map on component unmount
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }
    };
  }, []);

  // Check for remember me functionality
  useEffect(() => {
    const rememberMe = cookies.get("rememberMe");
    if (rememberMe !== undefined) {
      if (rememberMe?.checkState === true) {
        callRememberMe()
      }
    }
  }, []);

  // Get unique donors from devices
  const uniqueDonors = newDeviceList ? [...new Set(newDeviceList.map(item => item.DonarName))].filter(Boolean) : [];

  return (
    <Wrapper>
      <div className="split-container">
        {/* Left side - 60% Map */}
        <div className="map-section">
          <div className="box">
            <div className="box-header with-border d-flex justify-content-between align-items-center">
            
              <h2 className="box-title mb-0"> Our All Device Locations By All Doners</h2>

              {/* {newDeviceList && newDeviceList.length > 0 && (
                <div className="mx-auto" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <h3 className="text-lg font-semibold mb-0">Filter by Donor:</h3>
                  <select
                    className="px-3 py-2 border rounded-md text-sm"
                    onChange={(e) => filterByDonor(e.target.value || null)}
                    defaultValue=""
                  >
                    <option value="">All Donors</option>
                    {uniqueDonors.map((donor) => (
                      <option key={donor} value={donor}>
                        {donor}
                      </option>
                    ))}
                  </select>
                </div>
              )} */}

         
              {/* <div>
                <button
                  className="filterButton"
                  onClick={() => {
                    dispatch(getNewDeviceList({ navigate: navigate }));
                    if (leafletMapRef.current) {
                      leafletMapRef.current.setView([defaultCenter.lat, defaultCenter.lng], 5);
                    }
                  }}
                >
                  <i className="fa-solid fa-refresh" style={{ marginRight: "10px" }} />
                  Refresh
                </button>
              </div> */}
            </div>

            <div className="box-body" style={{ padding: "0px" }}>
              <div className="mb-6">
                <div
                  ref={mapRef}
                  className="w-full h-96 border-2 border-gray-300 rounded-lg bg-gray-100"
                  style={{ minHeight: '500px' }}
                >
                  {!mapLoaded && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-4">
                        <div className="text-lg font-semibold mb-2">🗺️ Loading Map...</div>
                        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                      </div>
                    </div>
                  )}
                  {mapLoaded && (!newDeviceList || newDeviceList.length === 0) && (
                    <div className="flex items-center justify-center h-full">
                      <NoData message="No device data available" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - 40% Login Form */}
        <div className="login-section">
          <div className="login-container">
            <div className="login-header">
              <h2>Let's Get Started...2</h2>
              <p>Sign in to continue to Solar Admin.</p>
            </div>
            
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <span className="input-icon">
                    <i className="ti-user"></i>
                  </span>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={loginInfo.userName}
                    onChange={(e) =>
                      setLoginInfo({
                        ...loginInfo,
                        userName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <span className="input-icon">
                    <i className="ti-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={loginInfo.password}
                    onChange={(e) =>
                      setLoginInfo({
                        ...loginInfo,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={loginInfo.rememberMe}
                    onChange={(e) =>
                      setLoginInfo({
                        ...loginInfo,
                        rememberMe: !loginInfo.rememberMe,
                      })
                    }
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
              </div>
              
              <button
                type="button"
                className="login-button"
                onClick={loginUser}
              >
                SIGN IN
              </button>
            </div>
            
            <div className="login-footer">
              <p>Need help? Contact support</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .split-container {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  
  .map-section {
    width: 65%;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    padding: 5px;
    overflow: auto;
  }
  
  .login-section {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    // background-color: #8c8e94
    padding: 20px;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 30px;
    
    h2 {
      color: #F26B0F;
      margin: 0 0 10px;
      font-weight: 600;
    }
    
    p {
      color: #666;
      margin: 0;
    }
  }
  
  .login-form {
    .form-group {
      margin-bottom: 20px;
      
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
      }
    }
    
    .input-group {
      position: relative;
      display: flex;
      align-items: center;
      
      .input-icon {
        position: absolute;
        left: 12px;
        color: #999;
        z-index: 1;
      }
      
      input {
        width: 100%;
        padding: 12px 12px 12px 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.2s;
        
        &:focus {
          outline: none;
          border-color: #3498db;
        }
      }
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      .remember-me {
        display: flex;
        align-items: center;
        
        input {
          margin-right: 8px;
        }
        
        label {
          margin: 0;
          color: #666;
        }
      }
    }
    
    .login-button {
      width: 100%;
      padding: 12px;
      background-color: #F26B0F;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #e05d0a;
      }
    }
  }
  
  .login-footer {
    text-align: center;
    margin-top: 30px;
    
    p {
      color: #999;
      font-size: 14px;
    }
  }
  
  .box {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    width: 100%;
  }
  
  .box-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .box-body {
    padding: 20px;
  }
  
  .filterButton {
    background: #F26B0F;
    padding: 8px 16px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #e05d0a;
    }
  }
  
  @media (max-width: 992px) {
    .split-container {
      flex-direction: column;
    }
    
    .map-section,
    .login-section {
      width: 100%;
    }
    
    .map-section {
      height: 50%;
    }
    
    .login-section {
      height: 50%;
    }
  }
`;

export default Register;