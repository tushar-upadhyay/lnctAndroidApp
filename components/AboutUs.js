import React from "react"
import {View,Text,StyleSheet,TouchableHighlight,Dimensions,Linking} from "react-native"
import {AntDesign} from "@expo/vector-icons"
class AboutUs extends React.Component{
static navigationOptions = {
  title:"About Us"
}
  render(){
  return(
    <View style={styles.container}>
    <View style={styles.header}>
    <TouchableHighlight style={{paddingTop:20,
    paddingLeft:10,
     alignSelf:'center'}} onPress={()=>this.props.navigation.navigate("Home")}>
     <AntDesign style={styles.icon} name="arrowleft" / >
     </TouchableHighlight>
    <Text style={styles.text}>
       About Us
    </Text>
    </View>
<View >
</View>
<View style={styles.body}>
   <Text style={{fontSize:17,fontWeight:'bold',alignSelf:'center',paddingTop:20}}>
    You might be thinking how this application is working? Because this is not a official app
   </Text>
    <Text style={{fontSize:17,alignSelf:'center',paddingTop:10}}>
    And the answer is as you login with your Accsoft Id and Password ,the request is redirected to college Servers where by some process (Not going Technical here) the website returns your data ...
    All the source code of this app is available on Github you can get if you want to see the code of the application
   </Text>
   <View  style={{paddingTop:10,borderBottomWidth:0.5,borderBottomColor:'black',width:Dimensions.get("window").width}}>
   </View>
   <Text style={{paddingTop:15,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>
      About Me
   </Text>
   <Text style={{paddingTop:10,fontSize:15,alignSelf:'center'}}>
    Tushar Upadhyay
   </Text>
    <Text style={{paddingTop:10,fontSize:15,alignSelf:'center'}}>
      LNCT CSE
   </Text>
     <View  style={{paddingTop:10,borderBottomWidth:0.5,borderBottomColor:'black',width:Dimensions.get("window").width}}>
   </View>
   <Text style={{fontWeight:'bold',fontSize:15,paddingTop:10}}>
     App Version : 1.0.2
   </Text>
    <Text style={{fontWeight:'bold',fontSize:15,paddingTop:10}}>
     Written In : React Native
   </Text>
     <Text style={{fontWeight:'bold',fontSize:15,paddingTop:10}}>
     Github Link : 
     <Text onPress={()=>Linking.openURL("https://github.com/tusharrockpg")} style={{fontWeight:'bold',fontSize:15,color:'blue'}}>
      {` `}  https://github.com/tusharrockpg
     </Text>
   </Text>
   </View>
</View>
  )
  }
}
const styles=StyleSheet.create({
container:{
  height:Dimensions.get("window").height
},
  header:{
    height:85,
    justifyContent:'flex-start',
    backgroundColor:"red",
    flexDirection:'row'
  },
  icon:{
    fontSize:20
  },
  text:{
    fontWeight:'bold',
    fontSize:20,
    paddingTop:20,
    paddingLeft:20,
    alignSelf:'center'
  },
  body:{
    flex:1,
  backgroundColor:'lightyellow',
    alignItems:'center',
   paddingHorizontal:15
  }
})
export default AboutUs;