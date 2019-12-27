<template>
<!-- 给身份设置api接口权限 -->
    <div class="wrap">
        <div class="btn-add">
          <el-button>给身份设置api接口权限</el-button>
        </div>
        <div class="ipt-select">
          <el-select v-model="value" placeholder="请选择身份id" @change="changer">
            <el-option
              v-for="(item,index) in data"
              :key="index"
              :label="item.identity_text"
              :value="item"
            
            ></el-option>
          </el-select>
        </div>
        <div class="ipt-select">
          <el-select v-model="curIn" placeholder="请选择api接口权限id" @change="changer1">
            <el-option
              v-for="(val,index1) in apiList"
              :key="index1"
              :label="val.api_authority_text"
              :value="val"
            
            ></el-option>
          </el-select>
        </div>
        <div class="btn-button">
          <el-button class="qd" @click="btn(item,val)">确定</el-button>
          <el-button @click="clear">重置</el-button>
        </div>
    </div>
</template>

<script>
import { setApiType } from '@/api/table'
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    data(){
      return {
        value:'',
        curIn:'',
        item:{},
        val:{}
      }
    },
    computed:{
      ...mapState({
        data: state => state.attempt.UserList,
        apiList: state => state.attempt.apiList
      })
    },
    methods:{
      changer(item){
        this.item = item
         this.value = item.identity_text
      },
      changer1(val){
        this.val = val
         this.curIn = val.api_authority_text
      },
      clear(){
        this.value="",
        this.curIn=""
      },
      async btn(item,val){
         let res = await setApiType(item,val)
         console.log(res)
         alert(res.msg)
      },
      ...mapActions({
        getUserBean:"attempt/getUserBean",
        getApiList:"attempt/getApiList"
      })
    },
    mounted(){
        this.getUserBean(),
        this.getApiList()
    }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}
.wrap .btn-add {
  margin: 10px 10px;
}

.wrap .inp-use {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
  }
}
.wrap .inp-pwd {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
  }
}
.wrap .ipt-select {
  width: 100%;
  height: 40px;
  margin: 20px 10px;
  color: #eee;
  el-dropdown {
    line-height: 40px;
    border: solid 1px #ccc;
    background: #fff;
  }
}
.wrap .btn-button {
  margin: 20px 10px;
  .qd {
    width: 100px;
    color:white;
    background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>