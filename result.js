import React from "react"
import {View,Text,TextInput,TouchableWithoutFeedback,ScrollView} from "react-native"


export default class Result extends React.Component{
    static navigationOptions={
        title:"RGPV Results",
        headerStyle: {
          backgroundColor:'orange'
        }
        
      }
    state={rollno:null,CGPA:null,clicked:null,loading:null}
    getResult = ()=>{
        if(!this.state.loading){
            
        if(!this.state.rollno || !this.state.semester){
            this.setState({error:"Both Fields are required"})
        }
        else if(this.state.semester>8){
            this.setState({error:'Enter valid semester'})
        }
        else if((this.state.rollno).length<10){
            this.setState({error:"Enter valid Enrollment number"})
        }
        else{
        this.setState({clicked:true,name:'Loading...',CGPA:'Loading...',SGPA:'Loading...',error:null})
        var url= "https://rgpv-result.herokuapp.com/api?rollNo="+this.state.rollno+"&semester=" +this.state.semester+"&key=iamadmin"
        fetch(url).then(res=>res.json())
        .then(res=>{
            this.setState({clicked:null,loading:null})
            if(res.success===true){
                this.setState({name:res.body.data.name,CGPA:res.body.data.cgpa,SGPA:res.body.data.sgpa,error:null})     
            }
            else{
                this.setState({error:"The RGPV Servers are not responding... or Enrollment no is invalid",CGPA:'',SGPA:'',name:''})
            }
        }).catch(err=>{
            console.log(err)
            this.setState({cliked:null,error:"error",loading:null,CGPA:null,name:null,SGPA:null})})
        }
    }
    }

render(){
    return (
        <ScrollView style={{flex:1,backgroundColor:'#66e1dc'}}>
        <View >
            
            <View style={{height:70,backgroundColor:'white',borderBottomWidth:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:17,fontWeight:'bold'}}>RGPV Results</Text>
                </View>
            <View style={{backgroundColor:'#66e1dc',height:550}} >
                <Text style={{alignSelf:'center',fontWeight:'bold',fontsize:15,marginHorizontal:10}}>This feature is in development! </Text>
                <View style={{marginTop:60,backgroundColor:'white',borderRadius:15,width:'80%',alignSelf:'center'}}>
            <Text style={{marginTop:5,fontWeight:'bold',fontSize:15,alignSelf:'center'}}>Get RGPV Results without Captcha!</Text>
            <View style={{alignItems:'center',height:50,paddingHorizontal:20}}>
            <TextInput
            textAlign={'center'}
            placeholderTextColor='black'
            placeholder="Enter Enrollment number"
            style={ {width:180,height:50,borderRadius:10,borderColor:'black',borderWidth:1,marginTop:20,justifyContent:'center'}}
            onChangeText = {(rollno)=>this.setState({rollno:rollno})}
            />
             <TextInput
             textAlign={'center'}
             placeholderTextColor="black"
            placeholder="Enter Semester"
            keyboardType="number-pad"
            style={{width:180,height:50,borderRadius:10,borderColor:'black',borderWidth:1,marginTop:20,justifyContent:'center'}}
            onChangeText = {(semester)=>this.setState({semester:semester})}
            />
            </View>
            <View style={{marginTop:100,marginBottom:20}}>
            <TouchableWithoutFeedback onPress={this.getResult}>
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
           
                <Text>GetResult</Text>
          
            </View>
            </TouchableWithoutFeedback>
            </View>
            <Text style={{alignSelf:'center',fontWeight:'bold',color:'red',marginTop:10,marginBottom:10}}>{this.state.error}</Text>
            </View>
            <View style={{borderRadius:15,marginTop:30,backgroundColor:'white',height:100,width:'80%',alignSelf:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            
            <View style={{alignSelf:"center",borderRadius:10,flexDirection:'row',marginBottom:10,width:'100%',justifyContent:'space-evenly'}} >
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17,alignSelf:'center'}}>
  Name
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
{this.state.name}
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
 CGPA
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
{this.state.CGPA}
</Text>
</View>
<View>
<Text style={{marginTop:10,color:'grey',fontSize:17}}>
SGPA
</Text>
<Text style={{marginTop:15,color:'#00BFFF',fontSize:17,alignSelf:'center'}}>
{this.state.SGPA}
</Text>
</View>
  </View>
            </View>
            </View>
            </View>
            
            </View>
     </ScrollView>     
    )
    

}
}