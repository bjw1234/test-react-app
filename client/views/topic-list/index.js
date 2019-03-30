import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { trace } from 'mobx'; // eslint-disable-line
import {
    Avatar, List, Menu, Tag,
} from 'antd';
// 处理标签
import Helmet from 'react-helmet';
import AppState from '../../store/app-state';
import style from './css-list';

@inject((stores) => {
    return {
        appState: stores.appState,
        topicStore: stores.topicStore,
    };
}) @observer
class TopicList extends React.Component {
    constructor() {
        super();
        this.state = {
            tabIndex: '0',
        };
        this.onMenuSelect = this.onMenuSelect.bind(this);
    }

    componentDidMount() {
        // fetch topicStore中的数据
        this.props.topicStore.fetchTopics();
    }

    onMenuSelect({ key }) {
        this.setState({
            tabIndex: key,
        });
    }

    getStyleByTab(tab) {
        const obj = {
            ask: 'red',
            share: 'green',
            job: 'blue',
            good: 'purple',
        };
        return obj[tab];
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
        trace();
        const { topicStore } = this.props;
        const { topics, syncing } = topicStore;
        return (
            <div style={{ paddingRight: 20 }}>
                <Helmet>
                    <title>This is topicList</title>
                    <meta name="description" content="this is description meta."/>
                    <link/>
                </Helmet>
                <Menu mode="horizontal" onSelect={this.onMenuSelect} defaultSelectedKeys={[this.state.tabIndex]}>
                    <Menu.Item key="0">
                        全部
                    </Menu.Item>
                    <Menu.Item key="1">
                        精华
                    </Menu.Item>
                    <Menu.Item key="2">
                        分享
                    </Menu.Item>
                    <Menu.Item key="3">
                        问答
                    </Menu.Item>
                    <Menu.Item key="4">
                        招聘
                    </Menu.Item>
                    <Menu.Item key="5">
                        客户端测试
                    </Menu.Item>
                </Menu>
                <List
                    itemLayout="vertical"
                    dataSource={topics}
                    loading={syncing}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.author.avatar_url}/>
                                }
                                title={(
                                    <span>
                                        <Tag color={this.getStyleByTab(item.tab)}>{item.tab}</Tag>
                                        <a href="https://ant.design">{item.title}</a>
                                    </span>
                                )}
                                description={(
                                    <span>
                                        <span className="loginname" style={style.loginname}>{item.author.loginname}</span>
                                        <span className="reply_count" style={style.reply_count}>{item.reply_count}</span>
                                        &nbsp;/&nbsp;
                                        <span className="visit_count" style={style.visit_count}>{item.visit_count}</span>
                                        <span className="create_at" style={style.create_at}>
                                            创建时间：
                                            {item.create_at ? new Date(item.create_at).toLocaleDateString() : ''}
                                        </span>
                                    </span>
                                )}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

// 声明props 和 类型
// appState是APPState的一个实例
TopicList.wrappedComponent.propTypes = {
    appState: PropTypes.instanceOf(AppState),
    topicStore: PropTypes.object.isRequired,
};

export default TopicList;
