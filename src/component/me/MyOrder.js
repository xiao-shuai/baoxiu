import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator,Linking} from 'react-native'

import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider ,ListItem} from 'react-native-elements'
import {inject,observer} from 'mobx-react'
import {sty} from '../../config/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
@inject(["homeStore"])
@observer // 监听当前组件
class MyOrder extends Component {

    constructor(props){
        super(props)
        this.state={
          order:[],
          show:true
        }
        
    }

 componentWillMount(){
   fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/dingdan')
   .then(res=>res.json())
   .then(res=>{
     this.setState({show:false})
   })
   .catch(err=>{

   })
 }   
    render(){
       
        if(this.state.show){
            return (
              <View style={{
                width:sty.w,height:sty.h*.8,
              alignItems:'center',
              justifyContent:'center',
              }}>
                <ActivityIndicator size={"large"} color={sty.themeColor}/>
              </View>
            )
          }
        const data=this.props.homeStore.order

        console.log('data--!',data)
        return(
            <SafeAreaView style={sty.contain}>
                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
{

    data.map((item,index)=>{
         return(
            <TouchableScale activeScale={0.7} onPress={()=>{
                console.log('555')
              }} key={index}>
              <LinearGradient style={{padding:10,width:sty.w*.95,marginTop:10,borderRadius:8}}
               colors={['#ffb347','#ffcc33']}
              >   
              
                  <View style={styles.line}>
                      <Text style={styles.text}>{item.lx} </Text>
                      {
                       item.status==0?   
                       <Text style={[styles.text,{color:'#32CD32'}]} >预约中</Text>
                       :
                       <Text style={styles.text} >已完成</Text>
                      }
                    
                  </View>

                  <View style={styles.line}>
              <Text style={styles.text}>预留手机号 :</Text>
              <Text style={styles.text}>{item.phone}</Text>
                  </View>
                  <View style={styles.line}>
              <Text style={styles.text}>预约时间 :</Text>
              <Text style={styles.text}>{item.time}</Text>
                  </View>
                  <View style={styles.line}>
              <Text style={styles.text}>订单号 :</Text>
              <Text style={styles.text}>{item.ddh}</Text>
                  </View>
              
              </LinearGradient>
              </TouchableScale>
         )
    })
}

                </ScrollView>
            </SafeAreaView>
            
        )
    }

}

const styles=StyleSheet.create({
    text:{
        fontSize:18,color:'white'
    },
    line:{
        flexDirection:'row',
        // backgroundColor:'red',
        justifyContent:'space-between',
         padding:10,
         borderBottomColor:'white',
        //  borderWidth:1
        borderBottomWidth:1
    }
})
export default MyOrder