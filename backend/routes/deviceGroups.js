const router = require('express').Router();
const DeviceGroup = require('../models/deviceGroup');

function deviceGroupAdapter(deviceGroup) {
    return {
        id: deviceGroup._id,
        name: deviceGroup.name,
        devices: deviceGroup.devices
    }
}

router.get('/', async (req, res) => {
    const devices = await DeviceGroup.find().exec();
    res.json(devices.map(deviceGroupAdapter));
});

router.get('/:id', async (req, res) => {
    const groupId = req.params.id;
    const deviceGroup = await DeviceGroup.findById(groupId).exec();

    if (deviceGroup) {
        res.json(deviceGroupAdapter(deviceGroup));
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    debugger;
    const deviceGroupData = req.body;
    const device = new DeviceGroup(deviceGroupData);

    await device.save();

    res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
    const deviceGroupId = req.params.id;

    await DeviceGroup.findOneAndDelete(deviceGroupId);

    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    const deviceGroupId = req.params.id;
    const deviceGroupData = req.body;

    try {
        const deviceGroup = await DeviceGroup.findById(deviceGroupId).exec();

        await deviceGroup.update(deviceGroupData);

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
});


module.exports = router;