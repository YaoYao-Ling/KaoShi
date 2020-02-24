import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form  } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'

type PageStateProps = {
  list:[]
}

type PageDispatchProps = {
  
}

type PageOwnProps = {}

type PageState = {}
  

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SignDetail {
  props: IProps;
}

    



@connect(state => {
    return {
        list: state.sign.list
    }
})

class SignDetail extends Component<{},PageState> {
  config: Config = {
    navigationBarTitleText: '详情页面'
  }

  componentWillMount(){
    console.log('options...', this.$router.params);
  }

  state={
    info: {
      company: '',
      address: '',
      latitude: '',
      longitude: ''
    }
  }

  componentDidShow () {
    let index = this.props.list.findIndex((item:any)=>item.id == this.$router.params.id);
    this.setState({
      info: this.props.list[index]
    })
  }

  componentDidHide () { }

  goMap = ()=>{
    let key = 'ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM';  //使用在腾讯位置服务申请的key
    let referer = '一面而就';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': this.state.info.company,
        'latitude': this.state.info.latitude,
        'longitude': this.state.info.longitude,
    });

    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  }

  render () {
    let {info} = this.state;
    console.log('info...',info);
    if(!info.company){
      return;
    }

    return (
        <View className='wrap'>
          <Text>{info.company}</Text>
          <Text onClick={this.goMap}>{info.address}</Text>
        </View>
    )
  }
}


export default SignDetail as ComponentClass;
