import React from "react"
import {View,Text,SectionList,TouchableWithoutFeedback} from "react-native"
import {AntDesign} from "@expo/vector-icons"

export default class DateWise extends React.Component{
    constructor(props){
        super(props)
        this.updated = this.props.navigation.getParam('data')[0][this.props.navigation.getParam('data')[0].length-1]['date']
        this.state ={data:this.props.navigation.getParam('data')[0],reversedData:this.props.navigation.getParam('data')[1]}
    }
    static navigationOptions = {
        title:'Date Wise Analysis',
       headerStyle:{
           backgroundColor:'#3399FF'
       }
    }
    sort=()=>{
       var x = this.state.data
       this.setState({data:this.state.reversedData,reversedData:x})
    }
    renderSubjects = ({item})=>{
        console.log(item)
        return (
        <View >
            <Text style={{alignSelf:'center'}}>{item.date}</Text>
          <View style={{flexDirection:'row',marginTop:20,marginBottom:10,alignItems:'center',width:'100%',justifyContent:'space-between'}}>
            <View style={{flexWrap:'wrap',maxWidth:'60%'}}>
            <Text style={{marginLeft:20}}>{Object.keys(item)}</Text>
            </View>
            <View></View>   
          </View>
          </View>
          )
    
    }
    renderSectionHeader = ({section})=>{
     return(
         <View style={{marginTop:10}}>
         <View style={{alignItems:'center',height:15}}>
             <Text style={{fontSize:16,fontWeight:'bold'}}>
                 {section.date}
                 </Text>
            
             </View>
             </View>
     )
    }
    renderItems = ({item})=>{
        return (
            <View >
              <View style={{maxWidth:'80%',flexWrap:'wrap',flexDirection:'row',marginTop:20,marginBottom:10,alignItems:'center',width:'100%',justifyContent:'space-between'}}>
            <View style={{flexWrap:'wrap',maxWidth:'60%'}}>
            <Text style={{marginLeft:20}}>{Object.keys(item)}</Text>
            </View>
            <View><Text>{Object.values(item)}</Text></View>   
          </View> 
          <View  style={{width:'100%',borderBottomWidth:0.5,marginTop:10}}/>
          </View>
        )
    }
    render(){
        return (
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',height:50,borderBottomWidth:1,width:'100%',alignItems:'center',backgroundColor:'#F0FFFF'}}>
                <Text style={{fontSize:18}}>Updated till {this.updated}</Text>
                   <View style={{width:40}}>
                    <TouchableWithoutFeedback  onPress={this.sort}>
                    <View>
                    <AntDesign  size={20} name="filter" />
                    <Text>
                        Sort 
                    </Text>
                </View>
                    </TouchableWithoutFeedback>
                    
               </View>
            </View>
            
            <SectionList
            sections = {this.state.data}
            renderItem={this.renderItems}  
            renderSectionHeader={this.renderSectionHeader}  
            />
           <View style={{height:30}} />
           
        </View>
        )
    }
}