export const sourcerChartOption = () => {
    let barChartOption = {
        chart: {
            height: 350,
            type: "area",
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: "smooth"
        },
        plotOptions: {
            bar: {
                columnWidth: "50%"
            }
        },
        colors: ["#4d7cff", "#f2426d", "#f2426d", "#fec801", "#8D0B41", "#F26B0F", "#4335A7", "#FF2929"],
        series: [
            {
                name: "Panel Voltage",
                type: "column",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
            },
            {
                name: "Panel Current",
                type: "area",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            },
            {
                name: "Pannel Power",
                type: "area",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            },
            {
                name: "Temperture",
                type: "line",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
            },
            {
                name: "Battery Voltage",
                type: "column",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            },
            {
                name: "Battery Current",
                type: "area",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
            },
            {
                name: "Load Volatge",
                type: "area",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            },
            {
                name: "Load Current",
                type: "line",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
            }
        ],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: "light",
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003",
            "11/01/2003"
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        yaxis: {
            title: {
                text: "Points",
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
                }
            }
        }
    }
    return barChartOption;
}

export const medianChartOption = {
    series: [67],
    options: {
        chart: {
            height: 350,
            type: "radialBar",
            offsetY: -10,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 120,
                    },
                    value: {
                        offsetY: 76,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91],
            },
        },
        stroke: {
            dashArray: 4,
        },
        labels: ["Median Ratio"],
    },
};

export const chartOptionList = [
    {
        id: 1,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 2,
        path: "src/images/charts/chart2.png",
        title: "Gradient Circle Chart",
    },
    {
        id: 3,
        path: "src/images/charts/chart3.png",
        title: "Strocked Chart",
    },
    {
        id: 4,
        path: "src/images/charts/chart4.png",
        title: "Semi Circle Chart",
    },
    {
        id: 5,
        path: "src/images/charts/chart5.png",
        title: "Semi Circle Chart",
    },
    {
        id: 6,
        path: "src/images/charts/chart6.png",
        title: "Radia Chart",
    },
    {
        id: 7,
        path: "src/images/charts/chart7.png",
        title: "Pie Chart",
    },
    {
        id: 8,
        path: "src/images/charts/chart8.png",
        title: "Filled Cicle Chart",
    },
];

export const canvasChatOption = (data, chartData) => {
    let option;
    option = {
        series: [
            {
                type: "gauge",
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [
                            [0.3, "#ff9920"],
                            [0.7, "#51ce8a"],
                            [1, "#fc696a"],
                        ],
                    },
                },
                pointer: {
                    itemStyle: {
                        color: "auto",
                    },
                },

                splitLine: {
                    distance: -75,
                    length: 20,
                    lineStyle: {
                        color: "#fff",
                        width: 0,
                    },
                },
                axisLabel: {
                    color: "inherit",
                    distance: 40,
                    fontSize: 10,
                },
                detail: {
                    valueAnimation: true,
                    formatter: `{value} ${chartData.id === 1
                        ? 'V'
                        : chartData.id === 2
                            ? 'A'
                            : chartData.id === 3
                                ? 'W'
                                : chartData.id === 4
                                    ? 'C'
                                    : chartData.id === 5
                                        ? 'V'
                                        : chartData.id === 6
                                            ? 'A'
                                            : chartData.id === 7
                                                ? 'V'
                                                : chartData.id === 8
                                                    ? 'A'
                                                    : ""}`,
                    fontSize: 10,
                    color: "inherit",
                    offsetCenter: [0, "75%"],
                },
                data: [
                    {
                        value:
                            chartData.id === 1
                                ? data[0]?.PvVolt / 100
                                : chartData.id === 2
                                    ? data[0]?.PvCur / 100
                                    : chartData.id === 3
                                        ? data[0]?.PVKWh / 100
                                        : chartData.id === 4
                                            ? data[0]?.Temperature / 100
                                            : chartData.id === 5
                                                ? data[0]?.BatVoltage / 100
                                                : chartData.id === 6
                                                    ? data[0]?.BatCurrent / 100
                                                    : chartData.id === 7
                                                        ? data[0]?.LoadVoltage / 100
                                                        : chartData.id === 8
                                                            ? data[0]?.LoadCurrent / 100
                                                            : "",
                        fontSize: 2,
                    },
                ],
            },
        ],
    };
    return option;
};

