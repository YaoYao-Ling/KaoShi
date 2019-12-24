<template>
  <div class="app-container">
    <div class="top">
      <h3>添加用户</h3>
    </div>
    <div class="main">
      <!-- 添加用户 -->
      <li>
        <div class="btn-add">
          <el-button>添加用户</el-button>
          <el-button>更新用户</el-button>
        </div>
        <div class="inp-use">
          <input type="text" placeholder="请输入用户名" />
        </div>
        <div class="inp-pwd">
          <input type="text" placeholder="请输入密码" />
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择身份id</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
      <!-- 添加身份 -->
      <li>
        <div class="btn-add">
          <el-button>添加身份</el-button>
        </div>
        <div class="inp-use">
          <input type="text" placeholder="请输入身份名称" />
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
      <!-- 添加api接口权限 -->
      <li>
        <div class="btn-add">
          <el-button>添加api接口权限</el-button>
        </div>
        <div class="inp-use">
          <input type="text" placeholder="请输入api接口权限名称" />
        </div>
        <div class="inp-pwd">
          <input type="text" placeholder="请输入api接口权限url" />
        </div>
        <div class="inp-pwd">
          <input type="text" placeholder="请输入api接口权限方法" />
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
      <!-- 添加试图接口权限 -->
      <li>
        <div class="btn-add">
          <el-button>添加试图接口权限</el-button>
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择已有试图</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
      <!-- 给身份设置api接口权限 -->
      <li>
        <div class="btn-add">
          <el-button>给身份设置api接口权限</el-button>
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择身份id</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择api接口权限idid</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
      <!-- 给身份设置试图权限 -->
      <li>
        <div class="btn-add">
          <el-button>给身份设置试图权限</el-button>
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择身份id</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>id
        </div>
        <div class="ipt-select">
          <select name id>
            <option value>请选择试图权限id</option>
            <option value>管理员</option>
            <option value>出题者</option>
            <option value>浏览者</option>
            <option value>学生</option>
          </select>
        </div>
        <div class="btn-button">
          <el-button class="qd">确定</el-button>
          <el-button>重置</el-button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import AddUser from "../../components/addUser/addUser";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  components: {
    AddUser
  },
  created() {
    this.fetchData();
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
.app-container .top {
  width: 100%;
  height: 50px;
}
.app-container .top h3 {
  line-height: 50px;
  font-weight: normal;
}
.app-container .main {
  width: 100%;
  border: solid 1px #ccc;
  background: #f0f2f5;
  display: flex;
  flex-wrap: wrap;
}
.app-container .main li {
  width: 33.3%;
  border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
}
.app-container .main li .btn-add{
    margin: 10px 0px;
    
}
.app-container .main li  .inp-use{
    margin: 20px 0px;
    input{
      width: 100%;
      height:30px;
    }
}
.app-container .main li  .inp-pwd{
    margin: 20px 0px;
    input{
      width: 100%;
      height:30px;
    }
}
.app-container .main li  .ipt-select{
    margin: 20px 0px;
    color:#eee;
    select{
      height:30px;
    }
}
.app-container .main li  .btn-button{
  .qd{
    width: 100px;
    background:linear-gradient(-90deg,#4e75ff,#0139fd)!important;
  }
}
</style>
