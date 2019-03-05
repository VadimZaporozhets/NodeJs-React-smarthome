import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';
import {getDevices} from '../api';

export default class DeviceForm extends Component {
    state = {
        devices: [],
        selectedDevices: []
    }

    componentDidMount = async () => {
        this.setState({
            selectedDevices: this.props.group.devices,
            devices: await getDevices()
        });
    }
    
    handleCancelClick = () => {
        window.history.back();
    };

    handleSubmit = (event) => {
        this.props.onSubmit({
            ...this.props.group,
            name: event.target.groupName.value,
            devices: this.state.selectedDevices
        });

        event.preventDefault();
    };

    handleDeviceClick = (device) => {
        const { selectedDevices } = this.state;

        if (selectedDevices.includes(device)) {
            selectedDevices.splice(selectedDevices.indexOf(device), 1);
        } else {
            selectedDevices.push(device);
        }

        this.setState({
            selectedDevices
        });
    }

    render() {
        const {group} = this.props;
        const {selectedDevices, devices} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input type="text"
                           className="form-control"
                           id="groupName"
                           name="groupName"
                           placeholder="Group Name"
                           required
                           defaultValue={group.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="devicePort">Devices</label>
                        {devices.map((device) => {
                            return <button 
                                key={device.id} 
                                onClick={() => {this.handleDeviceClick(device.id)}} 
                                type="button" 
                                className={`btn btn-outline-primary${selectedDevices.includes(device.id) ? 'active': ''}`}>
                                    {device.name}
                                </button>;  
                        })}
                </div>

                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
                </div>
            </form>
        );
    }
}

DeviceForm.defaultProps = {
    group: {
        name: '',
        devices: []
    }
};

DeviceForm.propTypes = {
    group: groupPropType,
    onSubmit: PropTypes.func.isRequired
};