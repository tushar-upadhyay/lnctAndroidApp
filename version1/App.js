import React from "react"
import {View,Text,AsyncStorage,ActivityIndicator,Alert,Linking} from "react-native"
import {createAppContainer,createSwitchNavigator,createStackNavigator,createDrawerNavigator,DrawerItems,createMaterialTopTabNavigator} from "react-navigation"
import {AntDesign} from "@expo/vector-icons"
import LoginScreen from "./loginScreen"
import Homescreen from "./HomeScreen"
import Attendance from "./Attendance"
import Profile from "./components/profile.js"
import AboutUs from "./components/AboutUs"
import CustomDrawer from "./drawerComponent"
import Result from "./result"
import TimeTable from "./timetable"
import DateWise from "./DateWise"
import BunkMaster from "./BunkMaster"
class LoadingScreen extends React.Component{
  constructor(props){
    super(props)
    this.getDatafromStorage()
  }
getDatafromStorage = async()=>{
  const name = await AsyncStorage.getItem("Name")
  const ImageUrl  = await AsyncStorage.getItem("ImageUrl")
  
  if(name){
    {Alert.alert('Update Application','Please Update from google play\nThis Version is no longer supported\nWe have reduced application size in this update\nif update option is not showing in play store then please reinstall it',[
      {text:'Open Play Store',onPress:()=>{
        Linking.openURL('https://play.google.com/store/apps/details?id=com.tushar.lnctattendance')
        this.props.navigation.navigate("Other",{
          Name:name,
          ImageUrl:ImageUrl
        }) 
    }},
      {text:'Update Later',onPress:()=>{
        this.props.navigation.navigate("Other",{
          Name:name,
          ImageUrl:ImageUrl
        }) 
      }}
    ],
    {cancelable:false}
    )}
    
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
const createTopTabNavigators = createMaterialTopTabNavigator({
  Other:{screen:Attendance},
  BunkMaster:{screen:BunkMaster},
  Result:{screen:Result},
  TimeTable:{screen:TimeTable},

  },
  {
    tabBarPosition:'bottom'
  }
  )

const AppStack = createStackNavigator({
  Home:{screen:createTopTabNavigators,
  navigationOptions:({navigation})=>({
 header:(
   <View style={{backgroundColor:'black',height:30}} />
 )
  })
  },
  Profile:Profile,
  DateWise:{screen:DateWise
    },
},
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