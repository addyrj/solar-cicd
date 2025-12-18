import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../Database/Action/ConstantAction";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const themeColorList = [
    "#F29F58",
    "#AB4459",
    "#0A97B0",
    "#640D5F",
    "#4C1F7A",
    "#3B1C32",
    "#AF1740",
    "#006BFF",
];

const ChnageThme = () => {
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);
    const [themeColor, setThemeColor] = useState({
        headerColor: "",
        bodyColor: "",
        textColor: "",
    });

    const changeThmeColor = (titile) => {
        if (titile === "1") {
            dispatch(changeTheme({ title: titile, color: themeColor.headerColor }))
        } else if (titile === "2") {
            dispatch(changeTheme({ title: titile, color: themeColor.bodyColor }))
        } else if (titile === "3") {
            dispatch(changeTheme({ title: titile, color: themeColor.textColor }))
        } else {
            toast.error("Failed! Please select color");
        }
    };
    return (
        <Wrapper>
            <div className="modal modal-right fade" id="change_theme" tabIndex={-1}>
                <div className="modal-dialog" style={{ backgroundColor: "#151535" }}>
                    <div className="modal-content slim-scroll3">
                        <div className="modal-body p-30 bg-white">
                            <div className="d-flex align-items-center justify-content-between pb-30">
                                <h4 className="m-0">Theme Setting</h4>
                                <a
                                    href="#"
                                    className="btn btn-icon btn-danger-light btn-sm no-shadow"
                                    data-bs-dismiss="modal"
                                >
                                    <span className="fa fa-close" />
                                </a>
                            </div>
                            <hr />
                            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                <TabList>
                                    <Tab>Theme</Tab>
                                    <Tab>Header</Tab>
                                    <Tab>Content</Tab>
                                </TabList>
                                <TabPanel></TabPanel>
                                <TabPanel></TabPanel>
                                <TabPanel></TabPanel>
                            </Tabs>
                            <div>
                                <p className="header-title">Choose Header Color</p>
                                <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                    {themeColorList.map((item) => {
                                        return (
                                            <p
                                                className="colorBox"
                                                style={{ background: item }}
                                                onClick={() =>
                                                    setThemeColor({ ...themeColor, headerColor: item })
                                                }
                                            ></p>
                                        );
                                    })}
                                    <HexColorPicker
                                        className="multiColorStyle"
                                        color={themeColor.headerColor}
                                        onChange={(e) =>
                                            setThemeColor({ ...themeColor, headerColor: e })
                                        }
                                    />
                                </div>
                                <button
                                    className="applyButton"
                                    onClick={() => changeThmeColor("1")}
                                >
                                    Apply
                                </button>
                            </div>
                            <hr />
                            <div>
                                <p className="header-title">Choose Body Color</p>
                                <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                    {themeColorList.map((item) => {
                                        return (
                                            <p
                                                className="colorBox"
                                                style={{ background: item }}
                                                onClick={() =>
                                                    setThemeColor({ ...themeColor, bodyColor: item })
                                                }
                                            ></p>
                                        );
                                    })}
                                    <HexColorPicker
                                        className="multiColorStyle"
                                        color={themeColor.bodyColor}
                                        onChange={(e) =>
                                            setThemeColor({ ...themeColor, bodyColor: e })
                                        }
                                    />
                                </div>
                                <button
                                    className="applyButton"
                                    onClick={() => changeThmeColor("2")}
                                >
                                    Apply
                                </button>
                            </div>
                            <hr />
                            <div>
                                <p className="header-title">Choose Text Color</p>
                                <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                    {themeColorList.map((item) => {
                                        return (
                                            <p
                                                className="colorBox"
                                                style={{ background: item }}
                                                onClick={() =>
                                                    setThemeColor({ ...themeColor, textColor: item })
                                                }
                                            ></p>
                                        );
                                    })}
                                    <HexColorPicker
                                        className="multiColorStyle"
                                        color={themeColor.textColor}
                                        onChange={(e) =>
                                            setThemeColor({ ...themeColor, textColor: e })
                                        }
                                    />
                                </div>
                                <button
                                    className="applyButton"
                                    onClick={() => changeThmeColor("3")}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  hr {
    height: 2px;
    background-color: orange;
  }
  .applyButton {
    text-decoration: none;
    width: 140px;
    height: 3rem;
    max-width: auto;
    background-color: #f26b0f;
    color: rgb(255 255 255);
    border: none;
    text-transform: uppercase;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover,
    &:active {
      box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      background-color: #0042a5;
      transform: scale(0.96);
    }

    a {
      text-decoration: none;
      color: rgb(255 255 255);
      font-size: 1.8rem;
    }
  }
  .multiColorStyle {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  .colorBox {
    width: 80px;
    height: 80px;
    cursor: pointer;
    &:hover,
    &:active {
      border: 1px solid white;
      transform: scale(0.96);
    }
  }
`;

export default ChnageThme;
