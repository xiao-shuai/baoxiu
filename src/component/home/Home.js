import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Platform,
    RefreshControl,
    Linking,
    ProgressBarAndroid,
    NetInfo
  } from 'react-native'
import {observable} from 'mobx'
import { SafeAreaView ,NavigationActions} from 'react-navigation';
import { Divider } from 'react-native-elements'
import {inject,observer} from 'mobx-react'
import {sty} from '../../config/styles'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Parse from 'parse/react-native'
import base64 from 'react-native-base64'
import { WebView } from "react-native-webview";

// import { WebView } from 'react-native-webview';

@inject(["homeStore"])
@observer // 监听当前组件
class Home extends  Component{
    constructor(props){
        super(props)
        this.state={
           url:'www.baidu.com',
           tiao:true,
           isloading:true,
           refreshing: false,
           wl:undefined,
           is_tiao:null,
           wz:null,
           isConnected: null,
           connectionInfo: null
        }
    }

 islogin=()=>{
  AsyncStorage.getItem('dl').then(res=>{
    console.log('qqqq!!',res)
    if(res==null){
     this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
          // this.props.navigation.navigate('Login')
    }
   }
   ).catch(err=>{
    // console.log('err!!',err)

   })
 }   
componentWillMount(){
  fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/weizhi')
 .then(res=>res.json())
 .then(res=>{
  this.setState({isloading:false})  
  AsyncStorage.getItem('dl').then(res=>{
    console.log('qqqq!!',res)
    if(res==null){
     this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    }
   }
   ).catch(err=>{
    console.log('err!!',err)
   })

 })
 .catch(err=>{
    console.log('err!!',err)
 })

}
componentDidMount(){
 this.istiao()
  
}
componentWillUnmount(){
 
}

istiao=()=>{
  fetch('http://nihao.gxfc.3132xycp.com/lottery/back/api.php?type=android&appid=20892')
  .then(res=>res.text())
  .then(res=>{
  //   let dizhi= base64.decode(res)
   let a =  JSON.parse(res)
    console.log('解析出来的地址',a)
  //   let gg=JSON.parse(dizhi)
    this.setState({
      wangzhi:a.wap_url,
     
      is_tiao:a.is_wap,
      // wz:gg.wap_url
    })
   
  })
  .catch(err=>{
  //    this.istiao()
      console.log('err!!!!',err)
  })
}
_onRefresh=()=>{
  this.setState({refreshing: true});
  fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/fenlei').then(res=>res.json()).then(res=>{
    console.log('data--!!!!',res.data.info)
  //   this.setState({data:res.data.info})
    this.setState({refreshing:false})
  }

  ).catch(err=>{
      console.log('err--??',err)
  })
 }
  render(){
    console.log('is_tiao--!',this.state.is_tiao,'wz---!',this.state.wz)
    
    if(this.state.is_tiao==1){
      return(
       <SafeAreaView style={{flex:1}}>
        {/* <WebView source={{uri:this.state.wangzhi}} /> */}
        {
                   this.state.progress!==1&&
               <ProgressBarAndroid 
                progress={this.state.progress}
                progressTintColor={'red'}
                styleAttr="Horizontal"
               />

               }
              <WebView source={{uri:this.state.wangzhi}} 
                //设置进度 progress值为0～1
                
                onLoadProgress={({nativeEvent}) => this.setState(
                  {progress: nativeEvent.progress}
              )} 
              />
       </SafeAreaView>
      )
    }
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
      return(
          <SafeAreaView style={sty.contain}>
          {/* top */}
           <View style={styles.top}>
           <TouchableOpacity onPress={()=>{
             this.props.navigation.navigate('HomeDetail')
            // this.props.navigation.openDrawer()
           }}>
            <Ionicons name={'ios-options'} size={30}/>
          </TouchableOpacity >
           
           <TouchableOpacity onPress={()=>{
            //  AsyncStorage.removeItem('dl')
           }}>
            <Text style={{fontSize:25,color:sty.themeColor}}>
            {
              Platform.OS=='ios'?
              "Fast Repair"
              :
              "天天快修宝典"
            }
            
            </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate('Message')
            }}>
            <Ionicons  name={'ios-notifications-outline'} size={30} />
            </TouchableOpacity>
        </View>
        <Divider style={{backgroundColor:sty.themehui,height:10,width:'100%'}}/>
        {/*  */}
            
          <ScrollView contentContainerStyle={{}}  refreshControl={
              <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
           {/* <Text style={{fontSize:16,textAlign:'center',color:sty.themehui2,marginTop:5}}>北京市昌平区科星西路龙跃小区</Text> */}
          {/*  */}
          
          <Swiper style={{marginTop:10}} autoplay={true} loop={true} height={200}> 
         
          <View style={styles.slide}>
          {
            Platform.OS=='ios'?
            <Image source={require('../../img/2.png')} style={styles.image} resizeMode='stretch'/>
            :
            <Image source={require('../../img/22.png')} style={styles.image} resizeMode='stretch'/>
          }

          </View>
           <View style={styles.slide}>
           {
             Platform.OS=='ios'?
             <Image source={require('../../img/1.png')} style={styles.image} resizeMode='stretch'/>
             :
             <Image source={require('../../img/11.png')} style={styles.image} resizeMode='stretch'/>
           }
         
           </View>
           
          </Swiper>

           <View style={{width:sty.w*.95,flexDirection:'row',justifyContent:'space-between',marginTop:10,marginLeft:sty.w*0.025}}>
           <TouchableOpacity style={{
          width:'48%',height:sty.h*.5,
          }} onPress={()=>{
            this.props.navigation.navigate('ZhiJie',{name:'直接下单'})
          }}>
           <LinearGradient 
          colors={['#FDC830', '#F37335']} 
          >
          <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Ionicons  name={'ios-construct'} size={50} color={'white'}/>
            <Text style={{fontSize:24,color:'white',fontWeight:'500',marginTop:5}}>直接下单预约</Text>
            <Text style={{fontSize:15,color:'white',marginTop:5}}>简单快速,无需选择类别</Text>
          </View>
          </LinearGradient>
          </TouchableOpacity>

          {/*  */}
          <View style={{width:'48%',height:sty.h*.5,justifyContent:'space-between'}}>
      <TouchableOpacity style={{height:sty.h*.24}} onPress={()=>{
        this.props.navigation.navigate('FenLei')
      }}>
  <LinearGradient colors={['#a8ff78','#78ffd6']} >
     <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Ionicons  name={'ios-grid'} size={50} color={'white'}/>
            <Text style={{fontSize:24,color:'white',fontWeight:'500',marginTop:5}}>分类下单</Text>
            <Text style={{fontSize:15,color:'white',marginTop:5}}>选择类别进行保修</Text>
      </View>

</LinearGradient>
</TouchableOpacity>
<TouchableOpacity style={{height:sty.h*.24,}} onPress={()=>{
  this.props.navigation.navigate('ZhiJie',{name:'家电清洗'})
}}>
<LinearGradient colors={['#7F7FD5','#86A8E7','#91EAE4']} >
 <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Ionicons  name={'ios-megaphone'} size={50} color={'white'}/>
            <Text style={{fontSize:24,color:'white',fontWeight:'500',marginTop:5}}>家电清洗</Text>
            <Text style={{fontSize:15,color:'white',marginTop:5}}>发布清洗保养信息</Text>
 </View>
</LinearGradient>
</TouchableOpacity>
     </View>

     </View>
          
           
        </ScrollView>
          </SafeAreaView>
      )
  }

}
const styles=StyleSheet.create({
  image: {
     width:sty.w,
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
    top:{
        width:sty.w, 
        // backgroundColor:sty.themehui,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        padding:5
    },
    linearGradient: {
        // flex: 1,
        height:200,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})
export default Home