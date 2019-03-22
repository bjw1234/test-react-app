import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { Provider } from 'mobx-react';
import App from './client/views/App';
import AppState from './client/store/app-state';

const root = document.getElementById('root');
// ReactDOM.render(<App/>, root);
// ReactDOM.hydrate(<App/>, root);

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
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
