import axios from 'axios';
import {async} from "q";

const serverUrl = 'http://localhost:3005';

// Devices
export async function getDevices() {
    const response = await axios.get(`${serverUrl}/devices`);
    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${serverUrl}/devices/${deviceId}`);
    return response.data;
}

export async function addDevice(device) {
    return axios.post(`${serverUrl}/devices`, device);
}

export async function removeDevice(deviceId) {
    return axios.delete(`${serverUrl}/devices/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    return axios.put(`${serverUrl}/devices/${deviceId}`, data);
}

//Device Logs
export async function getDeviceLog(deviceId) {
    const response = await axios.get(`${serverUrl}/logs/${deviceId}`);
    return response.data.logsArray;
}

export async function updateDeviceLog(deviceId, data) {
    return axios.post(`${serverUrl}/logs/${deviceId}`, data);
}

export async function removeDeviceLogs(deviceId) {
    return axios.delete(`${serverUrl}/logs/${deviceId}`);
}

//Device Groups
export async function getDeviceGroups() {
    const response = await axios.get(`${serverUrl}/device-groups`);
    return response.data;
}

export async function getDeviceGroupById(deviceGroupId) {
    const response = await axios.get(`${serverUrl}/device-groups/${deviceGroupId}`);
    return response.data;
}

export async function addDeviceGroup(deviceGroup) {
    return axios.post(`${serverUrl}/device-groups`, deviceGroup);
}

export async function removeDeviceGroup(deviceGroupId) {
    return axios.delete(`${serverUrl}/device-groups/${deviceGroupId}`);
}

export async function updateDeviceGroup(deviceGroupId, data) {
    return axios.put(`${serverUrl}/device-groups/${deviceGroupId}`, data);
}

//General
export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on'
    });

    const d = new Date();
    const stringDate = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
        [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');

    await updateDeviceLog(deviceId, {
            action: 'On',
            date: stringDate
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off'
    });

    const d = new Date();
    const stringDate = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
        [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');

    await updateDeviceLog(deviceId, {
        action: 'Off',
        date: stringDate
    });
}