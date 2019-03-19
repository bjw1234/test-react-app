import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import TestApi from '../views/test-api/test-api';

// 返回一个数组（同一层级的组件放在一起）
export default () => [
    // exact 精确匹配
    <Route key="key-index" path="/" render={() => <Redirect to="/list"/>} exact/>,
    <Route key="key-list" path="/list" component={TopicList}/>,
    <Route key="key-detail" path="/detail" component={TopicDetail}/>,
    <Route key="key-test" path="/test" component={TestApi}/>,
];
