import React from "react"
import {View,Text,Button,AsyncStorage,ImageBackground,Dimensions,StyleSheet} from "react-native"
import Header from "./components/header.js"
import {
  AdMobBanner,
} from 'expo-ads-admob';

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
      <View style={{flex:1}}>
      <ImageBackground style={{flex:1}} source ={require("./back3.jpg")} >
      <View style={{height:30,backgroundColor:'black'}}>
      </View>
     
       <Header show={"true"} navigation={this.props.navigation} ImageUrl={this.state.ImageUrl} Name={this.state.Name} />
       <Options  navigation={this.props.navigation} />
      
       <View style={{marginTop:10,alignItems:"center"}}>
       <View style={{borderBottomWidth:0.5,justifyContent:'flex-end',width:Dimensions.get("window").width,margin:12}} />
       <Text style={{fontSize:16,fontWeight:'bold'}}>To Get Signed Out , Go to Profile in Menu</Text>
       </View>
      </ImageBackground>
   
      {/* <AdMobBanner
       bannerSize="smartBannerPortrait"
       adUnitID="ca-app-pub-4144500271876768/2133943902"
       onDidFailToReceiveAdWithError={this.bannerError} /> */}
       </View>
      
      
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