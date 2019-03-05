import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { devicePropType } from '../constants';
import {removeDeviceGroup, switchOff, switchOn} from '../api';
import { async } from 'q';

export default class GroupItem extends PureComponent {
    handleDelete = async () => {
        const {group, onUpdate} = this.props;

        await removeDeviceGroup(group.id);

        onUpdate();
    };

    activateGroup = async () => {
        const {group} = this.props;

        await Promise.all(group.devices.map(async (deviceId) => {
            await switchOn(deviceId);
        }));

        alert("Devices switched On");
    };

    deactivateGroup = async () => {
        const {group} = this.props;

        await Promise.all(group.devices.map(async (deviceId) => {
            await switchOff(deviceId);
        }));

        alert("Devices switched Off");
    };

    render() {
        const { index, group } = this.props;

        return (
            <tr key={group.id}>
                <th scope="row">{index}</th>
                <td>{group.name}</td>
                <td className="text-right">
                    <div className="btn-group mr-4" role="group">
                        <button type="button" className="btn btn-outline-primary" onClick={this.activateGroup}>On</button>
                        <button type="button" className="btn btn-outline-primary" onClick={this.deactivateGroup}>Off</button>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/groups/edit/${group.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}