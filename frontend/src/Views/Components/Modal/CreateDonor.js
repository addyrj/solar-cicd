import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { changeApistate, setLoader } from '../../../Database/Action/ConstantAction';
import { postHeaderWithToken } from '../../../Database/Utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateDonor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [donorInfo, setDonorInfo] = useState({
    country: null,
    organisation: null,
    contactPerson: null,
    mobile: null,
    email: null,
    address: null,
    loginUserName: null,
    loginPassword: null
  })

  const handleChange = (e) => {
    setDonorInfo({ ...donorInfo, [e.target.name]: e.target.value })
  }

  const createDonor = async () => {
    const token = await postHeaderWithToken();
    let formdata = new FormData();
    formdata.append("country", donorInfo.country);
    formdata.append("organisation", donorInfo.organisation);
    formdata.append("contactPerson", donorInfo.contactPerson);
    formdata.append("mobile", donorInfo.mobile);
    formdata.append("email", donorInfo.email);
    formdata.append("address", donorInfo.address);
    formdata.append("loginUserName", donorInfo.loginUserName);
    formdata.append("loginPassword", donorInfo.loginPassword);
    dispatch(setLoader(true))

    axios.post(process.env.REACT_APP_BASE_URL + "createInternationalDonor", formdata, token)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setLoader(false));
          dispatch(changeApistate());
          toast.success(res?.data?.message);
          window.location.reload(false)
        }
      })
      .catch((error) => {
        console.log("error is    ", error)
        dispatch(setLoader(false));
        if (error?.response?.data?.status === 302) {
          navigate("/")
          window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message);
      })
  }
  return (
    <div className="box">
      <div className="box-header with-border">
        <h4 className="box-title">Create International Donor</h4>
      </div>
      {/* /.box-header */}
      <div className="box-body">
        <div className="form-group">
          <label className="form-label">Country</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-flag"></i>
            </span>
            <input type="text" className="form-control" name="country" value={donorInfo.country} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Organisation</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-globe"></i>
            </span>
            <input type="email" className="form-control" name="organisation" value={donorInfo.organisation} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Contact Person</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-map-location-dot"></i>
            </span>
            <input type="email" className="form-control" name="contactPerson" value={donorInfo.contactPerson} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Mobile</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-location-dot"></i>
            </span>
            <input type="email" className="form-control" name="mobile" value={donorInfo.mobile} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-heading"></i>
            </span>
            <input type="email" className="form-control" name="email" value={donorInfo.email} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </span>
            <input type="email" className="form-control" name="address" value={donorInfo.address} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Login User Name</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-handshake"></i>
            </span>
            <input type="email" className="form-control" name="loginUserName" value={donorInfo.loginUserName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Login Password</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="password" className="form-control" name="loginPassword" value={donorInfo.loginPassword} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="box-footer" style={{ float: "right", width: 'auto' }}>
        <button type="button" className="btn btn-primary-light me-1" data-bs-dismiss="modal">
          <i className="ti-trash" /> Cancel
        </button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => createDonor()}>
          <i className="ti-save-alt" /> Save
        </button>
      </div>
    </div>
  )
}

export default CreateDonor