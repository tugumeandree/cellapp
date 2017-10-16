import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {
  Container,
  Tabs,
  Tab,
  Text,
  Fab,
  Icon,
  Spinner
} from 'native-base';

import MainHeader from './src/components/mainheader';
import HeaderTab from './src/components/headerTab';
import CellFeed from './src/components/cellFeed'

import styles from './src/styles/styles';

import firebase from 'react-native-firebase';

var db = firebase.database();

export default class cellapp extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated: false,
      postList: []
    }
  }

  componentDidMount(){
    firebase.auth().signInAnonymously()
      .then(()=>{
        this.setState({isAuthenticated: true})
      });
  }

  componentWillMount(){
    console.log("will mount");
    //deal with cellfeed
    let cellfeedRef = db.ref("cellfeed");
    let posts = [];

    cellfeedRef.on("value", (data)=>{
      console.log(data.val())
      data.forEach((post)=>{
        console.log(post.val())
        posts.push({
          postedWords: post.val().postedWords,
          postedPic: post.val().postedPic,
          profilePic: post.val().profilePic,
          nComments: post.val().nComments,
          nLikes: post.val().nLikes,
          time: post.val().time,
          postBy: post.val().postBy,
          postKey: post.Key
        });
      })
      this.setState({postList: posts})
    })
  }

  render() {
    if (!this.state.isAuthenticated){
      return (
        <Container>
          <MainHeader />
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
    return (
      <Container>
        <MainHeader />
        <Tabs>
          <Tab heading="cell"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}>
              {/*<Text>Feed for happenings in the cell</Text>*/}

              <CellFeed postList={this.state.postList} />

              <Fab
                  position="bottomRight"
                  style={styles.fab}>
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


AppRegistry.registerComponent('cellapp', () => cellapp);
