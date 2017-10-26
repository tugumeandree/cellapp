import React, {Component} from 'react'
import {
  Icon, List, ListItem, Text, Thumbnail,
  Left, Body, Right, Grid, Row, Col, Button
} from 'native-base';

import {Image, TouchableOpacity} from 'react-native'
import LikeBtn from './likebtn'

var moment = require('moment');
var username = "Marc Marco";

export default class CellFeed extends Component{
  like(key, likedBy, likes){
    //console.log("post key:", key);
    likes = Number(likes);

    let hasLiked = false
    for (let i in likedBy)
    {
      if (likedBy[i]===username){
        hasLiked = true;
      }
    }
    if (!hasLiked){
      likes +=1;
      this.props.db.ref("cellfeed/"+key+"/likedBy").push(username);
      this.props.db.ref("cellfeed/"+key+"/nLikes").set(likes.toString());
    }
  }

  renderRow(post){
    const {navigate} = this.props.navigation;

    //console.log(post.comments)

    if (post.postedPic === ''){
      return (
        <ListItem key={post.postKey} avatar style={styles.list}>
          <Grid>
            <TouchableOpacity onPress={()=>navigate('Comment', {
              comments: post.comments
            })}>
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
            </TouchableOpacity>
            <Row>
              <Col></Col>
              <Col>
                <Grid>
                  <Row>
                    <Button transparent>
                      <Icon name="ios-text-outline" />
                    </Button>
                    <Text note>{" "+post.nComments}</Text>
                  </Row>
                </Grid>
              </Col>
              <Col>
                <Grid>
                  <Row>
                    <LikeBtn likedBy={post.likedBy}
                        onPress={this.like.bind(this, post.postKey, post.likedBy, post.nLikes)}
                    />
                    <Text note>{" "+post.nLikes}</Text>
                  </Row>
                </Grid>
              </Col>
            </Row>
          </Grid>
        </ListItem>
      )
    }
    return(
      <ListItem key={post.postKey} avatar style={styles.list}>
        <Grid>
          <TouchableOpacity onPress={()=>navigate('Comment', {
            comments: post.comments
            })}>
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
          </TouchableOpacity>
          <Row>
            <Col></Col>
            <Col>
              <Grid>
                <Row>
                  <Button transparent>
                    <Icon name="ios-text-outline" />
                  </Button>
                  <Text note>{" "+post.nComments}</Text>
                </Row>
              </Grid>
            </Col>
            <Col>
              <Grid>
                <Row>
                  <LikeBtn likedBy={post.likedBy}
                    onPress={this.like.bind(this, post.postKey, post.likedBy, post.nLikes)} />
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
    //for (let in )
    //console.log(this.props.navigation)


    /*let a = moment().format('LLLL');
    console.log("time:>>>>",a);
    console.log("===>>>>>>>>>>>>>>>>..hrs:", moment(a, 'LLLL').fromNow());*/

    return(
      <List dataArray={this.props.postList}
            renderRow={this.renderRow.bind(this)} />
    )
  }
}
