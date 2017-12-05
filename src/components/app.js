import React, { Component } from 'react';

import {
  Container, Tabs, Tab, Text, Fab, Icon, Spinner, Header,
  Left, Button, Body, Title, Content, Item,
  Footer, Col, Row, Grid, Right
} from 'native-base';

import {Alert} from 'react-native'

import MainHeader from './mainheader';
import HeaderTab from './headerTab';
import CellFeed from './cellFeed';
import TextInput from './textinput';

import styles from '../styles/styles';

import firebase from 'react-native-firebase';

var db = firebase.database();

var moment = require('moment');

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated: false,
      postList: [],
      isOnHome: true,
      postTxt: ''
    }
  }

  componentDidMount(){
    firebase.auth().signInAnonymously()
      .then(()=>{
        this.setState({isAuthenticated: true})
      });
  }

  componentWillMount(){
    //console.log("will mount");
    //deal with cellfeed
    let cellfeedRef = db.ref("cellfeed");

    cellfeedRef.on("value", (data)=>{
      let posts = [];
      //console.log(data.val())
      data.forEach((post)=>{
        //console.log(post.val())
        if (post.val().likedBy === undefined){
          //console.log("post key:", post.key)
          let comments = [];//comment and name of commentor

          if (post.val().comments !== undefined){
            for (let i in post.val().comments){
              //console.log(i);
              comments.push({
                comment: post.val().comments[i].comment,
                commentBy: post.val().comments[i].commentBy,
                commentKey: i
              });
            }
          }

          posts.push({
            postedWords: post.val().postedWords,
            postedPic: post.val().postedPic,
            profilePic: post.val().profilePic,
            nComments: post.val().nComments,
            nLikes: post.val().nLikes,
            time: post.val().time,
            postBy: post.val().postBy,
            postKey: post.key,
            comments: comments
          });
        }

        else{
          let comments = [];//comment and name of commentor

          if (post.val().comments !== undefined){
            for (let i in post.val().comments){
              //console.log(post.val().comments[i].comment);
              comments.push({
                comment: post.val().comments[i].comment,
                commentBy: post.val().comments[i].commentBy,
                commentKey: i
              });
            }
          }

          let likedBy = [] //names of people who liked the post
          for (let i in post.val().likedBy){
            likedBy.push(post.val().likedBy[i]);
          }
          //console.log("post key:", post.key)
          posts.push({
            postedWords: post.val().postedWords,
            postedPic: post.val().postedPic,
            profilePic: post.val().profilePic,
            nComments: post.val().nComments,
            nLikes: post.val().nLikes,
            time: post.val().time,
            postBy: post.val().postBy,
            postKey: post.key,
            likedBy: likedBy,
            comments: comments
          });
        }
      })

      posts = posts.reverse();
      this.setState({postList: posts})
    })
  }

  share(){
    //have to add toast
    console.log("postTxt:",this.state.postTxt);
    Alert.alert("Cool");
    this.setState({isOnHome: true});
    //push data to the database
    db.ref('/cellfeed').push({
      postedWords: this.state.postTxt,
      postBy: "Marc Marco",
      postedPic: "",
      nLikes: "0",
      nComments: "0",
      profilePic: "https://pbs.twimg.com/profile_images/378800000799284515/29a425d0cacdfe1c01d2be096854a5a6_400x400.jpeg",
      time: moment().format('LLLL'),
    }).then(()=>{
      console.log("pushed on db");
    })
  }

  goPost(){
    //cause of the fab timeout(100) set timeout
    setTimeout(()=>{
      this.setState({isOnHome: false});
    }, 150);
  }

  render() {
    if (!this.state.isAuthenticated){ //if not authenticated, display a spinner
      return (
        <Container>
          <MainHeader title="cellapp">
            <Left>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Left>
          </MainHeader>
          <Tabs>
            <Tab heading="cell"
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                textStyle={styles.textStyle}
                activeTextStyle={styles.activeTextStyle}>
                {/*<Text>Feed for happenings in the cell</Text>*/}

                <Spinner color="red" />
            </Tab>

            <Tab heading="my buddies"
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                textStyle={styles.textStyle}
                activeTextStyle={styles.activeTextStyle}>
              <Spinner color="red" />
            </Tab>

            <Tab heading="interact"
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                textStyle={styles.textStyle}
                activeTextStyle={styles.activeTextStyle}>
              <Spinner color="red" />
            </Tab>
          </Tabs>
        </Container>
      )
    }

    //if authenticated and the post button is pressed go the posting page
    if (this.state.isAuthenticated && !this.state.isOnHome){
      return(
        <Container>
          <MainHeader title="cellapp">
            <Left>
              <Button transparent onPress={()=> this.setState({isOnHome: true})}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
          </MainHeader>
          <Content>
            <Item style={styles.input}>
              <TextInput placeholder="Share what's on your heart"
                onChangeText={(postTxt)=>this.setState({postTxt})}
              />
            </Item>
          </Content>
          <Footer style={styles.footer}>
            <Body>
              <Button transparent>
                <Icon name="ios-image-outline" style={styles.icn} />
              </Button>
              <Button transparent>
                <Icon name="ios-document-outline" style={styles.icn} />
              </Button>
              <Button transparent>
                <Icon name="ios-link" style={styles.icn} />
              </Button>
            </Body>
            <Right>
              <Button transparent
                onPress={this.share.bind(this)}>
                <Text style={styles.btnTxt}>Share</Text>
              </Button>
            </Right>
          </Footer>
        </Container>
      )
    }

    return (
      <Container>
        <MainHeader title="cellapp">
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
        </MainHeader>
        <Tabs>
          <Tab heading="cell"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}>
              {/*<Text>Feed for happenings in the cell</Text>*/}

              <CellFeed db={db}
                postList={this.state.postList}
                navigation={this.props.navigation} />

              <Fab
                  position="bottomRight"
                  style={styles.fab}
                  onPress={this.goPost.bind(this)}>
                <Icon name="ios-create" />
              </Fab>
          </Tab>

          <Tab heading="my buddies"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}>
            <Text>List of my cell buddies</Text>
          </Tab>

          <Tab heading="interact"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}>
            <Text>
              Prayer requests, testimonies to only leaders, ...
            </Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
