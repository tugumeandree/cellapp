import React, {Component} from 'react';
import {
  Container, Left, Button, Icon, Grid, Row,
  Content, Footer, Body, Right, Item, Text,
  Thumbnail, Card, CardItem,
} from 'native-base';

import {Image,} from 'react-native';

import MainHeader from './mainheader';
import styles from '../styles/styles';
import TextInput from './textinput';

export default class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      comment: '',
    }
  }

  static navigationOptions = {
    header: null
  }

  comment(){
    const {params} = this.props.navigation.state;
    console.log("params:",params.postKey);
  }

  render(){
    const {params} = this.props.navigation.state;
    const {goBack} = this.props.navigation;

    console.log("params: ",params);

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
