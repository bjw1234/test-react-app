import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import querySting from 'query-string';
import { trace } from 'mobx'; // eslint-disable-line
import {
    Avatar, List, Menu, Tag, Pagination,
} from 'antd';
// 处理标签
import Helmet from 'react-helmet';
import AppState from '../../store/app-state';
import { tabs } from '../../util/schema-define';
import './style.css';

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
            page: 1,
        };
        this.onMenuSelect = this.onMenuSelect.bind(this);
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        const tab = this.getTab();
        // fetch topicStore中的数据
        this.props.topicStore.fetchTopics(tab);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            const curPage = this.getPage(nextProps.location.search) || '1';
            this.props.topicStore.fetchTopics(
                this.getTab(nextProps),
                curPage,
            );
            this.setState({
                page: parseInt(curPage, 10),
            });
        }
    }

    onMenuSelect({ key }) {
        this.props.history.push({
            pathname: '/list',
            search: `?tab=${key}`,
        });
    }

    onPaginationChange(pageNumber) {
        this.props.history.push({
            pathname: '/list',
            search: `?tab=${this.getTab()}&page=${pageNumber}`,
        });
    }

    onListItemClick(item) {
        this.props.history.push({
            pathname: `/detail/${item.id}`,
        });
    }

    getTab(props) {
        const prop = props || this.props;
        const query = querySting.parse(prop.location.search);
        return query.tab || 'all';
    }

    getPage(search) {
        const { page } = querySting.parse(search) || 1;
        return page;
    }

    getTagColor(item) {
        if (item.top) return '#40a6ff';
        if (item.good) return tabs.good.color;
        const tab = tabs[item.tab];
        return tab ? tab.color : '';
    }

    getTagText(item) {
        if (item.top) return '置顶';
        if (item.good) return '精华';
        return tabs[item.tab].text;
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
                <Menu
                    mode="horizontal"
                    onSelect={this.onMenuSelect}
                    defaultSelectedKeys={[this.getTab()]}
                >
                    {
                        Object.keys(tabs).map((key) => {
                            return <Menu.Item key={key}>{tabs[key].text}</Menu.Item>;
                        })
                    }
                </Menu>
                <List
                    className="topic_list"
                    itemLayout="vertical"
                    dataSource={topics}
                    loading={syncing}
                    renderItem={item => (
                        <List.Item onClick={() => this.onListItemClick(item)}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.author.avatar_url}/>
                                }
                                title={(
                                    <span>
                                        <Tag
                                            color={this.getTagColor(item)}
                                        >
                                            {this.getTagText(item)}
                                        </Tag>
                                        <span className="item_title">{item.title}</span>
                                    </span>
                                )}
                                description={(
                                    <span>
                                        <span className="login_name">{item.author.loginname}</span>
                                        <span className="reply_count">{item.reply_count}</span>
                                        /
                                        <span className="visit_count">{item.visit_count}</span>
                                        <span className="create_at">
                                            创建时间:
                                            {item.create_at && new Date(item.create_at).toLocaleDateString()}
                                        </span>
                                    </span>
                                )}
                            />
                        </List.Item>
                    )}
                />
                <Pagination
                    showQuickJumper
                    current={this.state.page}
                    total={730}
                    onChange={this.onPaginationChange}
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

TopicList.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default TopicList;
