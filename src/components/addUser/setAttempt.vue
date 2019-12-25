<template>
<!-- 给身份设置试图权限 -->
    <div class="wrap">
        <div class="btn-add">
          <el-button>给身份设置试图权限</el-button>
        </div>
        <div class="ipt-select">
          <el-select v-model="value" placeholder="请选择身份id" @change="changer">
            <el-option
              v-for="(item,index) in UserList"
              :key="index"
              :label="item.identity_text"
              :value="item"
            
            ></el-option>
          </el-select>
        </div>
        <div class="ipt-select">
          <el-select v-model="curIn" placeholder="请选择视图权限id" @change="changer1">
            <el-option
              v-for="(val,index1) in data"
              :key="index1"
              :label="val.view_authority_text"
              :value="val"
            
            ></el-option>
          </el-select>
        </div>
        <div class="btn-button">
          <el-button class="qd" @click="btn(item,val)">确定</el-button>
          <el-button>重置</el-button>
        </div>
    </div>
</template>

<script>
import { setPrivilegesType } from '@/api/table'
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
        UserList: state => state.attempt.UserList,
        data: state => state.attempt.data
      })
    },
    methods:{
      changer(item){
        this.item = item
         this.value = item.identity_text
      },
      changer1(val){
        this.val = val
         this.curIn = val.view_authority_text
      },
      async btn(item,val){
         let res = await setPrivilegesType(item,val)
         alert(res.msg)
      },
      ...mapActions({
        getUserBean:"attempt/getUserBean",
        changeSetting: "attempt/changeSetting"
      })
    },
    mounted(){
        this.getUserBean(),
        this.changeSetting()
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