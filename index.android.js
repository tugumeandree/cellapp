import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {
  Container,
  Tabs
} from 'native-base';

//import styles from './src/styles/styles';
//import Home from './src/components/home';
import MainHeader from './src/components/mainheader';

export default class cellapp extends Component {
  render() {
    return (
      <Container>
        <MainHeader />
      </Container>
      <Tabs>
        
      </Tabs>
    );
  }
}


AppRegistry.registerComponent('cellapp', () => cellapp);
