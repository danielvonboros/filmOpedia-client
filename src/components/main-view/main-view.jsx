import React from 'react';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [
               {_id:1, title: 'Inception', description: 'desc1', imagePath:''},
               {_id:2, title: 'The Shawshank Redemption', description: 'desc2', imagePath:''},
               {_id:3, title: 'Gladiator', description: 'desc3', imagePath:''} 
            ]
        }
    }
    render() {
        return (
            // <React.Fragment> or <>
            <div className="main-view">
                <div>Inception</div>
                <div>The Shawshank Redemption</div>
                <div>Gladiator</div>
            </div>
            // < /React.Fragment> or </>
        );
    }
}
export default MainView;