import React from "react"
import {View,Text,AsyncStorage} from "react-native"
export default class LabManuals extends React.Component{
    constructor(props){
        super(props)
        this.getSubjectWise()
    }
    static navigationOptions =  {
        title:'Subject Wise Attendance',
        headerStyle: {
            backgroundColor:'orange'
          }
    }
getSubjectWise = async()=>{
var username = await AsyncStorage.getItem('Username')
var password = await AsyncStorage.getItem('Password')
var url = `https://lnctapi.herokuapp.com/subjectwise?username=${username}&password=${password}`
var res = await fetch(url)
res = await res.json()
console.log(res)
}
    render(){
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{marginTop:10,fontWeight:'bold',fontSize:17}}>
                    This feature is still in development.....
                </Text>
            </View>
        )
    }
}