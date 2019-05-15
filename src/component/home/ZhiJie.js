import React,{Component} from 'react'
import {
    View,Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    
  } from 'react-native'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider } from 'react-native-elements'
import {inject,observer} from 'mobx-react'
import {sty} from '../../config/styles'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-picker'
import DatePicker from 'react-native-datepicker'
import Toast, {DURATION} from 'react-native-easy-toast'
import Parse from 'parse/react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject(["homeStore"])
@observer // 监听当前组件
class ZhiJie extends Component{
  static navigationOptions = {
    // title: 'Home',
    headerBackTitle:null,
  };
   constructor(props){
       super(props)
       this.state={
        isloading:true,
        iscover:false,
        date:"",
        order:[]
       }

       this.option={

        title: '选择图片',
        
        cancelButtonTitle: '取消',
        
        takePhotoButtonTitle:'拍照',
        
        chooseFromLibraryButtonTitle:'图库',
        
        allowsEditing:true,
        
        quality: 0.8,
        
        noData: false,
        
        storageOptions: {
        
        skipBackup: true,
        
        path: 'images'
        
        }
        
        }
   }
   getdate=()=>{
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth()+1).toString();
    const day = date.getDate().toString();
    const final=year+'-'+month+'-'+day
    this.setState({date:final,showdate:final})
   }
  getdata=()=>{
    fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/fenlei')
    .then(res=>{res.json()})
    .then(res=>{
      this.setState({isloading:false})
    })
    .catch(err=>{
      console.log('rrr',err)
    })
  } 
componentWillMount(){
  this.getdate()
  this.getdata()
}
choosePicker = () => {
  ImagePicker.showImagePicker(this.option, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      console.log('source--!!')
      let source = response.uri;
      // this.props.oneStore.change_tx(source)
      this.setState({
        iscover: true,
        bximg:source,
      })
    }
  });
}
choosePicker2 = () => {
  ImagePicker.showImagePicker(this.option, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      console.log('source--!!')
      let source = response.uri;
      // this.props.oneStore.change_tx(source)
      this.setState({
        iscover2: true,
        bximg2:source,
      })
    }
  });
}

