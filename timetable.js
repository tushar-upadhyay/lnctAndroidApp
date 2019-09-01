import React from "react"
import {View,Text,AsyncStorage,Image,TouchableWithoutFeedback} from "react-native"
import firebase from "firebase"
import {ImagePicker} from "expo"
// firebase.initializeApp(firebaseConfig);
export default class TimeTable extends React.Component{
    static navigationOptions = {
        title:'Time Table',
        headerStyle: {
            backgroundColor:'orange'
          }
    }
constructor(props){
    super(props)
    this.state = {url:null}

}

getTimeTable = async()=>{
  this.setState({loading:'Fetching Data from our servers'})
    var Branch = await AsyncStorage.getItem("Branch")
    var Semester = await AsyncStorage.getItem("Semester")
    var Section = await AsyncStorage.getItem("Section")
    var storage = firebase.storage();
    var name = String(Section).toLowerCase() + '.jpg'
    var pathReference = storage.ref(`main/${Semester}/${Branch}/${name}`).getDownloadURL().then(res=>this.setState({url:res})).catch(err=>this.setState({error:true}));
   this.setState({Branch:Branch,Semester:Semester,Section:Section})
} 
getImage = async() =>{
    var res = await ImagePicker.launchImageLibraryAsync({mediaTypes:'Images',base64:true})
    if(!res.cancelled){
      this.uploadImageAsync(res.uri) 
    }
    
}
uploadImageAsync= async(uri) =>{
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  var {Section,Semester,Branch} = this.state
  var name  =String(Section).toLowerCase()+ 'test' + '.jpg'
    firebase.storage().ref().child(`/main/${Semester}/${Branch}/${name}`).put(blob)
    this.setState({uploaded:true})
    // We're done with the blob, close and release it
 

  }
  uploaded = ()=>{
      if(this.state.uploaded){
          return(
            <View style={{flex:1,alignItems:'center',marginHorizontal:20}}>
               <Text style={{fontWeight:'bold',fontSize:17,marginTop:20}}>
                Thanks for Uploading..
                After Verifying, It will be available
                  </Text>  
                  </View>
          )
      }
      return(
        <View style={{flex:1,alignItems:'center',marginHorizontal:20}}>
        <Text style={{fontWeight:'bold',marginTop:10,fontSize:17}}>
           Sorry Your time table is not yet available
           </Text>
           <Text style={{marginTop:30,fontSize:15}}>
           If you have time table then please Upload it.
           After Verifying, It will be made available
           </Text>
           <TouchableWithoutFeedback onPress={this.getImage}>
     <View style={{
          backgroundColor: "#00b5ec",
          width:100,
          borderRadius:20,
          height:40,
          alignItems:'center',
          justifyContent:'center',
          fontSize:20,
          marginTop:30,
          alignSelf:'center'
     }}>
    
         <Text>Upload</Text>
   
     </View>
     </TouchableWithoutFeedback>
       
    </View>
      )
  }
  render(){
        if(this.state.url){
            return (
                <View style={{flex:1}}>
        <Image style={{height:'100%',width:'100%',resizeMode:'contain'}} source={{uri:this.state.url}} />
                </View>
                )  
        } 
        if(this.state.error){
          return  this.uploaded()
        }
       return(
           <View style={{flex:1,alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={this.getTimeTable} >
            <View style={{marginTop:10,backgroundColor: "#00b5ec",width:130,borderRadius:20,height:40,alignItems:'center',justifyContent:'center',fontSize:20,alignSelf:'center'
            }}>
           
                <Text>Get TimeTable</Text>
          
            </View>
            </TouchableWithoutFeedback>
            <Text style={{marginTop:10,fontWeight:'bold',fontSize:16,alignSelf:'center'}}>{this.state.loading}</Text>
           </View>
       )
    }
}
