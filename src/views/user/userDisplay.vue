<template>
  <div class="user-wrap">
      <h2 class="user-wrap-title">用户展示</h2>
      <div class="user-content">
        <div class="user-content-top">
          <div @click="changeIndex(index, item)" :class="{ active: currentIndex === index }" v-for="(item, index) in topList" :key="index">
            {{item}}
          </div>
        </div>
        <h1 class="title" >{{title}}</h1>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            :prop="tableOneProp"
            :label="tableOne"
            :width="tableOneWidth">
          </el-table-column>
          <el-table-column
            :prop="tableTwoProp"
            :label="tableTwo"
            :width="tableTwoWidth">
          </el-table-column>
          <el-table-column
            :prop="tableThreeProp"
            :label="tableThree"
            :width="tableThreeWidth">
          </el-table-column>
          <el-table-column
            :prop="tableFourProp"
            :label="tableFour"
            :width="tableFourWidth">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="showPagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[2, 4, 6, 8, 10]"
          :page-size="currentSize"
          layout="sizes, prev, pager, next"
          :total="API_INTERFACE_PERMISSIONS_LENGTH">
        </el-pagination>
        <el-pagination
          v-if="showPagination2"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page.sync="currentPage3"
          :page-sizes="[2, 4, 6, 8, 10]"
          :page-size="currentSize2"
          layout="sizes, prev, pager, next"
          :total="API_INTERFACE_PERMISSIONS_LENGTH2">
        </el-pagination>
        <el-pagination
          v-if="showPagination3"
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page.sync="currentPage4"
          :page-sizes="[2, 4, 6, 8, 10]"
          :page-size="currentSize3"
          layout="sizes, prev, pager, next"
          :total="API_INTERFACE_PERMISSIONS_LENGTH3">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { nextTick } from 'q'
