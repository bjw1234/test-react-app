import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { Provider } from 'mobx-react';
import App from './client/views/App';
import { AppState, TopicStore } from './client/store/store';

const root = document.getElementById('root');

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line
const appState = new AppState(initialState.appState);
const topicStore = new TopicStore(initialState.topicStore);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={appState} topicStore={topicStore}>
                <BrowserRouter>
                    <Component/>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./client/views/App', () => {
        const NextApp = require('./client/views/App').default; // eslint-disable-line
        render(NextApp);
    });
}
