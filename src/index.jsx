import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to bundle `./index.scss`
import './index.scss';

// Import statement for MainView
import MainView from './components/main-view/main-view'

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