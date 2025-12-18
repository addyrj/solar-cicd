import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { changeApistate, setLoader } from '../../../Database/Action/ConstantAction';
import { postHeaderWithToken } from '../../../Database/Utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateNewCharger = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Corrected: Access internationalDonor instead of internationalDonors
  const internationalDonors = useSelector((state) => state.DashboardReducer.internationalDonor || []);
  
  const [chargerInfo, setChargerInfo] = useState({
    UID: "",
    Country: "",
    State: "",
    District: "",
    Block: "",
    VillageName: "",
    NameOfBeneficiary: "",
    BeneficiaryPno: "",
    Location: "",
    SolarEngineerName: "",
    SolarEngineerPno: "",
    GCName: "",
    GCPhoneNumber: "",
    DonarName: "",
    InstallationDate: "",
    PanchayatSamiti: ""
  });

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setChargerInfo({
        UID: "",
        Country: "",
        State: "",
        District: "",
        Block: "",
        VillageName: "",
        NameOfBeneficiary: "",
        BeneficiaryPno: "",
        Location: "",
        SolarEngineerName: "",
        SolarEngineerPno: "",
        GCName: "",
        GCPhoneNumber: "",
        DonarName: "",
        InstallationDate: "",
        PanchayatSamiti: ""
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setChargerInfo({ ...chargerInfo, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setChargerInfo((prev) => ({ ...prev, Location: coords }));
        toast.success("Location captured successfully");
      },
      (error) => {
        toast.error("Unable to retrieve location");
        console.error("Location error:", error);
      }
    );
  };

  const validateForm = () => {
    if (!chargerInfo.UID) {
      toast.error("UID is required");
      return false;
    }
    if (!chargerInfo.Country) {
      toast.error("Country is required");
      return false;
    }
    return true;
  };

  const createChargerController = async () => {
    if (!validateForm()) return;

    try {
      const token = await postHeaderWithToken();
      dispatch(setLoader(true));

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "createNewDevice",
        chargerInfo,
        token
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        dispatch(changeApistate());
        
        // Reset form
        setChargerInfo({
          UID: "",
          Country: "",
          State: "",
          District: "",
          Block: "",
          VillageName: "",
          NameOfBeneficiary: "",
          BeneficiaryPno: "",
          Location: "",
          SolarEngineerName: "",
          SolarEngineerPno: "",
          GCName: "",
          GCPhoneNumber: "",
          DonarName: "",
          InstallationDate: "",
          PanchayatSamiti: ""
        });
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Close the modal
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error creating device:", error);
      if (error?.response?.data?.status === 302) {
        navigate("/");
        window.location.reload(false);
      }
      toast.error(error?.response?.data?.message || "Failed to create device");
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createChargerController();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createModalLabel">
              Create New Charger Controller
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="box">
            
              <form onSubmit={handleSubmit}>
                <div className="box-body">
                  <div className="form-group">
                    <label className="form-label">UID *</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-id-card"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="UID" 
                        value={chargerInfo.UID} 
                        onChange={handleChange} 
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-flag"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="Country" 
                        value={chargerInfo.Country} 
                        onChange={handleChange} 
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-globe"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="State" 
                        value={chargerInfo.State} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">District</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-map-location-dot"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="District" 
                        value={chargerInfo.District} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Block</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-map"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="Block" 
                        value={chargerInfo.Block} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Village Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="VillageName" 
                        value={chargerInfo.VillageName} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Beneficiary Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="NameOfBeneficiary" 
                        value={chargerInfo.NameOfBeneficiary} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Beneficiary Phone</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="BeneficiaryPno" 
                        value={chargerInfo.BeneficiaryPno} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location Coordinates</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-location-crosshairs"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="Location" 
                        value={chargerInfo.Location} 
                        onChange={handleChange} 
                        placeholder="lat,long" 
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={getLocation}
                      >
                        <i className="fa-solid fa-location-crosshairs me-2"></i>
                        Get Location
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Solar Engineer Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user-gear"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="SolarEngineerName" 
                        value={chargerInfo.SolarEngineerName} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Solar Engineer Phone</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="SolarEngineerPno" 
                        value={chargerInfo.SolarEngineerPno} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">GC Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user-tie"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="GCName" 
                        value={chargerInfo.GCName} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">GC Phone Number</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="GCPhoneNumber" 
                        value={chargerInfo.GCPhoneNumber} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Donar Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-hand-holding-heart"></i>
                      </span>
                      <select 
                        className="form-control" 
                        name="DonarName" 
                        value={chargerInfo.DonarName} 
                        onChange={handleChange}
                      >
                        <option value="">Select Donor</option>
                        {internationalDonors.map((donor) => (
                          <option key={donor.ID} value={donor.DonarOrganisation}>
                            {donor.DonarOrganisation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Installation Date</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-calendar-days"></i>
                      </span>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="InstallationDate" 
                        value={chargerInfo.InstallationDate} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Panchayat Samiti</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-users"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="PanchayatSamiti" 
                        value={chargerInfo.PanchayatSamiti} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>
                </div>

                <div className="box-footer" style={{ float: "right", width: 'auto' ,borderColor: "transparent" }}>
                  <button 
                    type="button" 
                    className="btn btn-primary-light me-1" 
                    onClick={handleClose}
                  >
                    <i className="ti-trash" /> Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    <i className="ti-save-alt" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCharger;