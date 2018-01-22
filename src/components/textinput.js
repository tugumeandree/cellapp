import React, {Component} from 'react'
import {Input, Item} from 'native-base'

export default TextInput = ({placeholder, onChangeText, value})=>{
  return(
    <Input placeholder={placeholder}
      autoFocus
      value={value}
      multiline={true}
      blurOnSubmit={false}
      numberOfLines={6}
      onChangeText={onChangeText}
    />
  )
}
