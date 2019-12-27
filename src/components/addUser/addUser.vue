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
        <el-select v-model="userList.value" placeholder="请选择身份id" @change="changer">
            <el-option
              v-for="(item,index) in UserList"
              :key="index"
              :label="item.identity_text"
              :value="item"
            
            ></el-option>
          </el-select>
      </div>
      <div class="btn-button">
        <el-button class="qd" @click="addUserInfo(userList)">确定</el-button>
        <el-button @click="clear">重置</el-button>
      </div>
    </div>
    <div v-if="this.currIndex == 1">
      <div class="ipt-select">
        <el-select v-model="upData.curIn" placeholder="请选择身份id" @change="changer1">
            <el-option
              v-for="(val,index1) in getUserListall"
              :key="index1"
              :label="val.user_name"
              :value="val"
            
            ></el-option>
          </el-select>
      </div>
      <div class="inp-use">
        <input type="text" placeholder="请输入用户名" v-model="upData.dataName" />
      </div>
      <div class="inp-pwd">
        <input type="text" placeholder="请输入密码" v-model="upData.dataPwd" />
      </div>
      <div class="ipt-select">
        <el-select v-model="userList.value" placeholder="请选择身份id" @change="changer2">
            <el-option
              v-for="(item,index) in UserList"
              :key="index"
              :label="item.identity_text"
              :value="item"
            
            ></el-option>
          </el-select>
      </div>
      <div class="btn-button">
        <el-button class="qd" @click="upDataUserInfo(upData)">确定</el-button>
        <el-button @click="clear">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addList, addIdentity, upDataUser } from '@/api/table'
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      currIndex: 0,
      value:'',
      curIn:'',
      item:{},
      val:{},
      userList: {
        userName: '', //用户名
        userPwd: '', //密码
        value: '', //身份Id
      },
      upData: {
        dataName: '', //用户名
        dataPwd: '', //密码
        curIn: '', //身份Id
        value:'',
        dataUserId:'',
        identityId:''
      },
      IdentityName: []
    }
  },
  computed:{
      ...mapState({
        UserList: state => state.attempt.UserList,
        getUserListall: state => state.attempt.getUserListall
      })
    },
  methods: {
    tabAddUser() {
      this.currIndex = 0
    },
    async tabUpdataUser() {
      this.currIndex = 1
      const res = await addIdentity()
      this.IdentityName = res.data
    },
    changer(item){
      this.item = item
      this.userList.value = item.identity_text
      this.upData.value = item.identity_text
    },
    changer1(val){
        this.val = val
        this.upData.curIn = val.user_name
        this.upData.dataUserId = val.user_id
    },
    changer2(item){
      this.item = item
      this.upData.value = item.identity_text
      this.upData.identityId = item.identity_id
    },
    clear(){
      this.userList.userName ='', //用户名
      this.userList.userPwd = '', //密码
      this.userList.value = '', //身份Id
      
      this.upData.dataName = '', //用户名
      this.upData.dataPwd = '', //密码
      this.upData.curIn = '', //身份Id
      this.upData.value = ''
    },
    // 添加用户
    async addUserInfo(userList) {
      const res = await addList(userList)
      alert(res.msg)
    },
    // 更新用户信息
    async upDataUserInfo(upData) {
      const res = await upDataUser(upData)
      alert(res.msg)
    },
    ...mapActions({
        getUserBean:"attempt/getUserBean",
        getUserNameList:"attempt/getUserNameList"
      })
  },
    mounted(){
        this.getUserBean(),
        this.getUserNameList()
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


.wrap div .inp-use {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
    border:solid 1px #eee;
    font-size: 14px;
    padding-left: 20px;
  }
}
.wrap div .inp-pwd {
  margin: 20px 10px;
  input {
    width: 100%;
    height: 30px;
    border:solid 1px #eee;
    font-size: 14px;
    padding-left: 20px;
  }
}
.wrap div .ipt-select {
  width: 50%;
  height: 40px;
  margin: 0px 10px;
  color: #eee;
}
.wrap div .btn-button {
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
  font-size: 14px;
}

</style>

