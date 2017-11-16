import React, {Component} from 'react';
import {
  Container, Left, Button, Icon, Grid, Row,
  Content, Footer, Body, Right, Item, Text,
  Thumbnail, Card, CardItem, List, ListItem,
} from 'native-base';

import {Image,} from 'react-native';

import MainHeader from './mainheader';
import styles from '../styles/styles';
import TextInput from './textinput';

import firebase from 'react-native-firebase';

var db = firebase.database();

export default class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      comment: '',
      comments: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount(){
    //get all comments and put them in this.state.comments
    const {params} = this.props.navigation.state;
    let postKey = params.post.postKey;//get the postKey

    //get the comments
    db.ref("cellfeed/"+postKey+"/comments")
      .on("value", (snap)=>{

        let comments = [];
        for(let i in snap.val()){
          comments.push({
            comment: snap.val()[i].comment,
            commentBy: snap.val()[i].commentBy,
            key: i
          });
        }
        this.setState({comments});
      })
  }

  renderRow(comment){
    console.log("key:", comment)
  }

  comment(){
    const {params} = this.props.navigation.state;

    //empty the input box
    let comment = this.state.comment;
    this.setState({comment:''});

    let currRef = db.ref("cellfeed/"+params.post.postKey+"/comments"); //node of the curr post comments
    let nCommentsRef = db.ref("cellfeed/"+params.post.postKey+"/nComments");

    currRef.push({
      comment: comment,
      commentBy: "the other Dude"
    }).then((res)=>{

      let nComments = 0;
      //get the val of the # of comments
      nCommentsRef.once("value", (snap)=>{
        nComments = Number(snap.val())+1;
        //increase the # of comments when a new comment is pushed
        nCommentsRef.set(String(nComments));

      })
    })
  }

  render(){
    const {params} = this.props.navigation.state;
    const {goBack} = this.props.navigation;

    //console.log("params: ",params);

    if (params.post.postedPic === ''){
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
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: params.post.profilePic}} />
                  <Body>
                    <Text>{params.post.postBy}</Text>
                    <Text note>{params.post.postedWords}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            {/*list of the comments*/}
            <List dataArray={this.state.comments}
              renderRow={this.renderRow.bind(this)} />

          </Content>
          <Footer style={styles.footer}>
            <Body>
              <Item style={{width: 300}}>
                <TextInput placeholder="comment"
                  value={this.state.comment}
                  onChangeText={(comment)=> this.setState({comment})}
                />
              </Item>
            </Body>
            <Right>
              <Button transparent onPress={this.comment.bind(this)}>
                <Text>Send</Text>
              </Button>
            </Right>
          </Footer>
        </Container>
      )
    }

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
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: params.post.profilePic}} />
                <Body>
                  <Text>{params.post.postBy}</Text>
                  <Text note>{params.post.postedWords}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Image source={{uri: params.post.postedPic}}
                  style={styles.commentImg}
                />
            </CardItem>
          </Card>

          {/*list of the comments*/}
          <List dataArray={this.state.comments}
            renderRow={this.renderRow.bind(this)} />

        </Content>
        <Footer style={styles.footer}>
          <Body>
            <Item style={{width: 300}}>
              <TextInput placeholder="comment"
                onChangeText={(comment)=> this.setState({comment})}
              />
            </Item>
          </Body>
          <Right>
            <Button transparent onPress={this.comment.bind(this)}>
              <Text>Send</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    )
  }
}
