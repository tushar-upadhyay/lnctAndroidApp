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
  setData = async (name,username,password ,imageUrl,college,branch,semester,section)=> {
    await AsyncStorage.setItem('Name', String(name));
    await AsyncStorage.setItem('Username',String(username));
    await AsyncStorage.setItem('Password', String(password));
    await AsyncStorage.setItem("ImageUrl",String(imageUrl));
    await AsyncStorage.setItem("College",String(college));
    await AsyncStorage.setItem("Branch",String(branch));
    await AsyncStorage.setItem("Semester",String(semester));
    await AsyncStorage.setItem("Section",String(section));
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
    
    if(this.state.Username&&this.state.Password){
      this.setState({modalVisible:true})
      this.state.Password = encodeURIComponent(this.state.Password)
    var url = `https://forlnct.herokuapp.com/login?username=${this.state.Username}&password=${this.state.Password}&token=${token}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
      this.setState({Name:res.Name,modalVisible:false}) 
      this.setData(this.state.Name,this.state.Username,this.state.Password,res.ImageUrl,res.College,res.Branch,res.Semseter,res.Section) 
      this.props.navigation.navigate("Other",{
        Name:res.Name,
        ImageUrl:res.ImageUrl
      })
    })
    .catch((e)=>
    {
      
      this.setState({modalVisible:false})
   this.setState({error:"Apki ID Ya Password Galat hai! Bhul gye kya 😅😅"})
 
   })
  }
 

  else{
    this.setState({error:"Are Bhai Bina Id or Password ke kaise Login Karoge 😂"})
  }
  }
  render() {
    return (
      <ImageBackground source={require("./assets/back.jpg")} style={styles.backgroundImage} >
          <View style={{height:25,backgroundColor:'black'}}></View>
      <View style={styles.container}>
      <Image source={require("./assets/icon.png")} style={{alignSelf:'center',width:180,height:180,marginTop:height*0.08}} ></Image>
       
       <View style={{marginTop:height*0.04}}>
       <View style={{alignSelf:'center',width:250
      }}>
        <Text style={{marginTop:5,color:"red",fontWeight:"bold",alignSelf:'center',marginHorizontal:20}}>{this.state.error}</Text>
        </View>       
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
            onChangeText={(username)=>this.setState({Username:username,error:null})}
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
            onChangeText={(password)=>this.setState({Password:password,error:null})}
          />
        </View>
        <TouchableHighlight
        onPress = {this.submit}
          style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        
        
       
      </View>
      </View>
      <Text style={{fontWeight:'bold',color:'black',alignSelf:'center',justifyContent:'flex-end'}} >A Product By Tushar Upadhyay</Text>
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
      color:'white',
      alignItems:'center',
      width:250
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
