import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { changeApistate, setLoader } from '../../../Database/Action/ConstantAction';
import { postHeaderWithToken } from '../../../Database/Utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateMobileDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deviceInfo, setDeviceInfo] = useState({
    device: null,
  })

  const handleChange = (e) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value })
  }

  const createDevice = async () => {
    const token = await postHeaderWithToken();
    let formdata = new FormData();
    formdata.append("device", deviceInfo.device);
    dispatch(setLoader(true))

    axios.post(process.env.REACT_APP_BASE_URL + "createMobileDevice", formdata, token)
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
        <h4 className="box-title">Create Mobile Device</h4>
      </div>
      {/* /.box-header */}
      <div className="box-body">
        <div className="form-group">
          <label className="form-label">Device Description</label>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-flag"></i>
            </span>
            <input type="text" className="form-control" name="device" value={deviceInfo.device} onChange={handleChange} />
          </div>
        </div>

      </div>
      <div className="box-footer" style={{ float: "right", width: 'auto' }}>
        <button type="button" className="btn btn-primary-light me-1" data-bs-dismiss="modal">
          <i className="ti-trash" /> Cancel
        </button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => createDevice()}>
          <i className="ti-save-alt" /> Save
        </button>
      </div>
    </div>
  )
}

export default CreateMobileDevice