<template>
  <div class="box">
    添加考试
    <div class="con">
      <div>
        <p>
          <span>*</span>
          <span>试卷名称</span>
        </p>
        <el-autocomplete
          class="ipt"
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
      </div>
      <div>
        <p><span>*</span><span>试卷名称</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </p>
      </div>
      <div>
        <p><span>*</span><span>选择课题</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </p>
      </div>
      <div>
        <p><span>*</span><span>选择课题</span></p>
        <el-input-number class="ipt" v-model="num" controls-position="right" :min="1" :max="10" ></el-input-number>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: "",
       num: 3,
      options: [{
          value: '选项1',
          label: '周考1'
        }, {
          value: '选项2',
          label: '周考2'
        }, {
          value: '选项3',
          label: '周考2'
        }, {
          value: '选项4',
          label: '月考'
        }],
        value: '',
        options2: [{
          value: '选项1',
          label: 'javaScript上'
        }, {
          value: '选项2',
          label: 'javaScript下'
        }, {
          value: '选项3',
          label: '模块化开发'
        }, {
          value: '选项4',
          label: 'node基础'
        },{
          value: '选项5',
          label: '组件化开发(vue)'
        },{
          value: '选项6',
          label: '渐进式开发(react)'
        },{
          value: '选项7',
          label: '项目实战'
        },{
          value: '选项8',
          label: 'javaScript高级'
        },{
          value: '选项9',
          label: 'node高级'
        }],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "3" }, { value: "1" }];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.box {
  background: #f0f2f5;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0px 24px 24px;
}
.con {
  margin: 0 0 24px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
/deep/ .el-input__inner {
  width: 262px;
  height: 32px;
  padding: 0;
}
/deep/ .el-input, /deep/ .el-select {
  width: 262px;
  height: 32px;
  padding: 0;
  border-radius: 4px;
}
.el-select{
  display: block;
}
/deep/ .ipt{
  width:88px;
  height: 30px;
}
/deep/ .el-input-number__increase,/deep/ .el-input-number__decrease{
  width: 21px;
  height: 15px;
}
</style>