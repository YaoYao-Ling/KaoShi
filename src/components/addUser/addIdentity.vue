<template>
 <!-- 添加身份 -->
    <div class="wrap">
        <div class="btn-add">
          <el-button>添加身份</el-button>
        </div>
        <div class="inp-use">
          <input type="text" placeholder="请输入身份名称" v-model="type"/>
        </div>
        <div class="btn-button">
          <el-button class="qd" @click="addIdentityInfo(type)">确定</el-button>
          <el-button @click="clear">重置</el-button>
        </div>
    </div>
</template>

<script>
import { addIdentityType } from '@/api/table'
export default {
    data(){
      return {
        type:''
      }
    },
    methods:{
      // 重置
      clear(){
        this.type=''
      },
      async addIdentityInfo(type){
         let res = await addIdentityType(type)
         alert(res.msg)
      }
    }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 50px;
}
.wrap .btn-add {
  margin: 10px 10px;
}
.wrap .inp-use {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
    border:solid 1px #eee;
    font-size: 14px;
    padding-left: 20px;
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