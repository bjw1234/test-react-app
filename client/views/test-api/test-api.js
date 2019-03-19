import React from 'react';
import axios from 'axios';

export default class TestApi extends React.Component {
    getTopic() {
        axios.get('/api/topics').then((res) => {
            console.log(res.data);
        });
    }

    getMarkAll() {
        axios.post('/api/message/mark_all?needAccessToken=true').then((res) => {
            console.log(res.data);
        });
    }

    login() {
        axios.post('/api/user/login', {
            accessToken: '39b7770d-47b9-428f-9318-03383f80d846',
        }).then((res) => {
            console.log(res.data);
        });
    }

    render() {
        return (
            <div>
                <input type="button" value="getTopics" onClick={this.getTopic}/>
                <input type="button" value="login" onClick={this.login}/>
                <input type="button" value="getMarkAll" onClick={this.getMarkAll}/>
            </div>
        );
    }
}
