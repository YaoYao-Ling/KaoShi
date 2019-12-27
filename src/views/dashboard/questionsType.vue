<template>
  <div class="questionsType">
      <h2 class="title">试题分类</h2>
      <div class="questionsType-content">
        <div class="questionsType-container">
          <div class="title-btn">
            <button @click="addType">
              + 添加类型
            </button>
          </div>
          <el-table
            :header-cell-style="{backgroundColor: '#F4F7F9'}"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="id"
              label="类型ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="类型名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
              <template slot-scope="scope"> 
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog
        title="创建新类型"
        :visible.sync="centerDialogVisible"
        width="70%"
        center>
        <el-input v-model="input" placeholder="请输入类型名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="determine" type="primary">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
 data() {
    return {
      // 试题分类表格变量
      tableData: [],
      // 对话框的显示/隐藏
      centerDialogVisible: false,
      // 对话框里面的input框的value
      input: '',
      // 设置 当前的 添加试题类型的 序号
      sort: ''
    }
  },
  methods: {
    // 删除按钮
    handleClick(row) {
      const { id } = row 
      this.delQuestionsType(id)
    },
    // 确定按钮
    determine() {
      this.centerDialogVisible = false
      const text = this.input 
      const sort = this.sort 
      if (text.trim()) {
        this.insertQuestionsType({text, sort})
        this.input = ''
      }
    },
    // 添加类型按钮
    addType() {
      this.centerDialogVisible = true
    },
    ...mapActions({
      // 获取所有的课程
      getQuestionsType: 'test_question_management/getQuestionsType',
      // 添加试题类型接口
      insertQuestionsType: 'test_question_management/insertQuestionsType',
      // 删除指定的试题类型
      delQuestionsType: 'test_question_management/delQuestionsType',
    }),
    ...mapMutations({
      updateInsertQuestionsType: 'test_question_management/updateInsertQuestionsType'
    })
  },
  computed: {
    ...mapState({
      // 试题类型列表
      testingTypesList: state => state.test_question_management.testingTypesList,
      // 添加试题类型的 状态
      insertQuestionsTypeStatus: state => state.test_question_management.insertQuestionsTypeStatus,
    })
  },
  watch: {
     // 监听 试题类型
    testingTypesList(now) {
      // 设置 当前的 添加试题类型的 序号
      const sort = now[now.length - 1].questions_type_sort + 1
      this.sort = sort
      this.tableData = now.map(item => {
        item.id = item.questions_type_id
        item.name = item.questions_type_text
        return item
      })
    },
    // 监听 添加试题类型的 状态
    insertQuestionsTypeStatus(now) {
      // 如果是true 更新列表
      if (now) {
        this.getQuestionsType()
        // 然后还原status为 false
        this.updateInsertQuestionsType(false)
      }
    }
  },
  mounted() {
    // 获取试题类型
    this.getQuestionsType()
  }
}
</script>

<style lang="scss" scoped>

>>> .el-table__row {
  width: 100px;
}

>>> .dialog-footer >>> .el-button:nth-child(1) {
  height: 40px;
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
>>> .el-input__inner {
  margin: 20px 0;
  border-top: none;
  border-left: none;
  border-right: none;
}
>>> .el-dialog__header, >>> .el-dialog__body {
  padding: 0;
}
>>> .el-dialog {
  padding: 24px 80px;
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
>>> .el-table {
  font-size: 14px;
  color: #606266;
}

.title-btn button {
  margin-bottom: 25px;
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  height: 40px;
  margin-right: 10px;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
.questionsType-content {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.title {
  padding: 20px 0px;
  margin-top: 10px;
  font-size: 22px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.questionsType {
  width: 100%;
  height: 100%;
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
</style>