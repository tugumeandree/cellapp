import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,          // Container component
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './button';
import Swiper from './swiper';

export default class Screens extends Component {
    static navigationOptions ={
      header: null
    }
    componentDidMount(){
      StatusBar.setHidden(true);
    }
    render() {
      const {navigate} = this.props.navigation;
        return (
          <Swiper
            onPress={()=>navigate('Home')}>
            {/* First screen */}
            <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
              <Icon name="ios-call" {...iconStyles} />
              <Text style={styles.header}>CALL</Text>
              <Text style={styles.text}>TRY OUR HOME SERVICES</Text>
            </View>
            {/* Second screen */}
            <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
              <Icon name="ios-heart" {...iconStyles} />
              <Text style={styles.header}>BOOK</Text>
              <Text style={styles.text}>FOR BRIDAL AND OTHERS</Text>
            </View>
            {/* Third screen */}
            <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
              <Icon name="ios-map" {...iconStyles} />
              <Text style={styles.header}>LOCATE</Text>
              <Text style={styles.text}>KNOW THE SALONS NEAR YOU</Text>
            </View>
          </Swiper>
        );
      }
    }


const iconStyles = {
    size: 100,
    color: '#FFFFFF',
  };

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
