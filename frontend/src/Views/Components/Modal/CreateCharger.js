import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { changeApistate, setLoader } from '../../../Database/Action/ConstantAction';
import { postHeaderWithToken } from '../../../Database/Utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateCharger = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [chargerInfo, setChargerInfo] = useState({
        uid: 0,
        country: null,
        provience: null,
        district: null,
        village: null,
        title: null,
        donorId: null,
        partnerId: null,
        installDate: null,
        cordinates: null,
        solarMamas: null,
        comments: null
    })

    const handleChange = (e) => {
        setChargerInfo({ ...chargerInfo, [e.target.name]: e.target.value })
    }

    const createChargerController = async () => {
        const token = await postHeaderWithToken();
        let formdata = new FormData();
        formdata.append("country", chargerInfo.country);
        formdata.append("province", chargerInfo.provience);
        formdata.append("district", chargerInfo.district);
        formdata.append("village", chargerInfo.village);
        formdata.append("title", chargerInfo.title);
        formdata.append("donorId", chargerInfo.donorId);
        formdata.append("partnerId", chargerInfo.partnerId);
        formdata.append("installdate", chargerInfo.installDate);
        formdata.append("cordinates", chargerInfo.cordinates);
        formdata.append("manas", chargerInfo.solarMamas);
        formdata.append("comments", chargerInfo.comments);
        dispatch(setLoader(true))

        axios.post(process.env.REACT_APP_BASE_URL + "createLocalDevice", formdata, token)
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoader(false));
                    dispatch(changeApistate());
                    window.location.reload("false")
                    toast.success(res?.data?.message)
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
                <h4 className="box-title">Create Charger Controller</h4>
            </div>
            {/* /.box-header */}
            <div className="box-body">
                <div className="form-group">
                    <label className="form-label">Charger Controller UID</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-id-card"></i>
                        </span>
                        <input type="text" className="form-control" name="uid" value={chargerInfo.uid} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Country</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-flag"></i>
                        </span>
                        <input type="text" className="form-control" name="country" value={chargerInfo.country} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Province</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-globe"></i>
                        </span>
                        <input type="email" className="form-control" name="provience" value={chargerInfo.provience} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">District</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-map-location-dot"></i>
                        </span>
                        <input type="email" className="form-control" name="district" value={chargerInfo.district} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Village</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <input type="email" className="form-control" name="village" value={chargerInfo.village} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-heading"></i>
                        </span>
                        <input type="email" className="form-control" name="title" value={chargerInfo.title} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Donor ID</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-hand-holding-heart"></i>
                        </span>
                        <input type="email" className="form-control" name="donorId" value={chargerInfo.donorId} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Partner ID</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-handshake"></i>
                        </span>
                        <input type="email" className="form-control" name="partnerId" value={chargerInfo.partnerId} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Install Date</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-calendar-days"></i>
                        </span>
                        <input type="date" className="form-control" name="installDate" value={chargerInfo.installDate} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Coordinates</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-arrows-to-eye"></i>
                        </span>
                        <input type="email" className="form-control" name="cordinates" value={chargerInfo.cordinates} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Solar Mamas *</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-brands fa-slack"></i>
                        </span>
                        <input type="email" className="form-control" name="solarMamas" value={chargerInfo.solarMamas} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Comments</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-comment"></i>
                        </span>
                        <input type="email" className="form-control" name="comments" value={chargerInfo.comments} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="box-footer" style={{ float: "right", width: 'auto' }}>
                <button type="button" className="btn btn-primary-light me-1" data-bs-dismiss="modal">
                    <i className="ti-trash" /> Cancel
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => createChargerController()}>
                    <i className="ti-save-alt" /> Save
                </button>
            </div>
        </div>
    )
}

export default CreateCharger