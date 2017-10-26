import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import Comment from './src/components/comment';

import {
  AppRegistry,
} from 'react-native';

import App from './src/components/app';

class Home extends Component{
  static navigationOptions = {
    header: null
  }

  render(){
    return(
      <App navigation={this.props.navigation} />
    )
  }
}

const cellapp = StackNavigator({
  Home: {screen: Home},
  Comment: {screen: Comment}
});

AppRegistry.registerComponent('cellapp', () => cellapp);
