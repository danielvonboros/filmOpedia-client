import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

// Import statement for MainView
import MainView from './components/main-view/main-view';

// Import statement to bundle `./index.scss`
import './index.scss';

// Main component
class filmOpediaApplication extends React.Component {
    render () {
        return (
            <Container>
                <MainView />
            </Container>
        );
    }
}

// Find the root of the app
const container = document.getElementsById('app-container')[0];

// Tells React to render your app in the root DOM
ReactDOM.render(React.createElement(filmOpediaApplication), container);