const db = require("../../DB/config")
const isEmpty = require("lodash.isempty");
const { Validator } = require("../Helper/Validator");

const Partner = db.partnerSchema;

const createPartner = async (req, res, next) => {
    try {
        const { country, organisation, contactPerson, email, device, loginUserName, loginPassword,
            baseLinePlanDate, baseLineCompleteDate, monitorPlanDate, monitorCompleteDate, evalutionPlanDate,
            evalutionCompleteDate } = req.body;
        const errorResponse = await Validator(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const info = {
                Country: country,
                GPOrganisation: organisation,
                Contact: contactPerson,
                Email: email,
                Device: device,
                Login: loginUserName,
                Pwd: loginPassword,
                BaselinePlanDate: baseLinePlanDate,
                BaselineCmpltDate: baseLineCompleteDate,
                MonitorPlanDate: monitorPlanDate,
                MonitorCmpltDate: monitorCompleteDate,
                EvalPlanDate: evalutionPlanDate,
                EvalCmpltDate: evalutionCompleteDate
            }

            await Partner.create(info)
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Partner Created sucessfull",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Partner is not Created",
                        info: error
                    })
                })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}


const getAllPartner = async (req, res, next) => {
    try {
        const checkPartner = await Partner.findAll();
        if (checkPartner.length !== 0) {
            res.status(200).json({
                status: 200,
                message: 'Internation Partner  data fetch succesfully',
                count: checkPartner.length,
                info: checkPartner
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Failed! Internation Partner not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}


module.exports = { getAllPartner, createPartner }