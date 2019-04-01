import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import model from '../../util/model';
import './style.css';

const marked = require('marked');
const hljs = require('highlight.js');

// marked相关配置
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highligh: function(code) { // eslint-disable-line
        return hljs.highlightAuto(code).value;
    },
});

export default class TopicDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            topic: {},
        };
    }

    componentDidMount() {
        // 获取id
        const { id } = this.props.match.params;
        console.log(`id = ${id}`);
        this.fetchTopicData(id);
    }

    fetchTopicData(id) {
        model.get(`/api/topic/${id}`, {
            mdrender: 'false',
        }).then((resp) => {
            console.log(resp);
            if (resp.success) {
                this.setState({
                    topic: resp.data,
                });
            }
        });
    }

    render() {
        const { title, content } = this.state.topic;

        return (
            <div>
                {
                    title && content ? (
                        <div id="id-article">
                            <h1>{title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: marked(content) }}/>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            minHeight: 200,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            <Spin size="large"/>
                        </div>
                    )
                }
            </div>
        );
    }
}

TopicDetail.propTypes = {
    match: PropTypes.object,
};
