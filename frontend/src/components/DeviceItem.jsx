import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { removeDevice, removeDeviceLogs, switchOn, switchOff } from '../api';
import { devicePropType } from '../constants';

export default class DeviceItem extends PureComponent {
    handleDelete = async () => {
        const {device, onUpdate} = this.props;

        await removeDevice(device.id);

        await removeDeviceLogs(device.id);

        onUpdate();
    };

    handleStateChange = async (e) => {
        const {device, onUpdate} = this.props;
        const newState = e.target.value;

        if (newState === 'on') {
            await switchOn(device.id);
        } else {
            await switchOff(device.id);
        }

        onUpdate();
    };

    render() {
        const {index, device} = this.props;

        return (
            <tr key={device.id}>
                <th scope="row">{index}</th>
                <td>{device.name}</td>
                <td>{device.address}:{device.port}</td>
                <td className="text-right">
                    <div className="btn-group btn-group-toggle mr-2" role="group" data-toggle="buttons">
                        <label className={`btn btn-outline-primary ${device.state === 'on' ? 'active' : ''}`}>
                            <input type="radio"
                                   name="state"
                                   id="on"
                                   autoComplete="off"
                                   onChange={this.handleStateChange}
                                   value="on"
                                   checked={device.state === 'on'}/> On
                        </label>

                        <label className={`btn btn-outline-primary ${device.state === 'off' ? 'active' : ''}`}>
                            <input type="radio"
                                   name="state"
                                   id="off"
                                   autoComplete="off"
                                   onChange={this.handleStateChange}
                                   value="off"
                                   checked={device.state === 'off'}/> Off
                        </label>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/devices/log/${device.id}`} className="btn btn-outline-secondary">Log</a>
                        <a href={`#/devices/edit/${device.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}

DeviceItem.defaultProps = {
    onUpdate: () => {
    }
};

DeviceItem.propTypes = {
    device: devicePropType.isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func
};