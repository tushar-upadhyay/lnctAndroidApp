import React from "react"
import {View,Text,StyleSheet,AsyncStorage,TouchableWithoutFeedback,Image,FlatList,ScrollView} from "react-native"
import {Ionicons} from "@expo/vector-icons"
export default class Attendance extends React.Component {
  constructor(props){
    super(props)

    console.log(this.props.navigation.getParam('ImageUrl'))
    this.state = {clicked:null,buttonTxt:'Load',height:170,buttonText:'Load SubjectWise',ImageUrl:this.props.navigation.getParam('ImageUrl'),Name:this.props.navigation.getParam('Name')}
    this.getdetails()
  }
  static navigationOptions = {
    title:"Attendance",
    headerStyle : {
      flex:1,
      backgroundColor :"red",
    }
  };
load = async()=>{
  if(this.state.buttonTxt=='Load'){
  if(!this.state.clicked){
    this.setState({clicked:true})
  if(!this.state.Username){
    this.setState({clicked:null})
    return 
  }
  this.setState({Present:'Loading...',Percentage:'Loading..',Total:'Loading..'})
try{
var res = await fetch(`https://newlnct.herokuapp.com/?username=${this.state.Username}&password=${this.state.Password}`)
res = await res.json()
this.setState({buttonTxt:'Clear',clicked:null,Present:res['Present '],Total:res['Total Lectures'],Percentage:res['Percentage'],LecturesNeeded:res['LecturesNeeded'],DaysNeeded:res['DaysNeeded']})
}
catch(err){
  console.log(this.state.Password)

  this.setState({clicked:null,Present:'Error',Total:'Error',Percentage:'Error'})
}
  }
}
else{
  this.setState({Present:null,Total:null,Percentage:null,buttonTxt:'Load'})
}
}
subjectwise = async()=>{
  if(this.state.buttonText=='Clear'){
    this.setState({data:null,buttonText:'Load SubjectWise',Loading:null})
  }
  else{
  if(!this.state.Username){
    return 
  }
  this.setState({Loading:'Loading ..'})
  try{

var res = await fetch(`https://newlnct.herokuapp.com/subjectwise?username=${this.state.Username}&password=${this.state.Password}`)
res = await res.json()
this.setState({data:res,Loading:null,buttonText:'Clear'})
}
catch(err){
  this.setState({Loading:'Error',buttonText:'Load SubjectWise'})
}
  }
} 
show75 = ()=>{
  if(parseInt(this.state.Percentage)<75 && this.state.buttonTxt=='Clear'){
    return(
      <View style={{backgroundColor:'#00BFFF',height:130,paddingVertical:15}}>
      <View style={{width:'80%',alignSelf:'center',alignItems:'center',backgroundColor:'white',borderRadius:15}}>
        <Text style={{color:'red',fontSize:16,fontWeight:'bold',marginTop:10}}>
          Your Attendance is below 75 % 
        </Text>
        <Text style={{marginTop:10}}>
          You Need {this.state.LecturesNeeded} Lectures to cover 75 %
        </Text>
        <Text style={{marginTop:10,marginBottom:10}}>
          or Attend college continue for {this.state.DaysNeeded} days 
        </Text>
  </View>
  </View>
    )
  }
}
loadDateWise =  async()=>{
  try{
    this.setState({dateWiseError:'Loading...',disabled:true})
    var res = await fetch(`https://newlnct.herokuapp.com/dateWise?username=${this.state.Username}&password=${this.state.Password}`)
    res = await  res.json()
    this.setState({dateWiseError:null,disabled:false})
    this.props.navigation.navigate('DateWise',{
      data:res
    })
  }
  catch(err){
    console.log(err)
    this.setState({dateWiseError:'Error',disabled:false})
  }
}
getdetails =async()=>{  
  var Name = await AsyncStorage.getItem("Name")
  var Username = await AsyncStorage.getItem("Username")
  var Password = await AsyncStorage.getItem("Password")
  this.setState({
    Name:Name,
    Username:Username,
    Password:Password
  })
}
whattoreturn =()=>{
  if(this.state.Loading){
    return (
      <View style={{alignSelf:'center',marginTop:10}}>
        <Text style={{fontSize:17,fontWeight:'bold'}}>{this.state.Loading}</Text>
      </View>
    )
  }
  if(this.state.data){
    return (
         <FlatList
            data={this.state.data}
            renderItem = {this.renderItem}
            />
    )
  }
}
renderItem = ({item})=>{
    return(
      <View style={{flexDirection:'row',marginTop:20,marginBottom:10,alignItems:'center',width:'100%',justifyContent:'space-between'}}>
        <View style={{flexWrap:'wrap',maxWidth:'60%'}}>
        <Text style={{marginLeft:20}}>{item.Subject}</Text>
        </View>
        <View><Text style={{marginRight:30}}>{item.Percentage} %</Text></View>   
      </View>
    )
}
  render(){
    return (
      <ScrollView>
      <View style={{flex:1}}>
      <View style={{backgroundColor:'#00BFFF'}}>
        <View style={{marginLeft:10,marginTop:8}}>
        <TouchableWithoutFeedback  onPress={()=>this.props.navigation.openDrawer()}>
     <Ionicons  size={32} name="md-menu" />
   </TouchableWithoutFeedback>
        </View>
  
   </View>
<View>
      <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri:this.state.ImageUrl}}/>
                <Text style={styles.name}>
                 {this.state.Name}
                </Text>
            </View>
    
            <View style={{backgroundColor:'white',height:this.state.height,width:'80%',alignSelf:'center',borderRadius:10,marginBottom:10,justifyContent:'center'}}>
<View style={{alignSelf:"center",borderRadius:10,flexDirection:'row',marginBottom:10,width:'100%',justifyContent:'space-evenly'}} >
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Total Lectures
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
  {this.state.Total}
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Present
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
{this.state.Present}
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
  Percentage
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
 {this.state.Percentage} 
</Text>
</View>
  </View>
 
  <View style={{alignSelf:'center'}}>
  <TouchableWithoutFeedback onPress={this.load} >
            <View style={{marginTop:10,backgroundColor: "#00b5ec",width:100,borderRadius:20,height:40,alignItems:'center',justifyContent:'center',fontSize:20,alignSelf:'center'
            }}>
           
                <Text>{this.state.buttonTxt}</Text>
          
            </View>
            </TouchableWithoutFeedback>
  </View>
  
        </View>
        
        </View>
        {this.show75()}
          </View>
          <View style={{width:'80%',alignSelf:'center',marginTop:20,marginBottom:20,justifyContent:'center'}}>
          <TouchableWithoutFeedback disabled={this.state.disabled} onPress={this.loadDateWise} >
            <View style={{marginTop:10,backgroundColor: "#00b5ec",width:150,borderRadius:20,height:40,alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:10,alignSelf:'center'
            }}>
           
                <Text>Load DateWise</Text>
          
            </View>
            </TouchableWithoutFeedback>
           <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:17}}>{this.state.dateWiseError}</Text>
      </View>
          <View style={{borderColor:'black',borderRadius:10,borderWidth:1,width:'80%',alignSelf:'center',marginTop:20,marginBottom:20,justifyContent:'center'}}>
          <TouchableWithoutFeedback onPress={this.subjectwise} >
            <View style={{marginTop:10,backgroundColor: "#00b5ec",width:150,borderRadius:20,height:40,alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:10,alignSelf:'center'
            }}>
           
                <Text>{this.state.buttonText}</Text>
          
            </View>
            </TouchableWithoutFeedback>
            {this.whattoreturn()}
      </View>
      </View>
      </ScrollView>
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
  box:{

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

