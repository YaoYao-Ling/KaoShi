<template>
  <div style="padding:30px;">
    <el-button type="primary" @click="dialogFormVisible = true">+添加教室</el-button>
    <!-- --------------------------------------------------------------- -->
    <el-dialog title="添加教室" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="教室号" :label-width="formLabelWidth">
          <el-input v-model="num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="()=>this.add(num)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ---------------------------------------------------------------------------------- -->
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
import { roomList, deleRoom ,addRoom} from "@/api/classroom";
export default {
  data() {
    return {
      num: "",
      formLabelWidth: "120px",
      tableData: [],
      dialogFormVisible: false
    };
  },
  methods: {
    //添加教室------------------------------
   async add(num){
     await addRoom(num);
      alert('添加成功');
      this.getRoomList();
      this.dialogFormVisible = false
    },
    //获取教室数据---------------------------
    async getRoomList() {
      let res = await roomList();
      console.log(res);
      this.tableData = res.data;
    },
    //删除教室--------------------------
   async handleDelete(index, row) {
      console.log(row.room_id);
     await deleRoom(row.room_id);
      alert("删除成功");
      this.getRoomList();
    }
  },
  created() {
    this.getRoomList();
  }
};
</script>
