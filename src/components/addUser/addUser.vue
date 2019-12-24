<template>
<!-- 添加用户 -->
    <div class="wrap">
        <div class="btn-add">
            <el-button>添加用户</el-button>
            <el-button>更新用户</el-button>
        </div>
        <div class="inp-use">
            <input type="text" placeholder="请输入用户名">
        </div>
        <div class="inp-pwd">
            <input type="text" placeholder="请输入密码">
        </div>
        <div class="ipt-select">
            <select name="" id="" >
                <option value="">请选择身份id</option>
                <option value="">管理员</option>
                <option value="">出题者</option>
                <option value="">浏览者</option>
                <option value="">学生</option>
            </select>
        </div>
        <div class="btn-button">
            <el-button>确定</el-button>
            <el-button>重置</el-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    height:50px;
}
.wrap .btn-add{
    margin: 10px 0px;
    
}
.wrap .inp-use{
    margin: 10px 0px;
    background:white;
}
.wrap .inp-pwd{
    margin: 10px 0px;
    background:white;
}
.wrap .ipt-select{
    margin: 10px 0px;
    background:white;
    color:#eee;
}
</style>