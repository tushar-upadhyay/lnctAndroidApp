import React from "react"
import {View,Text} from "react-native"
import {AntDesign} from "@expo/vector-icons"
export default class AboutUs extends React.Component{
   static navigationOptions = {
  header:null,
   drawerIcon : ({tintColor})=>
      (
     <AntDesign style = {{fontSize:25,color:tintColor}} name="user"/>
   )
   }
  render(){
    return (
      <View style={{justifyContent:'center',alignSelf:'center'}}>
      <Text>About Us</Text>
      </View>
    )
  }
}