submit=()=>{
  const name=this.props.navigation.getParam('name')
  const random = Math.floor(Math.random() * 999999999999999)
  console.log(
    '类型',name,
    'dz',this.state.dz,
    'time',this.state.date,
     'bxinfo',this.state.bxinfo,
     'xm',this.state.xm,
     'phone',this.state.phone,
     'money',this.state.money,
  )
  let data={
      'status':0,
      'lx':name,
      'dz':this.state.dz,
      'time':this.state.date,
      'bxinfo':this.state.bxinfo,
      'xm':this.state.xm,
      'phone':this.state.phone,
      'money':this.state.money,
      'ddh':random
  }
 
  if(this.state.dz==undefined||this.state.bxinfo==undefined||this.state.xm==undefined||this.state.phone==undefined||this.state.money==undefined){
      this.refs.toast.show('请输入完整信息',1500)
  }else{
      if(this.state.phone.length!==11){
        this.refs.toast.show('请输入正确的手机号码',1500)
      }else{
         fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/order',{
           method:'POST',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
         }).then(res=>{
          this.props.homeStore.updateorder(data)
          this.props.navigation.navigate('MyOrder')
         this.refs.toast.show('预约成功',1500)
         }).catch(err=>{
             console.log('err??',err)
         })
         
      }
  }

}
   render(){
    if(this.state.isloading){
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
    console.log(
    'order---!',this.props.homeStore.order,)
     const type=this.props.navigation.getParam('info')
     const name=this.props.navigation.getParam('name')
     console.log('type--!',type)
       return(
       <SafeAreaView style={{flex:1,alignItems:'center'}}>
       <KeyboardAwareScrollView>
        <ScrollView style={{width:sty.w*.95,}} showsVerticalScrollIndicator={false}>
{/* city */}
      <View>
        <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:18,}}>维修类型 :</Text>
            <Text style={{fontSize:16,marginLeft:10}}>{name}</Text>
        </View>
        {/* <Ionicons name={'ios-arrow-forward'} size={25} color={sty.themehui2}/> */}
        </View>
        <Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/> 
    </View>
        {/* city */}
        <TouchableOpacity onPress={()=>{
         this.refs.toast.show('目前仅支持北京市',1000)
        }}>
        <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        
        <View style={{flexDirection:'row'}} >
            <Text style={{fontSize:18,}}>所在城市 :</Text>
            <Text style={{fontSize:16,marginLeft:10}}>北京市</Text>
        </View>

        <Ionicons name={'ios-arrow-forward'} size={23} color={sty.themehui2}/>
        </View> 
         </TouchableOpacity>
        <Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/>
        {/* 地址 */}
        <View style={styles.line}>
            <Text style={{fontSize:18,}}>上门地址 :</Text>
            {/* <Text style={{fontSize:18,marginLeft:10}}>北京市</Text> */}
            <TextInput style={styles.input} placeholder="请输入详细地址" 
            multiline={true} 

            onChangeText={(dz)=>{
            this.setState({dz})
            }}/>
        </View>
        <Divider style={{backgroundColor:sty.themehui,height:1}}/>
        <Text style={{textAlign:'center',marginTop:5,color:sty.themehui2}}>(目前仅支持北京市,后续开放其他城市)</Text>
         {/* time */}
         <View style={{marginTop:15,flexDirection:'row',alignItems:'center'}}>
        
            <Text style={{fontSize:18,}}>预约时间 :</Text>
            <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= {this.state.showdate}
        maxDate="2020-06-01"
        confirmBtnText="确定"
        cancelBtnText="取消"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

        </View>
        <Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/>
        {/* input */}
        <View style={{padding:10,backgroundColor:'#F0F8FF',marginTop:10,borderRadius:8}}>
         <TextInput multiline={true} style={{height:sty.h*.25,fontSize:16}} 
         placeholder={'请输如需要保修的信息'}  onChangeText={(bxinfo)=>{
          this.setState({bxinfo})
         }}/>
        </View>
        <Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/>
        {/* image */}
        <Text style={{marginTop:10,fontSize:18,}}>上传图片</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={()=>{
         this.choosePicker()
        }} style={styles.touimg}>
{
  this.state.iscover?
  <Image source={{uri:this.state.bximg}} style={{width:'100%',height:'100%'}}/>
  :
  <View style={styles.v_jia}>
  <Text style={styles.v_text}>+</Text>
  </View>
}
        </TouchableOpacity>
         
        <TouchableOpacity onPress={()=>{
  this.choosePicker2()
}} style={styles.touimg}>
{
this.state.iscover2?
<Image source={{uri:this.state.bximg2}} style={{width:'100%',height:'100%'}}/>
:
<View style={styles.v_jia}>
  <Text style={styles.v_text}>+</Text>
  </View>
}
</TouchableOpacity>
</View>
<Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/>
{/*  */}
 <View style={styles.line}>
            <Text style={{fontSize:18,}}>姓            名 :</Text>
            <TextInput style={[styles.input,{width:sty.w*.6}]} 
             multiline={true}
             placeholder={'请输入姓名'} 
            onChangeText={(xm)=>{
            this.setState({xm})
            }}/>
   </View>
   <Divider style={{backgroundColor:sty.themehui,height:1}}/>
   {/*  */}
   <View style={styles.line}>
            <Text style={{fontSize:18,}}>联 系 电 话 :</Text>
            <TextInput style={[styles.input,{width:sty.w*.6}]} 
            // multiline={true} 
            placeholder={'请输入联系信息'}
            onChangeText={(phone)=>{
                this.setState({phone})
            }}
            />
           
   </View>
    {/*  */}
    <Divider style={{backgroundColor:sty.themehui,height:1}}/>
    <View style={styles.line}>
            <Text style={{fontSize:18,}}>愿 付 酬 劳  :</Text>
            <TextInput style={[styles.input,{width:sty.w*.6,}]}
            //  multiline={true} 
             placeholder={'请输入酬劳'}
             onChangeText={(money)=>{
               this.setState({money})
             }}
             />
           
   </View>
   {/*  */}
   <Divider style={{backgroundColor:sty.themehui,height:1}}/>
   <TouchableOpacity onPress={()=>{
this.refs.toast.show('目前仅支持线下支付',1000);
   }}>
    <View style={{flexDirection:'row',marginTop:10}}>
            <Text style={{fontSize:18,}}>支 付 方 式  :</Text>
            <Text style={[styles.input,{width:sty.w*.6}]} >线 下 支 付</Text>
            <Ionicons name={'ios-arrow-forward'} size={25} color={sty.themehui2}/>
   </View>
   </TouchableOpacity>
   {/* 提交 btn */}
   <Divider style={{backgroundColor:sty.themehui,height:1,marginTop:10}}/>
   <TouchableOpacity onPress={()=>{
      this.submit()
   }} style={styles.tj_btn}>
      <Text style={{fontSize:20,color:'white',fontWeight:'600'}}>提 交</Text>
   </TouchableOpacity>
        </ScrollView>
       
        </KeyboardAwareScrollView> 
        <Toast ref="toast" position='top' opacity={0.7} />
       </SafeAreaView>
       )
   }
}
const styles = StyleSheet.create({
  line:{
    flexDirection:'row',height:sty.h*.06,alignItems:'center'
  },
  tj_btn:{
    width:'100%',height:sty.h*.06,
    backgroundColor:sty.themeColor,
    marginTop:10,borderRadius:10,
    marginBottom:10,alignItems:'center',
    justifyContent:'center'
  },
  input:{fontSize:16,marginLeft:10,width:'70%'},
  v_text:{
    fontSize:sty.w*.25,color:sty.themehui,fontWeight:'300'
  },
  v_jia:{
    alignItems:'center',justifyContent:'center',width:'100%',height:'100%'
  },
  touimg:{
    width:sty.w*.45,height:sty.w*.45,backgroundColor:'#F0F8FF'
  },
    textStyle:{
      fontSize:18,
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    content:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-around'
    }
   
  })
  
export default  ZhiJie