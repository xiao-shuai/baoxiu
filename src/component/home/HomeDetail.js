import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    Linking,Platform
} from 'react-native'

import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider ,ListItem} from 'react-native-elements'
import {inject,observer} from 'mobx-react'
import {sty} from '../../config/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
class HomeDetail  extends Component{
   
    constructor(props){
        super(props)
        this.state={

        }
        this.option=[
            {
                name:'我的订单',
                icon:'ios-list-box',
                xia:'MyOrder',
            },
            {
                name:'意见反馈',
                icon:'ios-chatboxes',
                xia:'FeedBack',
            },
            {
                name:'联系我们',
                icon:'ios-call',
                xia:'Contact',
            },

        ]
        
    }
    componentWillMount(){
        fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/fenlei')
        .then(res=>res.json())
        .then(res=>{
            console.log('res---?',res)
        })
        .catch(err=>{
            console.log('err--?',err)
        })
    }
    render(){
        return(
       <SafeAreaView style={sty.contain}>
         <ScrollView contentContainerStyle={{width:sty.w,alignItems:'center'}}>
           {/* <LinearGradient colors={['#F2994A','#F2C94C']}> */}
            <View style={{width:'100%',height:sty.h*.25,alignItems:'center',justifyContent:'center'}}>
            {
        Platform.OS=='ios'?
        <Image source={require('../../img/logobai.png')} style={{width:sty.w*.5,height:sty.w*.5}} />
        :
        <Image source={require('../../img/azlogo.png')} style={{width:sty.w*.5,height:sty.w*.5}} />
            }

            </View>
           
           {/* </LinearGradient> */}
           {/*  */}
         <Divider style={{width:sty.w,height:20,backgroundColor:'#E6E6FA'}} />  
         <View style={{width:'100%',alignItems:'center'}}>
         {
             this.option.map((item,index)=>{
                 return(
                     
          <TouchableOpacity style={{
          width:'100%',
          marginTop:10,
          justifyContent:'center',
          padding:10,
          borderBottomWidth:index==0?20:1,
          borderBottomColor:'#E6E6FA',
          flexDirection:'row',
          justifyContent:'space-between'
          }}  onPress={()=>{
              if(index==2){
                let url = "tel: (021)5033 4587";//调用拨号
                Linking.canOpenURL(url).then(supported => {
                  if (supported) {
                      Linking.openURL(url);
                  }
                });
              }else {
            this.props.navigation.navigate(item.xia)
              }
          }}>

         <View style={{flexDirection:'row',alignItems:'center',}}>
             <Ionicons name={item.icon} size={30} color={sty.themeColor}/>
             <Text style={{marginLeft:10,fontSize:18}}>{item.name}</Text>
             
         </View>
         <Ionicons name={'ios-arrow-forward'} size={25} style={{color:sty.themehui}}/>
          </TouchableOpacity>
                 )
             })
         }
         </View>
          
         </ScrollView>
      </SafeAreaView>
        )
    }
    
}
export default HomeDetail