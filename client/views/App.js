import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../router/router';

// export default () => <div>hello world!</div>;

// 根组件
class App extends React.Component {
    componentDidMount() {
        // todo
    }

    render() {
        return [
            <div key="key-nav">
                <Link to="/">首页</Link>
                <Link to="/detail">详情页</Link>
            </div>,
            <Routes key="key-routes"/>,
        ];
    }
}

export default App;
