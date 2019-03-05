const express = require('express');
const mongoose = require('mongoose');
const app = express();
const deviceRouter = require('./routes/devices');
const logRouter = require('./routes/logs');
const deviceGroupsRouter = require('./routes/deviceGroups');
const corsMiddleware = require('./middlewares/cors');

mongoose.connect('mongodb://localhost:27017/smartHome');

app.use(corsMiddleware);

app.use(express.json());

app.use('/devices', deviceRouter);

app.use('/logs', logRouter);

app.use('/device-groups', deviceGroupsRouter);

app.listen(3005);