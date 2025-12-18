import React from 'react'

const Test = () => {
    const arr = {
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
    }
    return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <label for="show_series">Show Series</label>

                <label htmlFor="pvVoltage" style={{ marginLeft: '20px', marginRight: "5px" }}>Pv Voltage</label>
                <input type="checkbox" id="pvVoltage" className="chk-col-primary" />

                <label htmlFor="pvCurrent" style={{ marginRight: "5px" }}>PV Current</label>
                <input type="checkbox" id="pvCurrent" className="chk-col-primary" />

                <label htmlFor="bVoltage" style={{ marginRight: "5px" }}>Battery Voltage</label>
                <input type="checkbox" id="bVoltage" className="chk-col-primary" />

                <label htmlFor="bCurrent" style={{ marginRight: "5px" }}>Battery Current</label>
                <input type="checkbox" id="bCurrent" className="chk-col-primary" />

                <label htmlFor="lVoltage" style={{ marginRight: "5px" }}>Load Voltage</label>
                <input type="checkbox" id="lVoltage" className="chk-col-primary" />

                <label htmlFor="lCurrent" style={{ marginRight: "5px" }}>Load Current</label>
                <input type="checkbox" id="lCurrent" className="chk-col-primary" />

                <label htmlFor="temp" style={{ marginRight: "5px" }}>Temperature</label>
                <input type="checkbox" id="temp" className="chk-col-primary" />
            </div>
        </>
    )
}

export default Test