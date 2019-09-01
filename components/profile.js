import React from "react"
import {View,Text,StyleSheet,Image,Dimensions,TouchableHighlight,AsyncStorage} from "react-native"
import {
  AdMobBanner,
} from 'expo-ads-admob';
import firebase from "firebase"



export default class Profile extends React.Component{

  static navigationOptions={
    title:"Profile",
    headerStyle: {
      backgroundColor:'red'
    }
    
  }
  
  render(){
    return(
      <View style={{flex:1,backgroundColor:"#00BFFF",alignItems:'center'}}>
         <Image style={{marginTop:10,height:80,width:80,borderColor:"white",borderRadius:40,resizeMode:"cover"}} source ={{uri:this.props.navigation.getParam("ImageUrl")}} />
     <View style={{alignItems:'center',backgroundColor:"white",height:300,marginTop:20,width:'80%',flexWrap:'wrap',borderRadius:16}}>
     <View style={{marginTop:5,flex:1,alignItems:'center',marginHorizontal:10,alignContent:'center'}}>   
     
     <Text style={{fontWeight:'bold',marginTop:20}}>
           {this.props.navigation.getParam("Name")}
     </Text>
     <Text style={{fontWeight:'bold',marginTop:20}}>
          Branch:  {this.props.navigation.getParam("Branch")}
     </Text>
     <Text style={{fontWeight:'bold',marginTop:20}}>
          Section:  {this.props.navigation.getParam("Section")}
     </Text>
     <Text style={{fontWeight:'bold',marginTop:20}}>
          Semester:  {this.props.navigation.getParam("Semester")}
     </Text>
     <Text style={{fontWeight:'bold',marginTop:50,color:'#00BFFF',fontSize:16}}>
     {this.props.navigation.getParam("College")}
     </Text>
     </View>
</View>
     <View style={{justifyContent:'center',alignSelf:'center'}}>
    <TouchableHighlight
        onPress = {async()=>{  
        var name = this.props.navigation.getParam("Name")
        firebase.database().ref(name).remove()
        firebase.database().ref("Logouts/"+name).set({
        name:name,
        branch:this.props.navigation.getParam('Branch')
        })
        this.props.navigation.navigate("Auth")
        await AsyncStorage.clear() 
        }}
          style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Sign Out</Text>
        </TouchableHighlight>
      </View>
      <View style={{position:'absolute',bottom:0}}><AdMobBanner
  bannerSize="smartBannerPortrait"
  adUnitID="ca-app-pub-4144500271876768/2133943902" 
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={this.bannerError} /></View>
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
  marginVertical:20,
   width:250,
   borderRadius:30,
 },
 loginButton: {
 
   backgroundColor: "red",
 },

 loginText: {
   color: 'white',
 }
})