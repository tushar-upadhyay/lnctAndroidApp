import React from "react"
import {View,Text,Button,AsyncStorage,ImageBackground,TouchableHighlight,StyleSheet} from "react-native"
import Header from "./components/header.js"

import Options from "./components/options.js"


export default class HomeScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {Name:this.props.navigation.getParam("Name"),ImageUrl:this.props.navigation.getParam("ImageUrl")}
    if(!this.state.Name &&!this.state.ImageUrl){
      this.getData()
    }
  }
 static navigationOptions = {
  header:null,
 }

  getData =async ()=>{
     this.setState({Name:await AsyncStorage.getItem("Name"),ImageUrl:await AsyncStorage.getItem("ImageUrl")})
  }
 
  render(){
    return (
      <ImageBackground style={{flex:1}} source ={require("./back3.jpg")} >
      <View style={{height:30,backgroundColor:'black'}}>
      </View>
      <View style={{}}>
       <Header show={"true"} navigation={this.props.navigation} ImageUrl={this.state.ImageUrl} Name={this.state.Name} />
       <Options  navigation={this.props.navigation} />
       </View>
      <View style={{justifyContent:'center',alignSelf:'center'}}>
    <TouchableHighlight
        onPress = {async()=>{this.props.navigation.navigate("Auth")
        await AsyncStorage.clear()
        }}
          style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Sign Out</Text>
        </TouchableHighlight>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
   buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
  
    backgroundColor: "#00b5ec",
  },

  loginText: {
    color: 'white',
  }
})