import React from "react"
import {View,Text,AsyncStorage,ActivityIndicator,SafeAreaView,ScrollView,Image,TouchableHighlight,Dimensions} from "react-native"
import {createAppContainer,createSwitchNavigator,createStackNavigator,createDrawerNavigator,DrawerItems} from "react-navigation"
import {Ionicons,AntDesign} from "@expo/vector-icons"
import LoginScreen from "./loginScreen"
import Homescreen from "./HomeScreen"
import Attendance from "./Attendance"
import Profile from "./components/profile.js"
import AboutUs from "./components/AboutUs"
import CustomDrawer from "./drawerComponent"

class LoadingScreen extends React.Component{
  constructor(props){
    super(props)
    this.getDatafromStorage()
    
  }

getDatafromStorage = async()=>{
  const name = await AsyncStorage.getItem("Name")

  if(name){
    this.props.navigation.navigate("Home",{
      Name:name,
      deleteData:"fuck you"
    })
  }
 else{
   this.props.navigation.navigate("Auth")
 }
}
deleteData = async()=>{
   await AsyncStorage.clear()
}
render(){
   return (
     <View style ={{flex:1,justifyContent:'center'}}>
      
        <ActivityIndicator  color="grey" size="large" />
     </View>
   )
}
} 
const AppStack = createStackNavigator({
Home:Homescreen,
Other:{screen:Attendance},
Profile :{screen:Profile}

}
)
const Drawer  = createDrawerNavigator({
  Home:{screen:AppStack,
  navigationOptions:{
    drawerIcon:()=>(<AntDesign  name="home" style={{fontSize:25}} />)
  }},
  AboutUs:{screen:AboutUs
  ,navigationOptions:{
    drawerIcon:()=>(<AntDesign  name="profile" style={{fontSize:25}} />)
    },}, 
  },
  {
    contentComponent:CustomDrawer,
    contentOptions:{
      activeTintColor:'orange'
    }
  }
)


const AuthStack = createStackNavigator({
  LoginScreen:LoginScreen
}) 

export default createAppContainer(createSwitchNavigator(
  {
  Loading:LoadingScreen,
  App:Drawer,
  Auth:AuthStack,
  
},
{
initialRouteName:'Loading'
}
))