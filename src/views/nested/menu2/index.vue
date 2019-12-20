<template>
  <div style="padding:30px;">
    <el-button type="primary">+添加教室</el-button>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="教室号" prop="room_text" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
  </div>
  
</template>


<script>
import { roomList } from "@/api/user";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //获取教室数据---------------------------
    async getRoomList() {
      let res = await roomList();
      console.log(res);
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getRoomList();
  }
};
</script>
