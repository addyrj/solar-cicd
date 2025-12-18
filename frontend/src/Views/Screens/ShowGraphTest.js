import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { chartList } from "../Constant/MainFile";
import styled from "styled-components";
import '../../Style/custom_main.css'
import Modal from "react-modal";
import ChartModal from "../Components/Modal/ChartModal";
import { useLocation } from "react-router-dom";
import { canvasChatOption, medianChartOption } from "../../JavaScript/ChartMain";
import ReactECharts from 'echarts-for-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';


const customStyles = {
    content: {
        top: "60%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        padding: '0px',
        marginRight: "-50%",
        overflow: 'scroll',
        backgroundColor: "#151535",
        transform: "translate(-50%, -50%)",
    },
};


const ShowGraphTest = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false)
    const [state, setState] = React.useState({
        series: [75],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
                toolbar: {
                    show: true,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.5,
                        },
                    },
                    track: {
                        background: "#fff",
                        strokeWidth: "67%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.7,
                        },
                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: "#888",
                            fontSize: "17px",
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
                            color: "#111",
                            fontSize: "36px",
                            show: true,
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#ABE5A1"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            stroke: {
                lineCap: "round",
            },
            labels: ["Volt"],
        },
    });
    return (
        <Wrapper>
            <Modal
                isOpen={open}
                onRequestClose={() =>
                    setOpen(false)
                }
                style={customStyles}
                contentLabel="Example Modal">
                <ChartModal />
            </Modal>

            <div className="content-wrapper">
                <div className="container-full">
                    {/* Content Header (Page header) */}
                    {/* Main content */}
                    <section className="content">
                        <table className="table cell-border table-bordered">
                            <thead>
                                <tr>
                                    <th
                                        colSpan={3}
                                        style={{
                                            textAlign: "center",
                                            backgroundColor: "#0052cc",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        IND.DEL.del123
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Record</td>
                                    <td>Time</td>
                                    <td>Unique Id</td>
                                </tr>
                                <tr>
                                    <td>0565</td>
                                    <td>04-12-2024 01:30:40 PM</td>
                                    <td>1326426021</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="col-xxl-6 col-xl-12 col-12">
                            <div className="box performance">
                                <div className="box-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="box-title fw-500">Show Graph</h4>
                                        <i className="fa-solid fa-gear settingStyle" onClick={() => setOpen(true)} />
                                    </div>
                                </div>
                                <div className="col-12 mb-20">
                                    <div className="row row-cols-1 row-cols-lg-4 g-6 graphlayout">
                                        {chartList.map(() => {
                                            return (
                                                <div className="col chartStyle">
                                                    {/* <ReactApexChart options={state.options} series={state.series} type="radialBar" height={150} /> */}
                                                    {/* <ReactApexChart options={medianChartOption.options} series={medianChartOption.series} type="radialBar" height={150} /> */}
                                                    <ReactEChartsCore option={canvasChatOption}
                                                        echarts={echarts}
                                                        notMerge={true}
                                                        lazyUpdate={true}
                                                        theme={"theme_name"}
                                                    />
                                                </div>

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /.content */}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
.performance{
  height: 100% !important;
}
.graphlayout{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
}
.chartStyle{
  margin: 20px 0;
}
.apexcharts-menu{
  background-color: #F26B0F;
}
.apexcharts-menu-item{
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
}
.settingStyle{
  cursor: pointer;
  &:active,
  &:hover{
    background-color: #0052cc;
    border: 1px solid white;
    padding: 5px;
  }
}
`;

export default ShowGraphTest;
