import React from "react";

import { AuthData } from "../context/context";




import { readFromLocalStorage, writeToLocalStorage } from "../../utils/local-storage";


export default class AuthDataHandler extends React.Component {
  constructor() {
    super(); 

    const authDataFromLocalStorage = readFromLocalStorage("authData");

    this.state = {
        authData: authDataFromLocalStorage,
    };
  }

  setAuthData(authData){
    writeToLocalStorage("authData", authData);
    this.setState({authData});
  }

  


  render() {
    return (
      <AuthData.Provider value={{...this.state, setAuthData:(authData)=>this.setAuthData(authData)}}>
        {this.props.children}
      </AuthData.Provider>

    );
  }
}


