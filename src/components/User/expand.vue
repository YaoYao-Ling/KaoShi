<template>
  <div class="wrap">
      <!-- 身份和试图权限关系 -->
        <h1>{{currItem}}</h1>
        <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
            <el-table-column prop="identity_text" label="身份" style="width: 30%"></el-table-column>
            <el-table-column prop="view_authority_text" label="视图权限名称" style="width: 30%"></el-table-column>
            <el-table-column prop="view_id" label="视图id" style="width: 30%"></el-table-column>
            
        </el-table> 
        <el-pagination
          @size-change="handleSizeChange"
          @current-page="handleCurrentChange"
          :page-size="pagesize"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="list.length"
          
          >
      </el-pagination>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
    props:['list','currItem'],
    data(){
        return {
            currentPage:1,  //初始页
            pagesize:10,  //每页的数据
        }
    },
    methods:{
        handleSizeChange(size){
            this.pagesize = size;
            console.log(this.pagesize)
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage;  // 点击第几页
        }
    }
}
</script>

<style lang="scss" scoped>
h1{
    font-weight: normal;
}
</style>