export const chrtListOpt2 = [
    {
        id: 1,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 2,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 3,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 4,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 5,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 6,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 7,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
    {
        id: 8,
        path: "src/images/charts/chart1.png",
        title: "Canvas Chart",
    },
];

export const sourcerChartOption1 = (filterData) => {
    console.log("chart filter data is     ", filterData)
    let pVlotage, pCurrent, pPower, temp, bVoltage, bCurrent, lVoltage, lCurrent, time, newTime;
    let minPVlotage, minPCurrent, minPower, minTemp, minBVoltage, minbCurrent, minlVoltage, minlCurrent;
    let maxpVlotage, maxpCurrent, maxpPower, maxtemp, maxbVoltage, maxbCurrent, maxlVoltage, maxlCurrent;
    if (filterData.length !== 0) {
        pVlotage = filterData.map((item) => {
            return item.PvVolt
        });

        minPVlotage = Math.min(...pVlotage);
        maxpVlotage = Math.max(...pVlotage);

        pCurrent = filterData.map((item) => {
            return item.PvCur
        });
        minPCurrent = Math.min(...pCurrent);
        maxpCurrent = Math.max(...pCurrent);

        console.log("chart panel voltage     ", Math.max(...pCurrent))


        pPower = filterData.map((item) => {
            return item.PVKWh
        });
        minPower = Math.min(...pPower);
        maxpPower = Math.max(...pPower);

        temp = filterData.map((item) => {
            return item.Temperature
        });
        minTemp = Math.min(...temp);
        maxtemp = Math.max(...temp);

        bVoltage = filterData.map((item) => {
            return item.BatVoltage
        });
        minBVoltage = Math.min(...bVoltage);
        maxbVoltage = Math.max(...bVoltage);

        bCurrent = filterData.map((item) => {
            return item.BatCurrent
        });
        minbCurrent = Math.min(...bCurrent);
        maxbCurrent = Math.max(...bCurrent);

        lVoltage = filterData.map((item) => {
            return item.LoadVoltage
        });
        minlVoltage = Math.min(...lVoltage);
        maxlVoltage = Math.max(...lVoltage);

        lCurrent = filterData.map((item) => {
            return item.LoadCurrent
        });
        minlCurrent = Math.min(...bCurrent);
        maxbCurrent = Math.max(...bCurrent);

        time = filterData.map((item) => {
            return new Date(item.Time)
        });
        newTime = new Set(time)
    } else {
        pVlotage = [];
        pCurrent = [];
        pPower = [];
        temp = [];
        bVoltage = [];
        bCurrent = [];
        lVoltage = [];
        lCurrent = [];
        time = []

    }

    let barChartOption = {
        chart: {
            height: 350,
            type: "area",
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: "smooth"
        },
        plotOptions: {
            bar: {
                columnWidth: "50%"
            }
        },
        colors: ["#4d7cff", "#f2426d", "#f2426d", "#fec801", "#8D0B41", "#F26B0F", "#4335A7", "#FF2929"],
        series: [
            {
                name: "Panel Voltage",
                type: "column",
                data: [maxpVlotage === undefined ? 0 : maxpVlotage]
            },
            {
                name: "Panel Current",
                type: "area",
                data: [maxpCurrent === undefined ? 0 : maxpCurrent]
            },
            {
                name: "Pannel Power",
                type: "area",
                data: [maxpPower === undefined ? 0 : maxpPower]
            },
            {
                name: "Temperture",
                type: "line",
                data: [maxtemp === undefined ? 0 : maxtemp]
            },
            {
                name: "Battery Voltage",
                type: "column",
                data: [maxbVoltage === undefined ? 0 : maxbVoltage]
            },
            {
                name: "Battery Current",
                type: "area",
                data: [maxbCurrent === undefined ? 0 : maxbCurrent]
            },
            {
                name: "Load Volatge",
                type: "area",
                data: [maxlVoltage === undefined ? 0 : maxlVoltage]
            },
            {
                name: "Load Current",
                type: "line",
                data: [maxlCurrent === undefined ? 0 : maxlCurrent]
            }
        ],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: "light",
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            categories: time
        },
        yaxis: {
            title: {
                text: "Points",
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
                }
            }
        }
    }
    return barChartOption;
}
