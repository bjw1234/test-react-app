import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// 处理标签
import Helmet from 'react-helmet';
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

    // 异步操作
    bootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.changeName('bootstrap');
                resolve(true);
            }, 1000);
        });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>This is topicList</title>
                    <meta name="description" content="this is description meta."/>
                    <link/>
                    <style type="text/css">
                        {`
                            .txt {
                                background-color: black;
                            }
                            .txt {
                                color: red;
                                font-size: 22px;
                            }
                        `}
                    </style>
                </Helmet>
                <input type="text" onChange={this.onNameChange}/>
                <div className="txt">{this.props.appState.msg}</div>
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
