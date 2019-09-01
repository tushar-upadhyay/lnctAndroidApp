import React from "react"
import {View,Text,Dimensions,AsyncStorage,FlatList,ScrollView,TextInput,TouchableWithoutFeedback} from "react-native"
import ProgressCircle from 'react-native-progress-circle'
import {Ionicons} from "@expo/vector-icons"
export default class BunkManager extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:null}
        this.load()
    }
    load = async()=>{
        var Username = await AsyncStorage.getItem('Username')
        var Password =await AsyncStorage.getItem('Password')
        await this.setState({Username:Username,Password:Password})
    } 
    getAttendance=async ()=>{
        try{
        var res = await fetch(`https://forlnct.herokuapp.com/?username=${this.state.Username}&password=${this.state.Password}`)
        res = await res.json()
        var subjectWise = await (fetch(`https://forlnct.herokuapp.com/subjectwise?username=${this.state.Username}&password=${this.state.Password}`))
        subjectWise = await subjectWise.json()
       this.setState({Percentage:res.Percentage,clicked:null,Present:res['Present '],Total:res['Total Lectures'],subjectWise:subjectWise})
    }
    catch(err){
        this.setState({clicked:null,Loading:'Error'})
    }
}
    static navigationOptions ={
        title:'Bunk Manager'
    }
planMyBunk = async()=>{
    if(!this.state.clicked){
    if(this.state.minPercentage!=null&& this.state.minPercentage*100<=100){
    this.setState({clicked:true,Loading:'Planning..'})
    await this.getAttendance()
    console.log(this.state.Percentage)
    if(this.state.minPercentage*100>this.state.Percentage){
        this.setState({Loading:'You cannot bunk as your attendance is currently below your min percentage criteria'})
    }
    else{
        var Lectures = parseInt((this.state.Present-this.state.minPercentage*this.state.Total)/this.state.minPercentage)
        this.setState({Lectures:Lectures})
    }
}
else{
    this.setState({Loading:'Enter Proper Value '})
}
    }
}
renderItem = ({item})=>{
    if(item.Percentage>this.state.minPercentage){
        var maxLectures = parseInt((item.Present-this.state.minPercentage*item.TotalLectures)/this.state.minPercentage)
            var per = parseInt((maxLectures/parseInt(this.state.Lectures)*100))
            console.log(per)
        return (
            <View style={{margin:10,alignItems:'center'}}>
            <ProgressCircle
            percent={per}
            radius={80}
            borderWidth={8}
            color="red"
            shadowColor="#3399FF"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 10 }}>{item.Subject}</Text>
            <Text style={{fontSize:10}}>{maxLectures} Lectures</Text>
        </ProgressCircle>
        </View>
    )
}
else{
    return (
        <View style={{margin:10,alignItems:'center'}}>
        <ProgressCircle
        percent={0}
        radius={80}
        borderWidth={12}
        color="#3399FF"
        shadowColor="red"
        bgColor="#fff"
    >
        <Text style={{ fontSize: 10 }}>{item.Subject}</Text>
        <Text style={{fontSize:10}}>0 Lectures</Text>
    </ProgressCircle>
    </View>
)
}
}
    render(){

    if(this.state.Lectures &&this.state.minPercentage*100<this.state.Percentage){
            return (
                <View style={{alignItems:'center',flex:1,backgroundColor:'black'}}>
                <View style={{backgroundColor:'#3399FF',width:'100%',height:70,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=>this.setState({clicked:null,Loading:null,Lectures:null,minPercentage:null})} style={{marginLeft:10}}>
                    <View style={{marginLeft:10,width:40}}>
                    <Ionicons size={30} name="md-arrow-round-back" />
                    </View>  
                        </TouchableWithoutFeedback>
                    <Text style={{fontSize:18,marginLeft:30}}>Back</Text></View>
                    <View style={{marginTop:20,marginBottom:20,maxWidth:'90%',alignItems:'center',flexWrap:'wrap'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'white',alignSelf:'center'}}>You can Bunk  {parseInt(this.state.Lectures)} Lectures in Total to Maintain {parseInt(this.state.minPercentage*100)} % Attendance Overall</Text>
                    <Text style={{color:'white'}}>
              Following circles shows subject wise Bunk Lectures to maintain {parseInt(this.state.minPercentage*100)} % attendance in respective subject
          </Text>
          </View>
          <ScrollView>
                <FlatList
                    columnWrapperStyle={{justifyContent:'space-between', }}
                    horizontal={false}
                    keyExtractor = {item=>item.Subject}
                    contentContainerStyle={{marginLeft:10}}
                    numColumns={2}
            data={this.state.subjectWise}
            renderItem = {this.renderItem}
            />
            </ScrollView>
                </View>
            )

}
    return (
        <View style={{flex:1,backgroundColor:'#00BFFF'}}>
            <View style={{marginTop:100,width:Dimensions.get('window').width*0.8,backgroundColor:'white',borderRadius:15,alignSelf:'center'}}>
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',marginTop:10}}>Bunk Manager! 😁</Text>
            <TextInput
            textAlign={'center'}
            keyboardType='number-pad'
            placeholderTextColor='black'
            placeholder="Your Minimum percentage goal"
            style={ {alignSelf:'center',width:220,height:50,borderRadius:10,borderColor:'black',borderWidth:1,marginTop:20,justifyContent:'center'}}
            onChangeText = {(minPercentage)=>this.setState({minPercentage:minPercentage/100})}
            />
            <TouchableWithoutFeedback onPress={this.planMyBunk}>
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
           
                <Text>Plan Bunk 😜</Text>
          
            </View>
            </TouchableWithoutFeedback>
            <View style={{flexWrap:'wrap',maxWidth:'80%',alignSelf:'center',marginTop:20}}>
           <Text style={{fontWeight:'bold',fontSize:15,alignSelf:'center'}}>{this.state.Loading}</Text>
            </View>
            </View>
        </View>
    )
}
}