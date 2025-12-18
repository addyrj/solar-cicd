const db = require("../../DB/config")
const { Validator } = require("../Helper/Validator");

const Donor = db.donorSchema;
const NewDeviceLocationDetail = db.newdevicelocationdetails;

const createDonor = async (req, res, next) => {
    try {
        const { country, organisation, mobile, email, website } = req.body;
        const errorResponse = await Validator(req.body);
        
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            });
        }

        const info = {
            Country: country,
            DonarOrganisation: organisation,
            Mobile: mobile,
            Email: email,
            Website: website
        }

        await Donor.create(info)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: "Donor is created successfully",
                    info: result
                });
            })
            .catch((error) => {
                // Handle unique constraint errors
                if (error.name === 'SequelizeUniqueConstraintError') {
                    const field = error.errors[0].path;
                    return res.status(300).json({
                        status: 300,
                        message: `Failed! ${field === 'DonarOrganisation' ? 'Organisation name' : 'Website'} already exists`
                    });
                }
                
                res.status(300).json({
                    status: 300,
                    message: "Failed! Donor is not created",
                    info: error.message
                });
            });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
};

// Get all donors with device counts
const getAllDonor = async (req, res, next) => {
    try {
        const checkDonor = await Donor.findAll({
            attributes: [
                'ID',
                'Country',
                'DonarOrganisation',
                'Mobile',
                'Email',
                'Website',
                [db.sequelize.literal(`(
                    SELECT COUNT(*) 
                    FROM newdevicelocationdetails 
                    WHERE newdevicelocationdetails.DonarName = donor.DonarOrganisation
                )`), 'deviceCount']
            ],
            order: [
                [db.sequelize.literal('deviceCount'), 'DESC']
            ]
        });
        
        if (checkDonor.length !== 0) {
            res.status(200).json({
                status: 200,
                message: 'International Donor data fetched successfully',
                count: checkDonor.length,
                info: checkDonor
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Failed! International Donor not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
};



module.exports = { 
    getAllDonor, 
    createDonor, 
  
};