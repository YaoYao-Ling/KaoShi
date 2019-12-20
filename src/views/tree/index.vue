<template>
  <div class="app-container">
      <div class="title">用户展示</div>
      <ul class="nav">
        <li 
            v-for="(item,index) in data" 
            :key="index"
            :class="{active:currIndex == index }"
            @click="tab(item,index)"
        >
            {{item.title}}
        </li>
      </ul>
      <!-- 用户展示列表 -->
      <UserList v-if="userList.length == 9" :currItem="currItem" :list="userList"></UserList>
      <!-- 身份数据 -->
      <IdenTity v-else-if="userList.length == 3" :currItem="currItem" :list="userList"></IdenTity>
      <!-- api接口权限 -->
      <ApiVar v-else-if="userList.length == 34" :currItem="currItem" :list="userList"></ApiVar>
      <!-- 身份和api接口关系 -->
      <BetWeen v-else-if="userList.length == 58" :currItem="currItem" :list="userList"></BetWeen>
      <!-- 视图接口权限 -->
      <Viewport v-else-if="userList.length == 20" :currItem="currItem" :list="userList"></Viewport>
      <!-- 身份和试图权限关系 -->
      <Expand v-else :currItem="currItem" :list="userList"></Expand>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import UserList from '../../components/User/userList'
import IdenTity from '../../components/User/idenTity'
import ApiVar from '../../components/User/apiVar'
import BetWeen from '../../components/User/betWeen'
import Viewport from '../../components/User/viewport'
import Expand from '../../components/User/expand'
export default {

  data() {
    return {
      filterText: '',
      currIndex:0,
      currItem:'用户数据',
      data: [
        {title:'用户数据',url:'/user/user'},
        {title:'身份数据',url:'/user/identity'},
        {title:'api接口权限',url:'/user/api_authority'},
        {title:'身份和api接口关系',url:'/user/identity_api_authority_relation'},
        {title:'视图接口权限',url:'/user/view_authority'},
        {title:'身份和试图权限关系',url:'/user/identity_view_authority_relation'}
        ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userList:[]
    }
  },
  components:{
      UserList,
      IdenTity,
      ApiVar,
      BetWeen,
      Viewport,
      Expand
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  computed:{
      ...mapState({
        token:store => store.user.token
      })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    tab(item,index){
        this.currIndex = index;
        this.currItem = item.title;
        axios.get('http://169.254.207.20:7002'+item.url,{headers:{authorization:this.token}}).then(res=>{
          console.log(res.data.data)
          this.userList = res.data.data
        })
    }
  },
  mounted(){
     
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  width: 100%;
  height:100%;
}
.app-container .title{
  width: 100%;
  height:80px;
  line-height: 80px;
  font-size: 25px;
}
.app-container .nav{
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.app-container .nav li{
  border:solid 1px #ccc;
  padding: 4px 6px;
  font-size: 14px;
}
.app-container .nav li.active{
  border:solid 1px blue;
  color:blue;
}
.app-container .title1{
  width: 100%;
  height:80px;
  line-height: 80px;
  font-size: 35px;
}
</style>