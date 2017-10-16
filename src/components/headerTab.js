import React, {Component} from 'react';
import {
  Tab,
  TabHeading,
  Text
} from 'native-base';
import styles from '../styles/styles';

export default class HeaderTab extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Tab heading={this.props.heading}
        tabStyle={this.props.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        textStyle={styles.textStyle}>
        <Text>hey</Text>
      </Tab>
    )
  }
}
