import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNewDeviceList,getInternationalDonor } from "../../Database/Action/DashboardAction";
import NoData from "../Components/NoData";

// Default center coordinates for India
const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629
};

const DeviceMap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Get device data from Redux store
  const newDeviceList = useSelector((state) => state.DashboardReducer.newDeviceList);
  const apistate = useSelector((state) => state.ConstantReducer.apistate);

  // Define colors for different donors
  const donorColors = {
    "Luminous": "#3498db", // Blue
    "Royal Rajasthan Foundation": "#e84393", // Pink
    "default": "#2ecc71" // Green for any other donors
  };

  // Fetch device data from API using Redux action
  useEffect(() => {
    dispatch(getNewDeviceList({ navigate: navigate }));
  }, [dispatch, apistate]);

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

  // Get unique donors from devices
  const uniqueDonors = newDeviceList ? [...new Set(newDeviceList.map(item => item.DonarName))].filter(Boolean) : [];

  return (
    <Wrapper>
      <div className="content-wrapper">
        <div className="container-full">
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="me-auto">
                <h3 className="page-title">Device Location Map</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">
                          <i className="mdi mdi-home-outline" />
                        </a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Maps
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Device Locations
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="row">
                    <div className="box-header with-border d-flex justify-content-between align-items-center">
                      {/* Left side: Title */}
                      <h4 className="box-title mb-0">Device Locations</h4>

                      {/* Center: Donor Dropdown */}
                      {newDeviceList && newDeviceList.length > 0 && (

                  <div className="mx-auto" style={{ display: "flex", gap: "19px" }}>
                          <h3 className="text-lg font-semibold mb-3">Filter by Donor:</h3>
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
                      )}

                      {/* Right side: Refresh button */}
                      <div>
                        <button
                          className="filterButton"
                          onClick={() => window.location.reload()}
                        >
                          <i className="fa-solid fa-refresh" style={{ marginRight: "10px" }} />
                          Refresh
                        </button>
                      </div>
                    </div>
                  </div>


                  <div className="box-body" style={{ padding:"0px" }}>


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
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .filterButton {
    background: ${({ theme }) => theme.colors.themeColor};
    padding: 10px 20px 10px 20px;
    color: white;
    margin: 5px;
    &:hover,
    &:active {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.themeColor};
      transform: scale(0.96);
    }
  }
`;

export default DeviceMap; 