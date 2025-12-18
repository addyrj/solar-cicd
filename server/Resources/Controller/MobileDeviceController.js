const db = require("../../DB/config")
const isEmpty = require("lodash.isempty");

const MobileDevice = db.mobileDevice;

const createMobileDevice = async (req, res, next) => {
    try {
        const device = req.body.device;
        if (isEmpty(device)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Device is not found"
            })
        } else {
            const info = {
                Device: device
            }
            await MobileDevice.create(info)
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Mobile device create successfull",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Mobile device not create",
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


const getMobileDevice = async (req, res, next) => {
    try {
        const checkMobile = await MobileDevice.findAll();
        if (checkMobile.length !== 0) {
            res.status(200).json({
                status: 200,
                message: 'Mobile Device data fetch succesfully',
                count: checkMobile.length,
                info: checkMobile
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Failed! Mobile Device not found'
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


module.exports = { getMobileDevice, createMobileDevice }