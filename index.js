import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader'; // eslint-disable-line

const root = document.getElementById('root');
// ReactDOM.render(<App/>, root);
// ReactDOM.hydrate(<App/>, root);

const render = (Component) =>  {
	ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		root,
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./App.js', () => {
		const NextApp = require('./App.js').default; // eslint-disable-line
		render(NextApp);
	});
}
