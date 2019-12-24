<template>
  <!-- 添加用户 -->
  <div class="wrap">
    <div class="btn-add">
      <el-button @click="tabAddUser">添加用户</el-button>
      <el-button @click="tabUpdataUser">更新用户</el-button>
    </div>
    <div v-if="this.currIndex == 0">
      <div class="inp-use">
        <input type="text" placeholder="请输入用户名" v-model="userList.userName" />
      </div>
      <div class="inp-pwd">
        <input type="text" placeholder="请输入密码" v-model="userList.userPwd" />
      </div>
      <div class="ipt-select">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userList.valueId}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="管理员">管理员</el-dropdown-item>
            <el-dropdown-item command="出题者">出题者</el-dropdown-item>
            <el-dropdown-item command="浏览者">浏览者</el-dropdown-item>
            <el-dropdown-item command="学生">学生</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="btn-button">
        <el-button class="qd" @click="addUserInfo(userList)">确定</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <div v-if="this.currIndex == 1">
      <div class="ipt-select">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userList.valueId}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.user_name" v-for="(item,index) in IdentityName" :key="index">{{item.user_name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="inp-use">
        <input type="text" placeholder="请输入用户名" v-model="userList.userName" />
      </div>
      <div class="inp-pwd">
        <input type="text" placeholder="请输入密码" v-model="userList.userPwd" />
      </div>
      <div class="ipt-select">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userList.valueId}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="管理员">管理员</el-dropdown-item>
            <el-dropdown-item command="出题者">出题者</el-dropdown-item>
            <el-dropdown-item command="浏览者">浏览者</el-dropdown-item>
            <el-dropdown-item command="学生">学生</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="btn-button">
        <el-button class="qd">确定</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { addList, addIdentity } from '@/api/table'
export default {
  data() {
    return {
      currIndex: 0,
       userList: {
        userName: "", //用户名
        userPwd: "", //密码
        valueId: "请选择身份id", //身份Id
      },
      IdentityName:[]
    };
  },
  methods: {
    ...mapState({
      token: store => store.user.token
    }),
    tabAddUser() {
      this.currIndex = 0;
    },
    tabUpdataUser() {
      this.currIndex = 1;
    },
    handleCommand(command) {
      this.userList.valueId = command;
    },
    // 添加用户
    async addUserInfo(userList) {
      let res =await addList(userList);
      console.log(res)
      alert(res.msg);
    }
  },
  async mounted(){
    let res = await addIdentity();
    this.IdentityName = res.data;
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}
.wrap .btn-add {
  margin: 10px 10px;
}
.wrap div{
    width: 100%;
}
.wrap div .inp-use {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
  }
}
.wrap div .inp-pwd {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
  }
}
.wrap div .ipt-select {
  width: 100%;
  height: 40px;
  margin: 0px 10px;
  color: #eee;
 
}
.wrap div .btn-button {
  margin: 20px 10px;
  .qd {
    width: 100px;
    background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  }
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
font-size: 14px;
}
</style>