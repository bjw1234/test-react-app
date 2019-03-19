import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import AppState from '../../store/app-state';

@inject('appState') @observer
class TopicList extends React.Component {
    constructor() {
        super();
        this.onNameChange = this.onNameChange.bind(this);
    }

    componentDidMount() {
        // todo
    }

    onNameChange(event) {
        this.props.appState.changeName(event.target.value);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.onNameChange}/>
                <div>{this.props.appState.msg}</div>
            </div>
        );
    }
}

// 声明props 和 类型
// appState是APPState的一个实例
TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};

export default TopicList;
