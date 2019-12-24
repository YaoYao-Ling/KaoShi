<template>
<!-- 添加api接口权限 -->
    <div class="wrap">
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
    </div>
</template>

<script>
export default {

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