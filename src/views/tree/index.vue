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
      <div class="title1">{{currItem}}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      filterText: '',
      currIndex:0,
      currItem:'',
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
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    tab(item,index){
       this.currIndex = index;
       this.currItem = item.title;
      //  axios.get('http://169.254.207.20:7002'+item.url).then(res=>{
      //    console.log(res)
      //  })
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
}
.app-container .nav li{
  border:solid 1px #ccc;
  padding: 4px 6px;
  font-size: 14px;
}
.app-container .nav li.active{
  border:solid 1px blue;
}
.app-container .title1{
  width: 100%;
  height:80px;
  line-height: 80px;
  font-size: 35px;
}
</style>