import React from 'react';
import ReactDOM from 'react-dom';

// Import statement for MainView
import MainView from './components/main-view/main-view';

// Import statement to bundle `./index.scss`
import './index.scss';

// Main component
class filmOpediaApplication extends React.Component {
    render () {
        return (
            <MainView />
        );
    }
}

// Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM
ReactDOM.render(React.createElement(filmOpediaApplication), container);