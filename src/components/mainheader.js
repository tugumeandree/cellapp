import React, {Component} from 'react';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title
} from 'native-base';

import styles from '../styles/styles';

export default class MainHeader extends Component{
  render(){
    return(
      <Header style={styles.header} hasTabs
              androidStatusBarColor="#A629F6">
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>cellapp</Title>
        </Body>
      </Header>
    )
  }
}
