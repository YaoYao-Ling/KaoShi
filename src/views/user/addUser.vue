<template>
  <div class="user-wrap">
    <h2 class="add-user-title">添加用户</h2>
    <div class="user-content">
      <div class="user-content-top">
        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div @click="changeIndex(index)" :class="{ active: index === currentIndex }" class="userOperation" v-for="(item, index) in userArr" :key="index">{{item}}</div>
            </div>
            <div v-if="currentIndex" class="user-content-div-title-div-margin-bottom">
              <el-select v-model="identityValue14" placeholder="请选择身份id">
                <el-option
                  v-for="item in identity2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="user-content-div-title-div-margin-bottom"><el-input v-model="userName" placeholder="请输入用户名"></el-input></div>
            <div class="user-content-div-title-div-margin-bottom"><el-input v-model="passWord" placeholder="请输入密码"></el-input></div>
            <div class="user-content-div-title-div-margin-bottom">
              <el-select v-model="identityValue1" placeholder="请选择身份id">
                <el-option
                  v-for="item in identity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="user-content-div-title-div-margin-bottom">
              <el-button @click="addUser" class="user-content-div-right" type="primary">确定</el-button>
              <el-button @click="resetAddUser" type="primary">重置</el-button>
            </div>
        </div>
        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div class="userOperation active">添加身份</div>
          </div>
          <div class="user-content-div-title-div-margin-bottom"><el-input v-model="identityValue" placeholder="请输入身份名称"></el-input></div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-button @click="add_identity" class="user-content-div-right" type="primary">确定</el-button>
            <el-button @click="resetAddIdentity" type="primary">重置</el-button>
          </div>
        </div> 
        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div class="userOperation active">添加api接口权限</div>
          </div> 
          <div class="user-content-div-title-div-margin-bottom"><el-input v-model="permissionsValue" placeholder="请输入api接口权限名称"></el-input></div>
          <div class="user-content-div-title-div-margin-bottom"><el-input v-model="permissionsUrl" placeholder="请输入api接口权限url"></el-input></div>
          <div class="user-content-div-title-div-margin-bottom"><el-input v-model="permissionsMethods" placeholder="请输入api接口权限方法"></el-input></div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-button @click="add_api_root" class="user-content-div-right" type="primary">确定</el-button>
            <el-button @click='reset_add_api_root' type="primary">重置</el-button>
          </div>
        </div>
      </div>

      <div class="user-content-top">
        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div class="userOperation active">添加视图接口权限</div>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-select v-model="viewValue" placeholder="请选择已有的视图">
              <el-option
                v-for="item in view"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-button @click="add_view_root" class="user-content-div-right" type="primary">确定</el-button>
            <el-button @click="reset_add_view_root" type="primary">重置</el-button>
          </div>
        </div>

        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div class="userOperation active">给身份设置api接口权限</div>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-select v-model="identityValue2" placeholder="请选择身份id">
              <el-option
                v-for="item in identity"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> 
          <div class="user-content-div-title-div-margin-bottom">
            <el-select v-model="apiAccessValue" placeholder="请选择api接口权限">
              <el-option
                v-for="item in apiAccess"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-button @click="identity_api_root" class="user-content-div-right" type="primary">确定</el-button>
            <el-button @click="reset_identity_api_root" type="primary">重置</el-button>
          </div>
        </div>

        <div class="user-content-div">
          <div class="user-content-div-title user-content-div-title-div-margin-bottom">
            <div class="userOperation active">给身份设置视图权限</div>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-select v-model="identityValue3" placeholder="请选择身份id">
              <el-option
                v-for="item in identity"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="user-content-div-title-div-margin-bottom">
            <el-select v-model="viewAccessValue" placeholder="请选择视图权限id">
              <el-option
                v-for="item in viewAccess"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> 
          <div class="user-content-div-title-div-margin-bottom">
            <el-button @click="identity_view_root" class="user-content-div-right" type="primary">确定</el-button>
            <el-button @click="reset_identity_view_root" type="primary">重置</el-button>
          </div>
        </div>
      </div>
      
     
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      // 用户ID
      user_id: '',
      // 身份 select
      identity: [],
      // 身份 value 
      identityValue: '',
      identityValue1: '',
      identityValue2: '',
      identityValue3: '',
      // 用户名
      userName: '', 
      // 密码
      passWord: '',
      // 添加用户，更新用户
      userArr: ['添加用户', '更新用户'],
      // 添加用户，更新用户的当前下标
      currentIndex: 0, 
      // api接口权限名称
      permissionsValue: '',
      // api接口权限url
      permissionsUrl: '',
      // api接口权限方法
      permissionsMethods: '',
      // 请选择已有的视图
      view: [],
      // 请选择已有的视图的value
      viewValue: '',
      // 请选择api接口权限
      apiAccess: [],
      // 请选择api接口权限的value
      apiAccessValue: '',
      // 请选择视图权限id
      viewAccess: [],
      // 请选择视图权限id的value
      viewAccessValue: '',
      // 展示用户数据 
      identity2: [],
      // 请选择身份id 4
      identityValue14: '',
      // 更新还是添加
      flag: true
      
    }
  },
  computed: {
    ...mapState({
      // 用户信息对象
      userObj: state => state.user_management.userObj,
      // 用户数据
      userIdentityList: state => state.user_management.userIdentityList,
      // 视图权限数据
      user_view_authority_list: state => state.user_management.user_view_authority_list,
      // api接口权限数据
      userApi_authority_list: state => state.user_management.userApi_authority_list,
      // 展示用户数据
      userUserList: state => state.user_management.userUserList,
      // 添加身份的状态
      user_identity_edit_status: state => state.user_management.user_identity_edit_status,
      // 更新 添加用户信息(用户名，用户密码，用户身份)的状态
      update_user_status: state => state.user_management.update_user_status,
      // 添加 用户信息(用户名，用户密码，用户身份)的状态
      update_add_user_status: state => state.user_management.update_add_user_status,
      // 添加api接口权限的状态
      user_authorityApi_edit_status: state => state.user_management.update_add_user_status,
      // 给身份设定api接口权限的状态
      user_setIdentityApi_status: state => state.user_management.user_setIdentityApi_status,
      // 给身份设定视图权限的状态
      user_setIdentityView_status: state => state.user_management.user_setIdentityView_status,
      
    }),

  },
  methods: { 
    // reset 给身份设置视图权限
    reset_identity_view_root() {
        this.viewAccessValue = '' 
        this.identityValue3 = '' 
    },
    // 给身份设置视图权限的确定按钮
    identity_view_root() {
      const identity_id = this.identityValue3
      const view_authority_id = this.viewAccessValue
      if (!identity_id && !view_authority_id) {
        return alert('请选择内容！')
      }
      this.user_setIdentityView({
        identity_id,       
        view_authority_id
      })
    },          
    // 请选择api接口权限 按钮
    identity_api_root() {
      const identity_id = this.identityValue2 
      const api_authority_id = this.apiAccessValue
      this.user_setIdentityApi({
        identity_id,
        api_authority_id
      })
    },
    // reset 请选择api接口权限 按钮
    reset_identity_api_root() {
      this.identityValue2 = ''
      this.apiAccessValue = ''
    },
    // reset 添加视图接口权限的按钮
    reset_add_view_root() {
      this.viewValue = ''
    },
    // 添加视图接口权限的按钮
    add_view_root() {
      const view_id = this.viewValue
      const view_authority_text = this.view.filter(item => item.value === view_id)[0].label
      this.user_authorityView_edit({
        view_id,
        view_authority_text
      })
    },
    // reset 添加 api接口权限
    reset_add_api_root() {
      this.permissionsValue = ''
      this.permissionsMethods = ''
      this.permissionsUrl = ''
    },
    // 添加 api接口权限
    add_api_root() {
      const api_authority_text = this.permissionsValue
      const api_authority_url = this.permissionsUrl 
      const api_authority_method = this.permissionsMethods
      if (api_authority_text.trim() && api_authority_url.trim() && api_authority_method.trim()) {
        this.user_authorityApi_edit({
          api_authority_text,
          api_authority_url,
          api_authority_method
        })
      } else {
        alert('参数不完整!')
      }
    },
    // reset 添加身份
    resetAddIdentity() {
      this.identityValue = ''
    },
    // reset 添加/更新用户
    resetAddUser() {
      this.userName = ''
      this.passWord = ''
      this.identityValue1 = ''
      this.identityValue14 = ''
    },
    // 添加身份按钮
    add_identity() {
      if (!this.identityValue.trim()) {
        return alert('请输入要添加的身份!')
      }   
      this.user_identity_edit(this.identityValue)
    },
    // 添加用户的确定
    addUser() {
      const user_name = this.userName
      const user_pwd = this.passWord
      const identity_id = this.identityValue1
      // 密码强度正则 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

  
      if(user_name.trim()) {
        if (pPattern.test(user_pwd)) {
          if (identity_id) {
            if(this.flag) {
              // 添加
              this.user({
                user_name,
                user_pwd,
                identity_id
              })
            } else {
              // 更新
              if (this.identityValue14) {
                const user_id = this.identityValue14
                this.updateUser({
                  user_name,
                  user_pwd,
                  identity_id,
                  user_id
                })
              } else {
                alert('请选择身份id')
              }
            }
          } else {
            alert('请选择身份')
          }
        } else {
          alert('密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
        }
      } else {
        alert('请输入正确的用户名')
      }
    },
    // 点击 添加用户，更新用户 更改当前的下标
    changeIndex(i) {
      if (i) {
        // 更新
        this.flag = false
      } else {
        // 添加
        this.flag = true
      }
      this.currentIndex = i
    },
    ...mapActions({
      // 获取当前用户信息
      userInfo: 'user_management/userInfo',
      // 根据用户id，返回该用户的视图权限
      userNew: 'user_management/userNew',
      // 展示用户数据
      userUser: 'user_management/userUser',
      // 展示身份数据
      userIdentity: 'user_management/userIdentity',
      // 展示api接口权限数据
      userApi_authority: 'user_management/userApi_authority',
      // 展示身份和视图权限关系
      userIdentity_view_authority_relation: 'user_management/userIdentity_view_authority_relation',
      // 获取视图权限数据
      user_view_authority: 'user_management/user_view_authority',
      // 添加用户
      user: 'user_management/user',
      // 更新用户信息(用户名，用户密码，用户身份)
      updateUser: 'user_management/updateUser',
      // 添加身份
      user_identity_edit: 'user_management/user_identity_edit',
      // 添加api接口权限
      user_authorityApi_edit: 'user_management/user_authorityApi_edit',
      // 添加视图权限
      user_authorityView_edit: 'user_management/user_authorityView_edit',
      // 给身份设定api接口权限
      user_setIdentityApi: 'user_management/user_setIdentityApi',
      // 给身份设定视图权限
      user_setIdentityView: 'user_management/user_setIdentityView',
    }),
    ...mapMutations({
      // 更新 添加身份的状态
      update_user_identity_edit: 'user_management/update_user_identity_edit',
      // 更新 用户信息(用户名，用户密码，用户身份)的状态
      update_user: 'user_management/update_user',
      // 更新 添加用户的状态
      update_add_user: 'user_management/update_add_user',
      // 更新 添加api接口权限的状态
      update_user_authorityApi_edit: 'user_management/update_user_authorityApi_edit',
      // 更新 给身份设定api接口权限的状态
      update_user_setIdentityApi: 'user_management/update_user_setIdentityApi',
      // 更新 给身份设定视图权限
      update_user_setIdentityView: 'user_management/update_user_setIdentityView',
    })
  },
  watch: {
    // 监听 给身份设定视图权限的状态
    user_setIdentityView_status(now) {
      console.log('now------------', now)
      if (now) {
        alert('给身份设置视图权限成功!')
        this.$router.go(0)
      } 
      // 还原状态
      this.update_user_setIdentityView(false)
    },
    // 监听 给身份设置api接口权限
    user_setIdentityApi_status(now) {
      if (now) {
        alert('给身份设置api接口权限成功!')
        this.$router.go(0)
      } 
      // 还原状态
      this.update_user_setIdentityApi(false)
    },
    // 监听 添加api接口权限的状态
    user_authorityApi_edit_status(now) {
      if (now) {
        alert('添加api接口权限成功!') 
        this.$router.go(0)
      } 
      // 还原状态
      this.update_user_authorityApi_edit(false)
    }, 
    // 监听 更新用户信息(用户名，用户密码，用户身份)的状态
    update_add_user_status(now) {
      if (now) {
        alert('添加用户成功!')
        this.$router.go(0)
      } 
      // 还原状态
      this.update_add_user(false)
    }, 
    // 监听 添加用户信息(用户名，用户密码，用户身份)的状态
    update_user_status(now) {
      if (now) {
         alert('更新用户成功!')
        this.$router.go(0)
      } 
      // 还原状态
      this.update_user(false)
    }, 
    // 监听 添加身份的状态
    user_identity_edit_status(now) {
      if (now) {
        alert('添加身份成功!')
        this.$router.go(0)
      } 
      // 还原状态
      this.update_user_identity_edit(false)
    }, 
    // 监听 展示用户数据
    userUserList(now) {
      this.identity2 = now.map(item => {
        return {
          value: item.user_id,
          label: item.user_name
        }
      })
    },
    // 监听 api接口权限数据
    userApi_authority_list(now) {
      this.apiAccess = now.map(item => {
        return {
          value: item.api_authority_id,
          label: item.api_authority_text
        }
      })
    },
    // 监听 获取视图权限数据
    user_view_authority_list(now) {

      this.viewAccess = now.map(item => {
        return {
          value: item.view_authority_id,
          label: item.view_authority_text
        }
      })
      this.view = now.map(item => {
        return {
          value: item.view_authority_id,
          label: item.view_authority_text
        }
      })
    },
    // 监听 获取视图权限数据
    userIdentityList(now) {
      // 人员身份
      this.identity = now.map(item => {
        return {
          value: item.identity_id,
          label: item.identity_text
        }
      })
    },
    // 监听 当前用户信息对象
    userObj(now) {
      // 赋值
      this.user_id = now.user_id
    },
  },
  async created() {
    // 获取当前用户信息，必须这么写，否则this.user_id获取不到
    await this.userInfo()
    // 根据用户id，返回该用户的视图权限
    this.userNew(this.user_id)
    // 展示用户数据
    this.userUser()
    // 展示身份数据
    this.userIdentity()
    // 展示api接口权限数据
    this.userApi_authority()
    // 展示身份和视图权限关系
    this.userIdentity_view_authority_relation()
    // 获取视图权限数据
    this.user_view_authority()
  }
}
</script>
<style lang="scss" scoped >
.user-content-top {
  display: flex;
}
>>> .el-button {
  float: left;
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}
>>> .user-content-div-right {
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
.ant-input {
  font-variant: tabular-nums;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 4px 11px;
  width: 100%;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}
.user-content-div-title-div-margin-bottom {
  margin-bottom: 20px !important;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
}
.user-content-div {
  width: 33.3%;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
.active {
  border-radius: 0 2px 2px 0 !important;
  background: #fff !important;
  border-color: #0139FD !important;
  color: #0139FD !important;
  box-shadow: -1px 0 0 0 #0139FD !important;
  z-index: 1 !important;
}
.userOperation {
  margin: 0;
  height: 32px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.65);
  display: inline-block;
  transition: color 0.3s, background 0.3s, border-color 0.3s;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-left: 0;
  border-top-width: 1.02px;
  background: #fff;
  padding: 0 15px;
  position: relative;
  border-radius: 2px 0 0 2px;
  border-left: 1px solid #d9d9d9;
  box-shadow: none !important;
}
.user-content-div-title {
  font-variant: tabular-nums;
  line-height: 1.5;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  line-height: unset;
}
.user-content {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.add-user-title {
  padding: 20px 0px;
  margin-top: 10px;
  font-size: 20px;
}
.user-wrap {
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
h2, h3, h4, h5, h6 {
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
</style>