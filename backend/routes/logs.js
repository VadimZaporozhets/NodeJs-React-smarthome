const router = require('express').Router();
const Log = require('../models/log');

function logAdapter(log) {
    return {
        id: log._id,
        deviceId: log.deviceId,
        logsArray: log.logsArray
    }
}

router.get('/', async (req, res) => {
    const logs = await Log.find().exec();
    res.json(logs.map(logAdapter));
});

router.get('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const log = await Log.findOne({deviceId: deviceId}).exec();

    if (log) {
        res.json(logAdapter(log));
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const logData = req.body;

    try {
        const log = await Log.findOne({deviceId: deviceId}).exec();

        if (log) {
            await log.update({
                deviceId: log.deviceId,
                logsArray: [...log.logsArray, logData]
            });

            res.sendStatus(200);
        } else {
            const log = new Log({
                deviceId: deviceId,
                logsArray: [logData]
            });

            await log.save();

            res.sendStatus(200);
        }
    } catch (e) {
        res.sendStatus(404);
    }
});

router.delete('/:id', async (req, res) => {
    const deviceId = req.params.id;

    await Log.findOneAndDelete({deviceId: deviceId});

    res.sendStatus(200);
});

module.exports = router;