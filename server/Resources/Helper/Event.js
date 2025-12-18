const db = require("../../DB/config");

const SolarCharger = db.solarCharger;

const eventHandler = async (req, res, next) => {
    try {
        console.log('count is    ', req.params.count)
        console.log('id is    ', req.params.id)
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        res.writeHead(200, headers);

        if (req.params.count === '1') {
            await SolarCharger.findAll({
                where: { UID: req.params.id }
            })
                .then((result) => {
                    const data = { message: result };
                    res.write(`data: ${JSON.stringify(data)}\n\n`)
                })
                .catch((error) => {
                    console.log('erros is     ', error)
                })
        } else {
            setInterval(async () => {
                await SolarCharger.findAll({
                    where: { UID: req.params.id }
                })
                    .then((result) => {
                        const data = { message: result };
                        res.write(`data: ${JSON.stringify(data)}\n\n`)
                    })
                    .catch((error) => {
                        console.log('erros is     ', error)
                    })
            }, 10 * 60 * 1000)
        }


    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { eventHandler }