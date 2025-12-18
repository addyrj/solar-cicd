import React, { useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Database/Action/ConstantAction";
import Cookies from "universal-cookie";
import { getHeaderWithToken } from "../../Database/Utils";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});

    const getAdminProfile = () => {
        const config = getHeaderWithToken();
        dispatch(setLoader(true));
        axios.get(process.env.REACT_APP_BASE_URL + "adminProfile", config)
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoader(false));
                    setProfileData(res.data.info);
                }
            })
            .catch((error) => {
                dispatch(setLoader(false));
                console.log("error is     ", error)
                if (error?.response?.data?.status === 302) {
                    navigate("/")
                    window.location.reload(false)
                }
                toast.error(error?.response?.data?.message || error.message);
            })
    }

    const logoutAdmin = () => {
        cookie.remove("adminToken");
        toast.success("Logout Successfull");
        navigate("/");
        window.location.reload(false);
    }

    useEffect(() => {
        getAdminProfile();
    }, [])
    return (
        <div
            className="modal modal-right fade"
            id="quick_user_toggle"
            tabIndex={-1}
        >
            <div className="modal-dialog">
                <div className="modal-content slim-scroll3">
                    <div className="modal-content slim-scroll3">
                        <div className="modal-body p-30 bg-white">
                            <div className="d-flex align-items-center justify-content-between pb-30">
                                <h4 className="m-0">
                                    Profile
                                </h4>
                                <a
                                    href="#"
                                    className="btn btn-icon btn-danger-light btn-sm no-shadow"
                                    data-bs-dismiss="modal"
                                >
                                    <span className="fa fa-close" />
                                </a>
                            </div>
                            <div>
                                <div className="d-flex flex-row">
                                    <div className="">
                                        <img
                                            src="src/images/avatar/avatar-2.png"
                                            alt="user"
                                            className="rounded bg-danger-light w-150"
                                            width={100}
                                        />
                                    </div>
                                    <div className="ps-20">
                                        <h5 className="mb-0">{profileData?.UserID}</h5>
                                        <p className="my-5 text-fade">{profileData?.username}</p>
                                        <a href="mailto:dummy@gmail.com">
                                            <span className="icon-Mail-notification me-5 text-success">
                                                <span className="path1" />
                                                <span className="path2" />
                                            </span>{" "}
                                            {profileData?.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider my-30" />
                            <div>
                                <div className="d-flex align-items-center mb-30">
                                    <div className="me-15 bg-primary-light h-50 w-50 l-h-60 rounded text-center">
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </div>
                                    <div className="d-flex flex-column fw-500">
                                        <p className="text-dark hover-primary mb-1 fs-16" style={{ cursor: 'pointer' }} onClick={() => logoutAdmin()}>Logout</p>
                                        <span className="text-fade">Click to logout!</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider my-30" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
