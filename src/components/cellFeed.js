import React, {Component} from 'react'
import {
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';

import {Image} from 'react-native'

export default class CellFeed extends Component{
  renderRow(post){
    return(
      <ListItem key={post.postKey} avatar>
        <Left>
          <Thumbnail source={{uri: post.profilePic}} />
        </Left>
        <Body>
          <Text>{post.postBy}</Text>
          <Text note>{post.postedWords}</Text>
        </Body>
        
      </ListItem>
    )
  }

  render(){
    return(
      <List dataArray={this.props.postList}
            renderRow={this.renderRow.bind(this)} />
    )
  }
}
