import React from "react"
import {View,Text,StyleSheet,Image,AsyncStorage,TouchableHighlight,Dimensions} from "react-native"
import {Ionicons} from "@expo/vector-icons"
export default class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {ImageUrl:this.props.ImageUrl,Name:this.props.Name}
    if(!this.state.ImageUrl ){
      this.getData()
    }
  }
showProfile =()=>{
  if(this.props.navigation.getParam("Semester")){
  
    return (
      <View style={styles.header}>
       <Text style={styles.name}>
        {this.props.navigation.getParam("College")}
            </Text>
            <Text style={styles.name}>
        Semester :  {this.props.navigation.getParam("Semester")}
            </Text>
             <Text style={styles.name}>
        Branch :  {this.props.navigation.getParam("Branch")}
            </Text>  
            </View>
    )
  }
  else{
    return null
  }
}
  getData =async()=>{
this.setState({ImageUrl:await AsyncStorage.getItem("ImageUrl"),Name:await AsyncStorage.getItem("Name")})
  }
  showOrNot = ()=>{
    if(this.props.show=="true"){
      return(
        <TouchableHighlight onPress={()=>this.props.navigation.openDrawer()}>
     <Ionicons  size={32} name="md-menu" />
     </TouchableHighlight>
     )
  }
  else{
    return 
  }
  }
  render(){
    return (
      <View>
      <View style={styles.header}>
      <View  style={{paddingLeft:10,justifyContent:"center"}}>
         {this.showOrNot()}
      </View>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: this.state.ImageUrl}}/>
                <Text style={styles.name}>
                  {this.state.Name}
                </Text>
    
            </View>
          </View>
          </View>
    )
  } 
}
const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
   backgroundColor: "#00BFFF",
   height:100
  },
  headerContent:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  },
  avatar:{
   width: 60,
    height: 60,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: "white", 
  },
  name:{
    flex:1,
    alignSelf:'center',
    fontWeight:'bold',
    paddingTop:12
  }
})

