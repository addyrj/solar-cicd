import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import $ from "jquery";
import Cookies from "universal-cookie";
import { myThemeColor } from "../Constant/MainFile";

const themeColorList = [
    "#F29F58",
    "#AB4459",
    "#0A97B0",
    "#640D5F",
    "#4C1F7A",
    "#3B1C32",
    "#AF1740",
    "#006BFF",
    "#24243E",
    "#ffffff",
    "#000000",
    "#9FA2B3",
];

const mySkins = [
    {
        id: 1,
        title: "theme-primary",
        colorCode: "#04a08b",
    },
    {
        id: 2,
        title: "theme-secondary",
        colorCode: "#6C757D",
    },
    {
        id: 3,
        title: "theme-info",
        colorCode: "#FFC107",
    },
    {
        id: 4,
        title: "theme-success",
        colorCode: "#0052cc ",
    },
    {
        id: 5,
        title: "theme-danger",
        colorCode: "#ff562f ",
    },
    {
        id: 6,
        title: "theme-warning",
        colorCode: "#ff9920",
    },
    {
        id: 7,
        title: "theme-default",
        colorCode: "#0052cc",
    },
];

const ChnageThme = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    //  cookies.set("solorTheme", "light", { path: "/" });
    const [tabIndex, setTabIndex] = useState(0);
    const [themeColor, setThemeColor] = useState({
        headerColor: "",
        headerTextColor: "",
        bodyColor: "",
        themeColor: "",
        themeColorTitile: "",
    });

    const changeThmeColor = async (titile) => {
        await cookies.set("themeSetting", JSON.stringify(themeColor), { path: "/" });
        window.location.reload(false);
    };

    useEffect(() => {
        const themeSetting = cookies.get("themeSetting");
        if (themeSetting !== undefined) {
            setThemeColor(themeSetting);
        }
    }, []);

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
                            <Tabs
                                selectedIndex={tabIndex}
                                onSelect={(index) => setTabIndex(index)}
                            >
                                <TabList className="tabLayout">
                                    <Tab className={`tabStyle ${tabIndex === 0 && "active"}`}>
                                        Theme
                                    </Tab>
                                    <Tab className={`tabStyle ${tabIndex === 1 && "active"}`}>
                                        Header
                                    </Tab>
                                    <Tab className={`tabStyle ${tabIndex === 2 && "active"}`}>
                                        Content
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <div>
                                        <p className="header-title">Choose Theme Color</p>
                                        <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                            {myThemeColor.map((item,index) => {
                                                return (
                                                    <p
                                                    key={index} // ✅ ADD THIS
                                                        className="colorBox"
                                                        style={{ background: item.colorCode }}
                                                        onClick={() =>
                                                            setThemeColor({
                                                                ...themeColor,
                                                                themeColor: item.colorCode,
                                                                themeColorTitile: item.title
                                                            })
                                                        }
                                                    ></p>
                                                );
                                            })}
                                        </div>
                                        <button
                                            className="applyButton"
                                            onClick={() => changeThmeColor("4")}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div>
                                        <p className="header-title">
                                            Choose Header Background Color
                                        </p>
                                        <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                            {themeColorList.map((item,index) => {
                                                return (
                                                    
                                                    <p
                                                    key={index} // ✅ ADD THIS
                                                        className="colorBox"
                                                        style={{ background: item }}
                                                        onClick={() =>
                                                            setThemeColor({
                                                                ...themeColor,
                                                                headerColor: item,
                                                            })
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
                                    </div>
                                    <hr />
                                    <div>
                                        <p className="header-title">Choose Header Font Color</p>
                                        <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                            {themeColorList.map((item,index) => {
                                                return (
                                                    <p
                                                       key={index} // ✅ ADD THIS
                                                        className="colorBox"
                                                        style={{ background: item }}
                                                        onClick={() =>
                                                            setThemeColor({
                                                                ...themeColor,
                                                                headerTextColor: item,
                                                            })
                                                        }
                                                    ></p>
                                                );
                                            })}
                                            <HexColorPicker
                                                className="multiColorStyle"
                                                color={themeColor.headerTextColor}
                                                onChange={(e) =>
                                                    setThemeColor({ ...themeColor, headerTextColor: e })
                                                }
                                            />
                                        </div>
                                        <button
                                            className="applyButton"
                                            onClick={() => changeThmeColor("4")}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div>
                                        <p className="header-title">Choose Body Color</p>
                                        <div className="row gap-4" style={{ marginLeft: "15px" }}>
                                            {themeColorList.map((item,index) => {
                                                return (
                                                    <p
                                                       key={index} // ✅ ADD THIS
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
                                </TabPanel>
                            </Tabs>

                            <hr />
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
    margin-top: 30px;
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
  .tabLayout {
    display: flex;
    list-style-type: none;
    align-items: center;
  }
  .tabStyle {
    width: 120px;
    height: 2.5rem;
    background-color: #0042a5;
    text-align: center;
    padding-top: 7px;
    margin: 5px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      border: 1px solid #f26b0f;
      background-color: transparent;
      transform: scale(0.96);
    }
  }
  .active {
    background-color: #f26b0f;
    color: black;
  }
`;

export default ChnageThme;
