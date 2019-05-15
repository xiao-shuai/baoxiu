import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,AsyncStorage,Platform
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Forgot extends  Component{
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
     }else if (this.state.mm==undefined){
        this.refs.toast.show('请输入密码',1500)
     }else if (this.state.email==undefined){
        this.refs.toast.show('请输入邮箱',1500)
     }else{
      fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/order',{
         method:'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
     }).then(res=>{
    //    console.log('res?',res)
      this.refs.toast.show('提交成功,我们将在1-3个工作日联系你',1500)
     }
     ).catch(err=>{
       console.log('err?',err)
     }
     )
     }
   
 } 
 
  render(){
      return(
          <SafeAreaView style={{flex:1,alignItems:'center'}}>
          <KeyboardAwareScrollView
            
              >
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
              <LinearGradient colors={['#ff7e5f','#feb47b']} 
              style={{width:sty.w,height:sty.h*.45,alignItems:'center'}}>
                <Text style={{fontSize:20,color:'white',marginTop:sty.h*.06,letterSpacing:2}}>便捷生活 快乐你我</Text>
                {
                    Platform.OS=='ios'?
                    <Image source={require('../img/logobai.png')} style={{width:sty.w*.6,height:sty.w*.6}}/>
                    :
                    <Image source={require('../img/azlogo.png')} style={{width:sty.w*.6,height:sty.w*.6}}/>

                }

              </LinearGradient>
              {/* <KeyboardAvoidingView  
              behavior="padding"
             keyboardVerticalOffset={250}
      > */}
              <View style={{
                width:sty.w*.9,
                // height:sty.h*.3,
                backgroundColor:'white',
                shadowColor:'#feb47b',
                shadowOffset:{width:0,height:6},
                shadowOpacity:.8,
                shadowRadius:2,
                marginTop:-sty.h*.15,
                borderRadius:8,
                justifyContent:'center',
                borderWidth:1,
                borderColor:'#feb47b'
                }}>
                <View style={ys.input}>
                    <View style={{width:'8%'}}>
                    <Ionicons name={'ios-person'} size={23} color={'#feb47b'}/>
                    </View>
                    <TextInput style={ys.textin} placeholder="请输入账号" 
                     onChangeText={(zh)=>{
                     this.setState({zh})
                    }}/>
                </View>
                <View style={ys.input}>
                <View style={{width:'8%'}}>
                    <Ionicons name={'ios-call'} size={23} color={'#feb47b'}/>
                </View>
                    <TextInput style={ys.textin}
                     placeholder="请输入电话" 
                    // secureTextEntry={true} 
                    onChangeText={(mm)=>{
                    this.setState({mm}) 
                    }}
                    />
                </View>
                <View style={ys.input}>
                <View style={{width:'8%'}}>
                    <Ionicons name={'ios-mail'} size={25} color={'#feb47b'}/>
                  </View>
                    <TextInput style={ys.textin}
                     placeholder="请输入邮箱" 
                     
                    // secureTextEntry={true} 
                    onChangeText={(email)=>{
                    this.setState({email})
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
                borderRadius:5,
                marginBottom:10
                }]}>
                    <Text style={{fontSize:18,letterSpacing:1,color:'white'}}>确认</Text>
                </View> 
                </TouchableOpacity>
                

              </View>
              {/* </KeyboardAvoidingView> */}
          </ScrollView>
          </KeyboardAwareScrollView>
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
        width:'90%',
         height:sty.h*.06,
         padding:5,
         marginLeft:10,
        //  backgroundColor:'red'
    },
    input:{
        width:'100%',
        // height:sty.h*.06,
        padding:5,
        // backgroundColor:'gold',
        flexDirection:'row',
        alignItems:'center',
        // padding:10,
        marginTop:10,
        borderBottomColor:sty.themehui,
        borderBottomWidth:1
    },
})
export default Forgot