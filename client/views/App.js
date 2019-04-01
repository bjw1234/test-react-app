import React from 'react';
import { Layout } from 'antd';
import Routes from '../router/router';
// import { Link } from 'react-router-dom';
import MainAppBar from './layout/app-bar';
// import TopicList from './topic-list/index';
import TestApi from './test-api/test-api';

const {
    Header,
    Sider,
    Content,
    Footer,
} = Layout;

const contentStyle = { padding: '15px 50px' };

class App extends React.Component {
    componentDidMount() {
        // todo
    }

    render() {
        return (
            <Layout>
                <Header>
                    <MainAppBar/>
                </Header>
                <Layout style={contentStyle}>
                    <Content>
                        <Routes/>
                    </Content>
                    <Sider>Sider</Sider>
                </Layout>
                <Footer>Footer</Footer>
                <TestApi/>
            </Layout>
        );
    }
}

export default App;

/*
<div key="key-nav">
    <Link to="/">首页</Link>
    <Link to="/detail">详情页</Link>
</div>,
<Routes key="key-routes"/>,
 */
