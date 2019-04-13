import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TextInput,AsyncStorage
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView,NavigationActions } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import {sty} from '../config/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
import Parse from 'parse/react-native'

class Login extends  Component{
    constructor(props){
        super(props)
        this.state={
         visable:false,
        }
    }

 login=()=>{
     console.log('zh?',this.state.zh,'mm',this.state.mm)
  
   if(this.state.zh==undefined){
       this.refs.toast.show('请输入账号',1500)
   } else if(this.state.mm==undefined){
    this.refs.toast.show('请输入密码',1500)
   }else {
    Parse.User.logIn(this.state.zh,this.state.mm).then(res=>{
        console.log('res--logookok!!',res)
        AsyncStorage.setItem('dl','ok')
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)

    }).catch(err=>{
        this.refs.toast.show('请输入正确的账号或密码',1500)
       console.log('logo err--!',err)
    })
   }


 } 
    
  render(){
      return(
          <SafeAreaView style={{flex:1,alignItems:'center'}}>
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
              <LinearGradient colors={['#ff7e5f','#feb47b']} 
              style={{width:sty.w,height:sty.h*.45,alignItems:'center'}}>
                <Text style={{fontSize:20,color:'white',marginTop:sty.h*.06,letterSpacing:2}}>便捷生活 快乐你我</Text>
                <Image source={require('../img/logobai.png')} style={{width:sty.w*.6,height:sty.w*.6}}/>
              </LinearGradient>
              <View style={{
                  width:sty.w*.9,
                height:sty.h*.3,
                backgroundColor:'white',
                shadowColor:'#feb47b',
                shadowOffset:{width:0,height:6},
                shadowOpacity:.8,
                shadowRadius:2,
                marginTop:-sty.h*.15,
                borderRadius:8,
                justifyContent:'center',
              
                }}>
                <View style={ys.input}>
                    <Ionicons name={'ios-person'} size={25} color={'#feb47b'}/>
                    <TextInput style={ys.textin} placeholder="请输入账号" 
                     onChangeText={(zh)=>{
                     this.setState({zh})
                    }}/>
                </View>
                <View style={ys.input}>
                    <Ionicons name={'ios-lock'} size={25} color={'#feb47b'}/>
                    <TextInput style={ys.textin}
                     placeholder="请输入密码" 
                    secureTextEntry={true} 
                    onChangeText={(mm)=>{
                    this.setState({mm})
                    }}
                    />
                </View>

                <TouchableOpacity onPress={()=>{
this.login()
                }}>
                <View style={[ys.input,{
                backgroundColor:sty.themeColor,
                alignItems:'center',
                justifyContent:'center',
                width:'90%',marginLeft:'5%',
                borderRadius:5
                }]}>
                    <Text style={{fontSize:18,letterSpacing:1,color:'white'}}>登录</Text>
                </View> 
                </TouchableOpacity>
                {/*  */}
                <TouchableOpacity onPress={()=>{
                //   this.setState({visable:true})
                this.props.navigation.navigate('Forgot')

                }}>
                 <Text style={{color:sty.themeColor,marginTop:10,marginLeft:'75%'}}>忘记密码?</Text>
                 </TouchableOpacity>

              </View>
          </ScrollView>
          <Toast

ref="toast"

position='top'

opacity={0.8}

/>
          </SafeAreaView>
      )
  }

}
const ys=StyleSheet.create({
    textin:{
        height:'100%',width:'80%',fontSize:18,marginLeft:10
    },
    input:{
        width:'100%',
        height:sty.h*.06,
        // backgroundColor:'gold',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginTop:10,
        borderBottomColor:sty.themehui,
        borderBottomWidth:1
    },
})
export default Login