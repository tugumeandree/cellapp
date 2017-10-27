import React, {Component} from 'react'
import {Input, Item} from 'native-base'



export default TextInput = ({placeholder, onChangeText})=>{
  return(
    <Input placeholder={placeholder}
      multiline={true}
      blurOnSubmit={false}
      numberOfLines={6}
      onChangeText={onChangeText}
    />
  )
}
