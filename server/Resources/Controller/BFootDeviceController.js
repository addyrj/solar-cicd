const db = require("../../DB/config")
const { Op } = require('sequelize');
const isEmpty = require("lodash.isempty");
const { Validator } = require("../Helper/Validator");

const LocalDevice = db.bFootDeviceLocaDetail;

const createLocalDevice = async (req, res) => {
    try {
        const {
            country,
            province,
            district,
            village,
            title,
            donorId,
            partnerId,
            installdate,
            cordinates,
            manas,
            comments,
            uid
        } = req.body;

        if (!uid) {
            return res.status(400).json({ status: 400, message: "UID is required" });
        }

        // ✅ Check if UID already exists
        const existingDevice = await LocalDevice.findOne({ where: { UID: uid } });
        if (existingDevice) {
            return res.status(409).json({
                status: 409,
                message: "Duplicate UID: A device with this UID already exists",
                existingDevice
            });
        }

        // ✅ Create new device
        const newDevice = await LocalDevice.create({
            Country: country,
            Province: province,
            District: district,
            Village: village,
            Title: title,
            DonorID: donorId,
            PartnerID: partnerId,
            InstallDate: installdate,
            Coordinates: cordinates,
            SolarMamas: manas,
            Comments: comments,
            UID: uid,
            UID_TXT: String(uid)
        });

        res.status(200).json({
            status: 200,
            message: "Device created successfully",
            info: newDevice
        });
    } catch (error) {
        console.error("Create Local Device Error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllLocalDevice = async (req, res, next) => {
    try {
        const checkLocalDeice = await LocalDevice.findAll();
        if (checkLocalDeice.length !== 0) {
            res.status(200).json({
                status: 200,
                message: 'Local Device data fetch suucessfull',
                count: checkLocalDeice.length,
                info: checkLocalDeice
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Failed! Local Device Detail not found'
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
const updateLocalDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Device ID is required"
            });
        }

        // Check if UID is being updated and validate uniqueness
        if (updateData.uid) {
            const existingDevice = await LocalDevice.findOne({
                where: {
                    UID: updateData.uid,
                    ID: { [Op.ne]: id } // Exclude current device
                }
            });

            if (existingDevice) {
                return res.status(409).json({
                    status: 409,
                    message: "Duplicate UID: A device with this UID already exists"
                });
            }
        }

        const [updated] = await LocalDevice.update({
            Country: updateData.country,
            Province: updateData.province,
            District: updateData.district,
            Village: updateData.village,
            Title: updateData.title,
            DonorID: updateData.donorId,
            PartnerID: updateData.partnerId,
            InstallDate: updateData.installdate,
            Coordinates: updateData.cordinates,
            SolarMamas: updateData.manas,
            Comments: updateData.comments,
            UID: updateData.uid,
            UID_TXT: updateData.uid ? String(updateData.uid) : undefined
        }, {
            where: { ID: id }
        });

        if (updated) {
            const updatedDevice = await LocalDevice.findByPk(id);
            return res.status(200).json({
                status: 200,
                message: "Device updated successfully",
                info: updatedDevice
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Device not found or no changes made"
            });
        }
    } catch (error) {
        console.error("Update Local Device Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteLocalDevice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Device ID is required"
            });
        }

        const deleted = await LocalDevice.destroy({
            where: { ID: id }
        });

        if (deleted) {
            return res.status(200).json({
                status: 200,
                message: "Device deleted successfully"
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Device not found"
            });
        }
    } catch (error) {
        console.error("Delete Local Device Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const getLocalDeviceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Device ID is required"
            });
        }

        const device = await LocalDevice.findByPk(id);

        if (device) {
            return res.status(200).json({
                status: 200,
                message: "Device fetched successfully",
                info: device
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Device not found"
            });
        }
    } catch (error) {
        console.error("Get Local Device By ID Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Update your exports
module.exports = {
    createLocalDevice,
    getAllLocalDevice,
    updateLocalDevice,
    deleteLocalDevice,
    getLocalDeviceById
};