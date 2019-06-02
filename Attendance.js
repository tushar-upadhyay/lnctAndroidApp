import React from "react"
import {View,Text,StyleSheet,Dimensions} from "react-native"
import Header from "./components/header"
var {width,height} = Dimensions.get("window")
export default class Attendance extends React.Component {
  constructor(props){
    super(props)
 
  }
  static navigationOptions = {
    title:"Attendance",
    headerStyle : {
      flex:1,
      backgroundColor :"red",
    }
  };

  render(){
    return (
      <View style={{flex:1}}>
      <Header navigation={this.props.navigation}/>
      <View style={{justifyContent:'center',alignItems:"center"}}>
       <View style={styles.data}> 
       <Text style={styles.text}>
        Total Lectures: {this.props.navigation.getParam("Total")}
       </Text>
       </View>
       <View  style={styles.data}>
       <Text style={styles.text}>  
      Present In : {this.props.navigation.getParam("Present")}
       </Text>
       </View>
       <View style={styles.data}>
       <Text style={styles.text}>
      Percentage  : {this.props.navigation.getParam("Percentage")} %
       </Text>
       </View>
       
      </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  data:{
   marginTop:20,
   borderColor:'black',
   borderBottomWidth:0.5,
   alignItems:'center',
   width:width-5,
   padding:10
  },
  text:{
    fontWeight:'bold'
  }
})