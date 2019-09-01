import React from "react"
import {View,SafeAreaView,Image,TouchableHighlight,Text,ScrollView,AsyncStorage} from "react-native"
import {DrawerItems} from "react-navigation"
import {AntDesign} from "@expo/vector-icons"
export default class CustomDrawer extends React.Component{
  constructor(props){
    super(props)
    this.state = {ImageUrl:null}
   
  }
  getImageUrl = async ()=>{
    var ImageUrl  = await AsyncStorage.getItem("ImageUrl")
    var Name = await AsyncStorage.getItem("Name")
    var Branch  = await AsyncStorage.getItem("Branch")
    var College = await AsyncStorage.getItem("College")
    var Semester = await AsyncStorage.getItem("Semester")
    var Section = await AsyncStorage.getItem('Section')
    await this.setState({ImageUrl:ImageUrl,
    Name:Name,
    Branch:Branch,
    College:College,
    Semester:Semester,
    Section:Section
    }) 
    
  }
  componentDidUpdate(){
    this.getImageUrl()
  }

  render(){
  return(
  <SafeAreaView style={{flex:1,backgroundColor:'lightyellow'}}>
  <View style={{height:120,backgroundColor:'white',justifyContent:'center'}}>
  <View style={{flexDirection:'row',justifyContent:'space-around'}}>
  <AntDesign style={{fontSize:50}} name="user" />
   <Image  
  source={{uri:this.state.ImageUrl}}
  style={{height:60,width:60,alignSelf:'center',borderRadius:63,borderColor:'white',borderWidth:1}}
  />
  </View>
<TouchableHighlight
onPress = {()=>this.props.navigation.navigate("Profile",{
  Name:this.state.Name,
  College:this.state.College,
  Branch:this.state.Branch,
  Semester:this.state.Semester,
  ImageUrl:this.state.ImageUrl,
  Section:this.state.Section
})}
 style={{borderRadius:20,borderWidth:1,borderColor:"red",backgroundColor:'#00b5ec',height:30,width:100,alignSelf:'center',justifyContent:'center'}}>
  <Text style={{alignSelf:'center',fontWeight:'bold'}}>
   My Profile
  </Text>
 </TouchableHighlight>
  </View>
<ScrollView>
<DrawerItems {...this.props} />
</ScrollView>
  </SafeAreaView>
  )
  }
}

