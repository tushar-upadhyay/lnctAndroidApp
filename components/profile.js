import React from "react"
import {View,Text,StyleSheet,Image,Dimensions} from "react-native"
import Header from "./header"
var {height,width} = Dimensions.get("window")
export default class Profile extends React.Component{
  static navigationOptions={
    title:"Profile",
    headerStyle: {
      flex:1,
      backgroundColor:'red'
    }
  }
  render(){
    return(
     <View style={{flex:1,alignItems:'center',backgroundColor:"#00BFFF"}}>
     <View style={{marginTop:20,alignItems:'center'}}>
       <View style={{padding:10,borderBottomWidth:0.4,width:width,alignItems:'center'}}>
     <Text style={{fontWeight:'bold',fontSize:20,marginTop:15}}>
           {this.props.navigation.getParam("College")}
     </Text>
     </View>
     <Image style={{marginTop:10,height:80,width:80,borderColor:"white",borderRadius:40,resizeMode:"cover"}} source ={{uri:this.props.navigation.getParam("ImageUrl")}} />
     <View style={{padding:10,borderBottomWidth:0.4,width:width,alignItems:'center'}}>
     <Text style={{fontWeight:'bold',marginTop:15}}>
           {this.props.navigation.getParam("Name")}
     </Text>
     </View>
   
      <View style={{padding:10,borderBottomWidth:0.4,width:width,alignItems:'center'}}>
     <Text style={{fontWeight:'bold',marginTop:15}}>
          Branch:  {this.props.navigation.getParam("Branch")}
     </Text>
     </View>
        <View style={{padding:10,borderBottomWidth:0.4,width:width,alignItems:'center'}}>
     <Text style={{fontWeight:'bold',marginTop:10}}>
          Semester:  {this.props.navigation.getParam("Semester")}
     </Text>
     </View>
     </View>
     </View>
    )
  }
}