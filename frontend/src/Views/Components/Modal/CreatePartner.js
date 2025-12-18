import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { changeApistate, setLoader } from '../../../Database/Action/ConstantAction';
import { postHeaderWithToken } from '../../../Database/Utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMobileDevice } from '../../../Database/Action/DashboardAction';

const CreatePartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainMobileDevice = useSelector((state) => state.DashboardReducer.mainMobileDevice);

  const [partnerInfo, setPartnerInfo] = useState({
    country: null,
    organisation: null,
    contactPerson: null,
    email: null,
    device: null,
    loginUserName: null,
    loginPassword: null,
    baseLinePlanDate: null,
    baseLineCompleteDate: null,
    monitorPlanDate: null,
    monitorCompleteDate: null,
    evalutionPlanDate: null,
    evalutionCompleteDate: null,
  })

  const handleChange = (e) => {
    setPartnerInfo({ ...partnerInfo, [e.target.name]: e.target.value })
  }

  const createPartner = async () => {
    const token = await postHeaderWithToken();
    let formdata = new FormData();
    formdata.append("country", partnerInfo.country);
    formdata.append("organisation", partnerInfo.organisation);
    formdata.append("contactPerson", partnerInfo.contactPerson);
    formdata.append("email", partnerInfo.email);
    formdata.append("device", partnerInfo.device);
    formdata.append("loginUserName", partnerInfo.loginUserName);
    formdata.append("loginPassword", partnerInfo.loginPassword);
    formdata.append("baseLinePlanDate", partnerInfo.baseLinePlanDate);
    formdata.append("baseLineCompleteDate", partnerInfo.baseLineCompleteDate);
    formdata.append("monitorPlanDate", partnerInfo.monitorPlanDate);
    formdata.append("monitorCompleteDate", partnerInfo.monitorCompleteDate);
    formdata.append("evalutionPlanDate", partnerInfo.evalutionPlanDate);
    formdata.append("evalutionCompleteDate", partnerInfo.evalutionCompleteDate);
    dispatch(setLoader(true))

    axios.post(process.env.REACT_APP_BASE_URL + "createInternationalPartner", formdata, token)
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

  useEffect(() => {
    dispatch(getMobileDevice({ navigate: navigate }));
  }, [])
  return (
    <div className="box">
      <div className="box-header with-border">
        <h4 className="box-title">Create International Partner</h4>
      </div>
      {/* /.box-header */}
      <div className="box-body">
        <div className="form-group">
          <label className="form-label">Country</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-flag"></i>
            </span>
            <input type="text" className="form-control" name="country" value={partnerInfo.country} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Organisation</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-globe"></i>
            </span>
            <input type="text" className="form-control" name="organisation" value={partnerInfo.organisation} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Contact Person</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-map-location-dot"></i>
            </span>
            <input type="text" className="form-control" name="contactPerson" value={partnerInfo.contactPerson} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" className="form-control" name="email" value={partnerInfo.email} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Login User Name</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-handshake"></i>
            </span>
            <input type="text" className="form-control" name="loginUserName" value={partnerInfo.loginUserName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Login Password</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input type="password" className="form-control" name="loginPassword" value={partnerInfo.loginPassword} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Device</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-mobile"></i>
            </span>
            <select className="form-control" onChange={(e) => setPartnerInfo({ ...partnerInfo, device: e.target.value })}>
              {mainMobileDevice.length !== 0 && mainMobileDevice.map((item) => {
                return (
                  <option value={item?.Device}>{item?.Device}</option>
                )
              })}
            </select>
            {/* <input type="text" className="form-control" name="device" value={partnerInfo.device} onChange={handleChange} /> */}
          </div>
        </div>
        {/*  */}

        <div className="form-group">
          <label className="form-label">Baseline Plan Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="baseLinePlanDate" value={partnerInfo.baseLinePlanDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Baseline Complete Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="baseLineCompleteDate" value={partnerInfo.baseLineCompleteDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Monitor Plan Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="monitorPlanDate" value={partnerInfo.monitorPlanDate} onChange={handleChange} />
          </div>
        </div>


        <div className="form-group">
          <label className="form-label">Monitor Complete Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="monitorCompleteDate" value={partnerInfo.monitorCompleteDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Evaluation Plan Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="evalutionPlanDate" value={partnerInfo.evalutionPlanDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Evaluation Complete Date</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <input type="date" className="form-control" name="evalutionCompleteDate" value={partnerInfo.evalutionCompleteDate} onChange={handleChange} />
          </div>
        </div>

      </div>
      <div className="box-footer" style={{ float: "right", width: 'auto' }}>
        <button type="button" className="btn btn-primary-light me-1" data-bs-dismiss="modal">
          <i className="ti-trash" /> Cancel
        </button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => createPartner()}>
          <i className="ti-save-alt" /> Save
        </button>
      </div>
    </div>
  )
}

export default CreatePartner