import React from "react"
import {View,Text,AsyncStorage,Image,Alert,ActivityIndicator,StyleSheet,Linking,TouchableHighlight,Dimensions,Modal} from "react-native"
var {width,height} = Dimensions.get("window")

export default class Options extends React.Component{
  constructor(props){
    super(props)
    this.state = {modalVisible:false}
  }
  // componentDidMount(){
  //   this._notificationSubscription = Notifications.addListener(this._handleNotification);
  //  }
 
  //  _handleNotification = (notification)=>{
  //     if(notification.data.attendance){
  //       this.getAttendance()
  //     }
  //     else if(notification.data.url){ 
  //       Alert.alert(
  //         notification.data.title,
  //         notification.data.body
  //         ,
  //         [
  //           {text:notification.data.open,onPress: ()=>Linking.openURL(notification.data.url)},
  //         ],
  //         {cancelable: false},
  //       );
  //     }
  //     else{
  //       return null;
  //     }
  //   }
  getAttendance = async()=>{
var Username = await AsyncStorage.getItem("Username")
var Password  = await AsyncStorage.getItem("Password")
  this.setState({modalVisible:true})
    fetch(`https://lnctapi.herokuapp.com/?username=${Username}&password=${Password}`)
    .then(e=>e.json())
    .then(res=>{
      console.log(res.Present)
      this.setState({modalVisible:false}) 
     this.props.navigation.navigate("Other",{
        Present:res['Present '],
        Percentage:res.Percentage,
        Total:res['Total Lectures']

      })
    }).catch((err)=>{this.setState({modalVisible:false})
    Alert.alert('Error!','Server Is Not Responding!')
    })}
  render(){
    return (
     
      <View style={styles.body}>
            <View style={styles.bodyContent}>

              <View style={styles.menuBox}>
              <TouchableHighlight onPress={this.getAttendance}>
              <Image style={styles.icon} source={require("../assets/Attendance.png")}/>
              </TouchableHighlight>
              
              </View>
         <Modal 
       style={{height:"20%"}}
          transparent={true}
          onRequestClose={() => {
            
          }}
          visible={this.state.modalVisible}
          >
         <ActivityIndicator style={{flex:1,justifyContent:'center',alignSelf:'center'}}  size={70} />
        
          </Modal>
              <View style={styles.menuBox}>
              <TouchableHighlight onPress={()=>this.props.navigation.navigate("TimeTable")}>
                <Image style={styles.icon} source={require("../assets/tt.png")}/>
            </TouchableHighlight>
              </View>

              <View style={styles.menuBox}>
              <TouchableHighlight onPress={()=>this.props.navigation.navigate("LabManuals")}>
                <Image style={styles.icon} source={require("../assets/lab.png")}/>
               </TouchableHighlight>
              </View>

              <View style={styles.menuBox}>
                <TouchableHighlight onPress={()=>this.props.navigation.navigate("Result")}>
                  <View>
                <Image style={styles.icon} source={{uri: 'http://ceowestbengal.nic.in/images/Result3.jpg'}}/>
                
                </View>
                </TouchableHighlight>
                
              </View>
   
      
            </View>
        </View>
      
    )
  }
}
const styles = StyleSheet.create({
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    alignSelf:'center',
    margin:15,
  
  },
  
  menuBox:{
    width:width/3-2,
     height:100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
     borderColor:'black',
    marginTop:60,
    marginHorizontal:width/16,
   // paddingHorizontal:width/8
  },
  icon: {
    flex:1,
   width:width/3,
    height:102,
    resizeMode:'stretch'
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
})