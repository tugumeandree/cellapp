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
  Grid,
  Row,
  Col
} from 'native-base';

import {Image} from 'react-native'
var moment = require('moment');

export default class CellFeed extends Component{
  renderRow(post){
    return(
      <ListItem key={post.postKey} avatar style={styles.list}>
        <Grid>
          <Row>
            <Left>
              <Thumbnail source={{uri: post.profilePic}} />
            </Left>
            <Body>
              <Text>{post.postBy}</Text>
              <Text note>{post.postedWords}</Text>
            </Body>
            <Right>
              <Text note>{moment(post.time, "LLLL").fromNow()}</Text>
            </Right>
          </Row>
          <Row>
            <Image source={{uri: post.postedPic}}
                style={styles.imgCellFeed}
             />
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Grid>
                <Row>
                  <Icon name="ios-text-outline" />
                  <Text note>{" "+post.nComments}</Text>
                </Row>
              </Grid>
            </Col>
            <Col>
              <Grid>
                <Row>
                  <Icon name="ios-thumbs-up-outline" />
                  <Text note>{" "+post.nLikes}</Text>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </ListItem>
    )
  }

  render(){
    /*let a = moment().format('LLLL');
    console.log("time:>>>>",a);
    console.log("===>>>>>>>>>>>>>>>>..hrs:", moment(a, 'LLLL').fromNow());*/

    return(
      <List dataArray={this.props.postList}
            renderRow={this.renderRow.bind(this)} />
    )
  }
}
