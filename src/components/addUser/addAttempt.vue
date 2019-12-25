<template>
  <!-- 添加试图接口权限 -->
  <div class="wrap">
    <div class="btn-add">
      <el-button>添加试图接口权限</el-button>
    </div>
    <div class="ipt-select">
      <el-select v-model="value" placeholder="请选择已有视图"  @change="changer">
        <el-option
          v-for="(item,index) in data"
          :key="index"
          :label="item.view_authority_text"
          :value="item"
         
        ></el-option>
      </el-select>
    </div>
    <div class="btn-button">
      <el-button class="qd" @click="btn(item)">确定</el-button>
      <el-button @click="clear">重置</el-button>
    </div>
  </div>
</template>

<script>
import { addPrivileges } from "@/api/table";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      value:'',
      item:{}
    };
  },
  computed: {
    ...mapState({
      data: state => state.attempt.data
    })
  },
  methods: {
    changer(item){
       this.item = item
       this.value = item.view_authority_text
    },
    clear() {
      this.value = "";
    },
    async btn(item) {
      let res = await addPrivileges(item);
       console.log(res)
      alert(res.msg);
    },
    
    ...mapActions({
      changeSetting: "attempt/changeSetting"
    })
  },
  mounted() {
    this.changeSetting();
  }
};
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