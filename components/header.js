import React from "react"
import {View,Text,StyleSheet,Image,AsyncStorage,TouchableHighlight,TouchableWithoutFeedback} from "react-native"
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
        <TouchableHighlight style={{marginTop:10}} onPress={()=>this.props.navigation.openDrawer()}>
     <Ionicons   size={32} name="md-menu" />
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
            <View style={{backgroundColor:'white',height:170,width:'80%',alignSelf:'center',borderRadius:10,marginBottom:10,justifyContent:'center'}}>
<View style={{alignSelf:"center",borderRadius:10,flexDirection:'row',justifyContent:'space-evenly',marginBottom:10,width:'100%'}} >
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Total Lectures
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
  100
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Present
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
  100
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Percentage
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
  100
</Text>
</View>
  </View>
  <View style={{alignSelf:'center'}}>
  <TouchableWithoutFeedback >
            <View style={{marginTop:10,backgroundColor: "#00b5ec",width:100,borderRadius:20,height:40,alignItems:'center',justifyContent:'center',fontSize:20,alignSelf:'center'
            }}>
           
                <Text>Load</Text>
          
            </View>
            </TouchableWithoutFeedback>
  </View>
  
        </View>
        </View>
          </View>
    )
  } 
}
const styles = StyleSheet.create({
  header:{
    flexDirection:'column',
   backgroundColor: "#00BFFF",
   height:350
  },
  headerContent:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  
  },
  avatar:{
   width: 80,
    height: 80,
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

