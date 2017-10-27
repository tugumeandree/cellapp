import React, {Component} from 'react';
import {
  Container, Left, Button, Icon,
  Content, 
} from 'native-base';

import MainHeader from './mainheader';

export default class Comment extends Component{
  static navigationOptions = {
    header: null
  }

  render(){
    const {params} = this.props.navigation.state;
    const {goBack} = this.props.navigation;

    console.log("params:", params);

    return(
      <Container>
        <MainHeader title="comment">
          <Left>
            <Button transparent
              onPress={()=>goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </MainHeader>
        <Content>

        </Content>
      </Container>
    )
  }
}
