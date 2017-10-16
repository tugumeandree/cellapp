import React, {Component} from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/components/app';

class cellapp extends Component{
  render(){
    return(
      <App />
    )
  }
}

AppRegistry.registerComponent('cellapp', () => cellapp);
