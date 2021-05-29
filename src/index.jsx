import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to bundle `./index.scss`
import './index.scss';

// Main component
class filmOpediaApplication extends React.Component {
    render () {
        return (
            <div className="filmopedia">
                <div>Good morning</div>
            </div>
        );
    }
}

// Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM
ReactDOM.render(React.createElement(filmOpediaApplication), container);