import React, { PureComponent } from 'react';
import GroupFrom from '../components/GroupForm';
import { addDeviceGroup } from '../api';

export default class GroupAdd extends PureComponent {
    handleFormSubmit = async (group) => {
        await addDeviceGroup(group);
        window.history.back();
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                                <li className="breadcrumb-item"><a href="#/groups">Groups</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Group</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <GroupFrom onSubmit={this.handleFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}