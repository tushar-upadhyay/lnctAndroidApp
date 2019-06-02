import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {Notifications,Permissions} from "expo"
var {height,width} = Dimensions.get("window")
import {firebaseConfig} from "./firebaseConfig"
import firebase from "firebase"
firebase.initializeApp(firebaseConfig)
var token;
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: null ,Username:null,Password:null,modalVisible:false};
    
  }
  static navigationOptions = {
    header: null
  };
  setData = async (name,username,password ,imageUrl,college,branch,semester)=> {
    await AsyncStorage.setItem('Name', name);
    await AsyncStorage.setItem('Username',username);
    await AsyncStorage.setItem('Password', password);
    await AsyncStorage.setItem("ImageUrl",imageUrl);
    await AsyncStorage.setItem("College",college)
    await AsyncStorage.setItem("Branch",branch);
    await AsyncStorage.setItem("Semester",semester);
  };
  registerForPushNotificationsAsync = async()=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return null;
    }
    // Get the token that uniquely identifies this device
    token = await Notifications.getExpoPushTokenAsync();
     
  }
  componentDidMount(){
   this.registerForPushNotificationsAsync()
   
      }

  submit = ()=>{
    this.setState({modalVisible:true})
    fetch(`https://lnctapi.herokuapp.com/?username=${this.state.Username}&password=${this.state.Password}`)
    .then(e=>e.json())
    .then(res=>{
      this.setState({Name:res.Name,modalVisible:false}) 
      this.setData(this.state.Name,this.state.Username,this.state.Password,res.ImageUrl,res.College,res.Branch,res.Semester) 
      firebase.database().ref(this.state.Name).set({
        token:token,
        username:this.state.Username,
        password:this.state.Password
  
      })
      this.props.navigation.navigate("Home",{
        Name:res.Name,
        ImageUrl:res.ImageUrl
        
      })
    })
    .catch((e)=>
    {this.setState({modalVisible:false})
   this.setState({error:"Your ID or Password is not Correct"})
   console.log(e)
   })
  }
  render() {
    return (
      <ImageBackground source={require("./assets/back.jpg")} style={styles.backgroundImage} >
          <View style={{height:25,backgroundColor:'black'}}></View>
      <View style={styles.container}>
      <Image source={require("./assets/icon.png")} style={{alignSelf:'center',width:180,height:180,marginTop:height*0.08}} ></Image>
       <View style={{marginTop:height*0.08}}>       
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
            }}
          />
           <Modal 
       style={{height:"20%"}}
          transparent={true}
          onRequestClose={() => {
            
          }}
          visible={this.state.modalVisible}
          >
         <ActivityIndicator style={styles.activityIndicator}  size={70} />
        
          </Modal>
          <TextInput
            style={styles.inputs}
            placeholder="ACCSOFT ID"
            keyboardType="number-pad"
            underlineColorAndroid="transparent"
            onChangeText={(username)=>this.setState({Username:username})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(password)=>this.setState({Password:password})}
          />
        </View>
        <TouchableHighlight
        onPress = {this.submit}
          style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <Text>{this.state.error}</Text>
      </View>
      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    height:height-25
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: 'black',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:50,
      marginTop:10,
      flexDirection: 'row',
      alignItems:'center',
     
  },
 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
     height:'100%',
     width:'100%'

  },
  activityIndicator: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,
  inputs:{
  
      height:50,
       marginLeft:16,
      borderBottomColor: '#FFFFFF',
      color:'white'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    // flex:1,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    // flex:1,
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
