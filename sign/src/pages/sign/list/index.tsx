import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Form  } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import {getSignListAction} from '../../../actions/sign'


type PageStateProps = {
  list:Array<{
      [key:string]:any
  }>
}

type PageDispatchProps = {
  getSignList: (params) => void
}

type PageOwnProps = {}

type PageState = {
  status: number,
  page: number,
  pageSize: number
}

type Iprops = PageStateProps & PageDispatchProps & PageOwnProps

interface SignList {
  props: Iprops;
}


@connect(state => {
    return {
        list: state.sign.list
    }
}, dispatch => {
    return {
        getSignList: (params) => {
            dispatch(getSignListAction(params))
        }
    }
})

class SignList extends Component<{},PageState> {
  config: Config = {
    navigationBarTitleText: '面试列表'
  }

  state={
    status: 2,
    page: 1,
    pageSize: 10,
    topTab:[
      {
        tab:'未开始',
        id:1
      },
      {
        tab:'已打卡',
        id:1
      },
      {
        tab:'已放弃',
        id:1
      },
      {
        tab:'全部',
        id:1
      }
    ]
  }

  componentDidShow () {
    let params = {...this.state};
    console.log("signlist...",params);
    if(params.status === 2){
        delete params.status;
    }
    this.props.getSignList(params);
  }

  componentDidHide () { }


  render () {
    return (
        <View className='wrap'>
          <View className='top'>
            {
              this.state.topTab.map((item:any,index:any)=>{
                  return <Text key={index}>{item.tab}</Text>
              })
            }
          </View>
        </View>
    )
  }
}


export default SignList as ComponentClass;
