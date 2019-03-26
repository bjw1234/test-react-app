import React from 'react';
import MainAppBar from './layout/app-bar';
// import { Link } from 'react-router-dom';
// import Routes from '../router/router';

// 根组件
class App extends React.Component {
    componentDidMount() {
        // todo
    }

    render() {
        return (
            <MainAppBar/>
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
