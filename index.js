import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { blue, pink } from '@material-ui/core/colors';
import App from './client/views/App';
import AppState from './client/store/app-state';

const root = document.getElementById('root');
// ReactDOM.render(<App/>, root);
// ReactDOM.hydrate(<App/>, root);

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#88c33b',
        },
    },
});

const createApp = (TheApp) => {
    class Main extends React.Component {
        // Remove the server-side injected CSS.
        componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return <TheApp/>;
        }
    }

    return Main;
};

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Component/>
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(createApp(App));

if (module.hot) {
    module.hot.accept('./client/views/App', () => {
        const NextApp = require('./client/views/App').default; // eslint-disable-line
        render(createApp(NextApp));
    });
}
