/* eslint-disable */
import React from 'react';
import { Button, Row, Col } from 'antd';

const logoStyle = {
    width: 155,
    marginTop: -6,
};

class AppBar extends React.Component {
    constructor() {
        super();
        this.onCreateTopic = this.onCreateTopic.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onCreateTopic() {
    }

    onLogin() {
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="space-between">
                    <Col>
                        <a href="javascript:void(0)">
                            <img src="https://s2.ax1x.com/2019/03/26/AU7Kv4.png" style={logoStyle} alt="logo"/>
                        </a>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus-circle" ghost onClick={this.onCreateTopic}>新建话题</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="default" icon="user" ghost onClick={this.onLogin}>登录</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AppBar;
