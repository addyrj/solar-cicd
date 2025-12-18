const db = require("../../DB/config");
const { Op } = require("sequelize");


const NewDevice = db.newdevicelocationdetails;


// ✅ Create Device..
const createNewDevice = async (req, res) => {
    try {
        const {
            UID,
            Country,
            State,
            District,
            Block,
            VillageName,
            NameOfBeneficiary,
            BeneficiaryPno,
            Location,
            SolarEngineerName,
            SolarEngineerPno,
            GCName,
            GCPhoneNumber,
            DonarName,             // ✅ New field
            InstallationDate,      // ✅ New field
            PanchayatSamiti
        } = req.body;

        if (!UID) {
            return res.status(400).json({ status: 400, message: "UID is required" });
        }

        const existingDevice = await NewDevice.findOne({ where: { UID: UID } });
        if (existingDevice) {
            return res.status(409).json({
                status: 409,
                message: "Duplicate UID: A device with this UID already exists",
                existingDevice
            });
        }

        const newDevice = await NewDevice.create({
            UID: UID,
            Country,
            State,
            District,
            Block,
            VillageName,
            NameOfBeneficiary,
            BeneficiaryPno,
            Location,
            SolarEngineerName,
            SolarEngineerPno,
            GCName,
            GCPhoneNumber,
            DonarName,             // ✅ New field
            InstallationDate,      // ✅ New field
            PanchayatSamiti
        });

        res.status(200).json({
            status: 200,
            message: "Device created successfully",
            info: newDevice
        });
    } catch (error) {
        console.error("Create New Device Error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Get All Devices
const getAllNewDevices = async (req, res) => {
    try {
        const devices = await NewDevice.findAll();
        if (devices.length > 0) {
            return res.status(200).json({
                status: 200,
                message: "Devices fetched successfully",
                count: devices.length,
                info: devices
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "No devices found"
            });
        }
    } catch (error) {
        console.error("Get All Devices Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Get Device by ID
const getNewDeviceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: 400, message: "Device ID is required" });
        }

        const device = await NewDevice.findByPk(id);

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
        console.error("Get Device By ID Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Update Device
const updateNewDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: "Device ID is required" });
        }

        if (updateData.UID) {
            const existingDevice = await NewDevice.findOne({
                where: {
                    UID: updateData.UID,
                    ID: { [Op.ne]: id }
                }
            });

            if (existingDevice) {
                return res.status(409).json({
                    status: 409,
                    message: "Duplicate UID: A device with this UID already exists"
                });
            }
        }

        const [updated] = await NewDevice.update({
            UID: updateData.UID,
            Country: updateData.Country,
            State: updateData.State,
            District: updateData.District,
            Block: updateData.Block,
            VillageName: updateData.VillageName,
            NameOfBeneficiary: updateData.NameOfBeneficiary,
            BeneficiaryPno: updateData.BeneficiaryPno,
            Location: updateData.Location,
            SolarEngineerName: updateData.SolarEngineerName,
            SolarEngineerPno: updateData.SolarEngineerPno,
            GCName: updateData.GCName,
            GCPhoneNumber: updateData.GCPhoneNumber,
            DonarName: updateData.DonarName,               // ✅ New field
            InstallationDate: updateData.InstallationDate, // ✅ New field
            PanchayatSamiti: updateData.PanchayatSamiti
        }, {
            where: { ID: id }
        });

        if (updated) {
            const updatedDevice = await NewDevice.findByPk(id);
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
        console.error("Update Device Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// ✅ Delete Device
const deleteNewDevice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: 400, message: "Device ID is required" });
        }

        const deleted = await NewDevice.destroy({ where: { ID: id } });

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
        console.error("Delete Device Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createNewDevice,
    getAllNewDevices,
    getNewDeviceById,
    updateNewDevice,
    deleteNewDevice
};
