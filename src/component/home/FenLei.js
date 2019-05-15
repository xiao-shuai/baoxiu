import React,{Component} from 'react'
import {
    View,Text,
    TouchableOpacity,
    Image,ScrollView,
    StyleSheet,
ActivityIndicator,
RefreshControl
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


@inject(["homeStore"])
@observer // 监听当前组件
class FenLei extends Component{
   constructor(props){
       super(props)
       this.state={
        show:true,  
        type:undefined,
        refreshing: false,
        data:[]
       }
       this.option=[
           {
            name:'冰箱维修',
            icon:'ios-arrow-forward',   
           },
           {
            name:'水管维修',
            icon:'ios-arrow-forward',   
           },
       ]
   }

   componentWillMount(){
       fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/fenlei').then(res=>res.json()).then(res=>{
         console.log('data--!!!!',res.data.info)
        this.setState({
            data:res.data.info,
            type:res.data.type,
            show:false
        })
       }

       ).catch(err=>{
           console.log('err--??',err)
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
       if(this.state.show){
           return(
               <View style={{height:sty.h*.8,justifyContent:'center'}}>
           <ActivityIndicator size={"large"} color={sty.themeColor}/>
               </View>
           )
       }
       return(
       <SafeAreaView style={{flex:1,alignItems:'center'}}>
        <ScrollView contentContainerStyle={{width:sty.w*.95}} refreshControl={
     <RefreshControl
     refreshing={this.state.refreshing}
     onRefresh={this._onRefresh}
   />
          }>
        {
            this.state.data.map((item,index)=>{
         return(
             <View key={index}>
             <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('ZhiJie',{info:this.state.type,name:item.name})
             }} style={{justifyContent:"space-between",padding:10,flexDirection:'row',marginTop:15}}>
              <Text style={{fontSize:18}}>{item.name}</Text>
              <Ionicons name={item.icon} size={25} color={sty.themehui}/>
             </TouchableOpacity>
             <Divider style={{width:'100%',height:1,marginTop:10,backgroundColor:sty.themehui}} />
             </View>
         )
            })

            }
        </ScrollView>
       </SafeAreaView>
       )
   }
}
export default  FenLei