export default {
  data() {
    return {
      // 当前页数
      currentPage2: 1,
      // 当前页数
      currentPage3: 1,
      // 当前页数
      currentPage4: 1,
      // 当前下标
      currentIndex: 0,
      // 数据
      topList: ['用户数据', '身份数据', 'api接口权限', '身份和api接口关系', '视图接口权限', '身份和视图权限关系'],
      // 总数据
      allData: {},
      // table表格变量
      tableOne: '',
      tableTwo: '',
      tableThree: '',
      tableFour: '',
      tableOneProp: '',
      tableTwoProp: '',
      tableThreeProp: '',
      tableFourProp: '',
      // table数据
      tableData: [],
      // title标题
      title: '用户数据',
      // table宽度
      tableOneWidth: '180',
      tableTwoWidth: '180',
      tableThreeWidth: '180',
      tableFourWidth: '180',
      // api的length
      API_INTERFACE_PERMISSIONS_LENGTH: 0,
      // api的length
      API_INTERFACE_PERMISSIONS_LENGTH2: 0,
      // api的length
      API_INTERFACE_PERMISSIONS_LENGTH3: 0,
      // 分页 -》 刚开始的下标
      startIndex: 0,
      // 默认的分页 个数
      currentSize: 2,
      // 默认的分页 个数
      currentSize2: 2,
      // 默认的分页 个数
      currentSize3: 2,
      // 当前分页的数据
      currentArr: [],
      // 显示/隐藏 showPagination
      showPagination: false,
      // 显示/隐藏 showPagination2
      showPagination2: false,
      // 显示/隐藏 showPagination3
      showPagination3: false,
    }
  },
  computed: {
    ...mapState({
      // 用户信息对象
      userObj: state => state.user_management.userObj,
      // 展示用户数据
      userUserList: state => state.user_management.userUserList,
      // 展示身份数据
      userIdentityList: state => state.user_management.userIdentityList,
      // 展示api接口权限数据
      userApi_authority_list: state => state.user_management.userApi_authority_list,
      // 展示身份和视图权限关系
      userIdentity_view_authority_relation_list: state => state.user_management.userIdentity_view_authority_relation_list,
      // 身份和api接口关系
      user_identity_api_authority_relation_list: state => state.user_management.user_identity_api_authority_relation_list,
      // 获取视图权限数据
      user_view_authority_list: state => state.user_management.user_view_authority_list,
    })
  },
  methods: {
    handleSizeChange3(val) {
      this.currentSize3 = val
    },
    handleSizeChange2(val) {
      this.currentSize2 = val
    },
    handleSizeChange(val) {
      this.currentSize = val
    },
    handleCurrentChange3(val) {
      let start = (val - 1) * this.currentSize3
      let end = val * this.currentSize3
      this.allData['身份和视图权限关系'] = this.userIdentity_view_authority_relation_list.slice(start, end)
      this.changeIndex(this.currentIndex, '身份和视图权限关系')
    },
    handleCurrentChange2(val) {
      let start = (val - 1) * this.currentSize2
      let end = val * this.currentSize2
      this.allData['身份和api接口关系'] = this.user_identity_api_authority_relation_list.slice(start, end)
      this.changeIndex(this.currentIndex, '身份和api接口关系')
    },
    handleCurrentChange(val) {
      let start = (val - 1) * this.currentSize
      let end = val * this.currentSize
      this.allData['api接口权限'] = this.userApi_authority_list.slice(start, end)
      this.changeIndex(this.currentIndex, 'api接口权限')
    },
    // 改变当前的下标
    changeIndex(index, name) {
      this.currentIndex = index
      this.tableOne = ''
      this.tableTwo  = ''
      this.tableThree  = ''
      this.tableFour = ''
      this.tableOneProp  = ''
      this.tableTwoProp  = ''
      this.tableThreeProp = ''
      this.tableFourProp = ''
      this.showPagination = false
      this.showPagination2 = false
      this.showPagination3 = false

      this.tableData = this.allData[name] && this.allData[name].map(item => {
        switch(name) {
          case '用户数据':
            this.tableOneWidth = this.tableThreeWidth = 100
            this.tableTwoWidth = 600
            this.title !== '用户数据' ? this.title = '用户数据' : null
            this.tableOne !== '用户名' ? this.tableOne = '用户名': null
            this.tableTwo !== '密码' ? this.tableTwo = '密码': null
            this.tableThree !== '身份' ? this.tableThree = '身份' : null
            this.tableOneProp !== 'name' ? this.tableOneProp = 'name' : null
            this.tableTwoProp !== 'pwd' ? this.tableTwoProp = 'pwd' : null
            this.tableThreeProp !== 'identity' ? this.tableThreeProp = 'identity' : null
            return {
              name: item.user_name,
              pwd: item.user_pwd,
              identity: item.identity_text
            }
          break;
          case '身份数据': 
            this.title !== '身份数据' ? this.title = '身份数据' : null
            this.tableOne !== '身份名称' ? this.tableOne = '身份名称' : null
            this.tableOneProp !== 'name' ? this.tableOneProp = 'name' : null
            return {
              name: item.identity_text        
            }
          break; 
          case 'api接口权限':
            this.showPagination = true 
            this.title !== 'api接口权限' ? this.title = 'api接口权限' : null
            this.tableOne !== 'api权限名称' ? this.tableOne = 'api权限名称' : null
            this.tableOneProp !== 'permission_to_name' ? this.tableOneProp = 'permission_to_name' : null
            this.tableTwo !== 'api权限url' ? this.tableTwo = 'api权限url' : null
            this.tableTwoProp !== 'permission_to_url' ? this.tableTwoProp = 'permission_to_url' : null
            this.tableThree !== 'api权限方法' ? this.tableThree = 'api权限方法' : null
            this.tableThreeProp !== 'permission_to_method' ? this.tableThreeProp = 'permission_to_method' : null
            this.tableOneWidth = this.tableTwoWidth = this.tableThreeWidth = 350
            return {
              permission_to_name: item.api_authority_text,    
              permission_to_url: item.api_authority_url,    
              permission_to_method: item.api_authority_method,    
            }
          break;
          case '身份和api接口关系': 
            this.showPagination2 = true 
            this.title !== '身份和api接口关系' ? this.title = '身份和api接口关系' : null
            this.tableOne !== '身份名称' ? this.tableOne = '身份名称' : null
            this.tableOneProp !== 'name' ? this.tableOneProp = 'name' : null
            this.tableTwo !== 'api权限名称' ? this.tableTwo = 'api权限名称' : null
            this.tableTwoProp !== 'permission_to_name' ? this.tableTwoProp = 'permission_to_name' : null
            this.tableThree !== 'api权限url' ? this.tableThree = 'api权限url' : null
            this.tableThreeProp !== 'permission_to_url' ? this.tableThreeProp = 'permission_to_url' : null
            this.tableFour !== 'api权限方法' ? this.tableFour = 'api权限方法' : null
            this.tableFourProp !== 'permission_to_method' ? this.tableFourProp = 'permission_to_method' : null
            this.tableOneWidth = 150
            this.tableTwoWidth = 300
            this.tableThreeWidth = 400
            this.tableFourWidth = 300
            return {
              name: item.identity_text,
              permission_to_name: item.api_authority_text,
              permission_to_url: item.api_authority_url,
              permission_to_method: item.api_authority_method
            }
          break;
          case '视图接口权限': 
            this.title !== '视图接口权限' ? this.title = '视图接口权限' : null
            this.tableOne !== '视图权限名称' ? this.tableOne = '视图权限名称': null
            this.tableTwo !== '视图id' ? this.tableTwo = '视图id': null
            this.tableOneProp !== 'view_authority_text' ? this.tableOneProp = 'view_authority_text' : null
            this.tableTwoProp !== 'view_id' ? this.tableTwoProp = 'view_id' : null
            this.tableOneWidth = 400
            this.tableTwoWidth = 300
            return {
              view_authority_text: item.view_authority_text,
              view_id: item.view_id
            }
          break;
          case '身份和视图权限关系': 
            this.showPagination3 = true
            this.title !== '身份和视图权限关系' ? this.title = '身份和视图权限关系' : null
            this.tableOne !== '身份' ? this.tableOne = '身份': null
            this.tableTwo !== '视图名称' ? this.tableTwo = '视图名称': null
            this.tableThree !== '视图id' ? this.tableThree = '视图id' : null
            this.tableOneProp !== 'identity_text' ? this.tableOneProp = 'identity_text' : null
            this.tableTwoProp !== 'view_authority_text' ? this.tableTwoProp = 'view_authority_text' : null
            this.tableThreeProp !== 'view_id' ? this.tableThreeProp = 'view_id' : null
            this.tableOneWidth = 300
            this.tableTwoWidth = 300
            return {
              identity_text: item.identity_text,
              view_authority_text: item.view_authority_text,
              view_id: item.view_id
            }
        }
      })

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
      // 身份和api接口关系
      user_identity_api_authority_relation: 'user_management/user_identity_api_authority_relation',

    })
  },
  watch: {
    // 监听 展示身份和视图权限关系
    userIdentity_view_authority_relation_list(now) {
      this.API_INTERFACE_PERMISSIONS_LENGTH3 = now.length 
      this.allData['身份和视图权限关系'] = now.slice(0, this.currentSize3)
    },
    // 监听 获取视图权限数据
    user_view_authority_list(now) {
      this.allData['视图接口权限'] = now
    },
    // 监听 身份和api接口关系
    user_identity_api_authority_relation_list(now) {
      this.API_INTERFACE_PERMISSIONS_LENGTH2 = now.length 
      this.allData['身份和api接口关系'] = now.slice(0, this.currentSize2)
    },
    // 监听分页
    currentSize3(now) {
      this.currentPage4 = 1
      this.allData['身份和视图权限关系'] = this.userIdentity_view_authority_relation_list.slice(0, now)
      this.changeIndex(this.currentIndex, '身份和视图权限关系')
    },
    // 监听分页
    currentSize2(now) {
      this.currentPage3 = 1
      this.allData['身份和api接口关系'] = this.user_identity_api_authority_relation_list.slice(0, now)
      this.changeIndex(this.currentIndex, '身份和api接口关系')
    },
    // 监听分页
    currentSize(now) {
      this.currentPage2 = 1
      this.allData['api接口权限'] = this.userApi_authority_list.slice(0, now)
      this.changeIndex(this.currentIndex, 'api接口权限')
    },
    // 监听 展示api接口权限数据
    userApi_authority_list(now) {
      this.API_INTERFACE_PERMISSIONS_LENGTH = now.length 
      this.allData['api接口权限'] = now.slice(0, this.currentSize)
    },
    // 监听 展示身份数据
    userIdentityList(now) {
      this.allData['身份数据'] = now
    },
    // 监听 展示用户数据
    userUserList(now) {
      this.allData['用户数据'] = now
      // 初始化 页面数据
      this.changeIndex(this.currentIndex, '用户数据')
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
    // 身份和api接口关系
    this.user_identity_api_authority_relation()
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 2em;
}
.user-content-top > div:nth-child(1) {
    box-shadow: -1px 0 0 0 #d9d9d9;
}

.user-content-top div {
  margin: 0;
  height: 32px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.65);
  display: inline-block;
  transition: color 0.3s, background 0.3s, border-color 0.3s;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-left: 0;
  padding: 0 15px;
  position: relative;
  margin: 0;
}
.active {
  border-color: #0139FD !important;
  box-shadow: none !important;
  color: #0139FD !important;
  box-shadow: -1px 0 0 0 #295eff !important;
}
.user-content-top {
  display: flex;
}
.user-wrap-title {
  padding: 20px 0px;
  margin-top: 10px;
  font-size: 20px;
}
.user-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
</style>