import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import App from './client/views/App';
import { createStoreMap } from './client/store/store';

// 让mobx在服务端渲染的时候不会重复变换
useStaticRendering(true);

/** 导出根组件 */
// export default <App/>;
export default (stores, routerContext, url, sheetsRegistry, generateClassName, theme, sheetsManager) => (
    <Provider {...stores}>
        <StaticRouter context={routerContext} location={url}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                    <App/>
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    </Provider>
);

export { createStoreMap };
/*
 1.对入口文件修改
 2.当app-state直接导出整个对象
 3.在index文件中给provider传入一个APPState的实例（new AppState()）
 4.在store中添加createStoreMap方法 在server.entry中导入并导出
 5.在dev-static中拿到createStoreMap,createStoreMap = m.exports.createStoreMap;
 6.渲染的时候以参数传入
 const routerContext = {};
 const app = serverBundle(createStoreMap(), routerContext, req.url);
 let content = ReactSSR.renderToString(app);

 但还是有问题：
 当访问localhost:3000的时候，其实该路由做了重定向，服务端渲染的时候，导致定向后的组件内容无法渲染出来，
 那么这个问题如何解决呢？

 当执行完ReactSSR.renderToString判断，routerContext是否有url属性
 if(routerContext.url) {
   重定向
   res.status(302).setHeader('Location', routerContext.url);
   res.end();
   return;
 }

 怎样在React组件中，当服务器端渲染的时候，去异步调用组件方法？
 cnpm i react-async-bootstrapper -S

 然后在组件中添加该方法，修改mobx中的数据
 bootstrap(){
    return new Promise();
 }

 在服务端渲染的时候,组件中bootstrap方法会被执行
 bootstrapper(app).then(()=>{
    // xxxx
 })

 服务渲染返回的数据中已经有了数据，可是在客户端又重新修改了一次。
 怎样达到服务器端和客户端数据同步呢？
 给AppState添加toJson方法
 在服务端渲染的时候，拿到所有的state数据
 ```js
 const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson();
        return result;
    }, {});
};
 ```

 然后我们得想办法将数据插入到返回的页面中，以达到数据同步的目的。
 怎么做呢？可以使用ejs模板引擎去渲染页面。
*/
