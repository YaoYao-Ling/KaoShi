<template>
  <div class="box">
    <h2>添加考试</h2>
    <div class="con">
      <div class="name">
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
        <p>
          <span>*</span>
          <span>选择考试类型:</span>
        </p>
        <el-select v-model="val1" placeholder=" ">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>选择课题:</span>
        </p>
        <el-select v-model="val2" placeholder=" ">
          <el-option
            v-for="(item, index) in options2"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>
          <span>*</span>
          <span>设置题量</span>
        </p>
        <el-input-number ref="ipt" v-model="num" controls-position="right" :min="1" :max="10"></el-input-number>
      </div>
      <div class="time">
        <p>考试时间</p>
        <div class="time_con">
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="开始时间"></el-date-picker>
          </div>
          <span style="margin-right:10px;margin-top:3px;">-</span>
          <div class="block">
            <el-date-picker v-model="value2" type="date" placeholder="结束时间"></el-date-picker>
          </div>
        </div>
      </div>
      <el-button type="primary" plain @click="btn">创建考试</el-button>
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
      val1: "",
      val2: "",
      options: [
        {
          value: "周考1",
          label: "周考1"
        },
        {
          value: "周考2",
          label: "周考2"
        },
        {
          value: "周考2",
          label: "周考2"
        },
        {
          value: "月考",
          label: "月考"
        }
      ],
      options2: [
        {
          value: "选项1",
          label: "javaScript上"
        },
        {
          value: "选项2",
          label: "javaScript下"
        },
        {
          value: "选项3",
          label: "模块化开发"
        },
        {
          value: "选项4",
          label: "node基础"
        },
        {
          value: "选项5",
          label: "组件化开发(vue)"
        },
        {
          value: "选项6",
          label: "渐进式开发(react)"
        },
        {
          value: "选项7",
          label: "项目实战"
        },
        {
          value: "选项8",
          label: "javaScript高级"
        },
        {
          value: "选项9",
          label: "node高级"
        }
      ],

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
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
    },
    btn() {
     let  cs = {
        subject_id: this.state,
          exam_id: this.val1,
          title: this.val2,
          number: this.num,
          start_time: this.value1*1,
          end_time: this.value2*1
      }
      localStorage.setItem('cs',JSON.stringify(cs))
      this.$router.push("/form/added");
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.$refs.ipt.$refs.input.$refs.input.style.width = "100px";
    this.$refs.ipt.$refs.input.$refs.input.style.borderRadius = "0px";
  }
  
};
</script>

<style lang="scss" scoped>
/deep/ .is-controls-right {
  width: 100px;
}
/deep/ .ipt {
  width: 100px;
}
* {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
h2 {
  padding: 20px 0px;
  margin-top: 10px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 21px;
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
  margin-top: 10px;
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
/deep/ .el-select {
  width: 120px;
  height: 32px;
  border-radius: 2px;
}
/deep/ .el-input__inner {
  width: 120px;
  height: 32px;
  padding: 0;
  text-indent: 1em;
}
.name /deep/ .el-input__inner:nth-child(1) {
  width: 435px;
}
.time /deep/ .el-input__inner:nth-child(1) {
  width: 205px;
}
.el-select {
  display: block;
}
/deep/ .el-input-number__increase,
/deep/ .el-input-number__decrease {
  width: 21px;
  height: 15px !important;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.45);
  background: #fff;
}
/deep/ .el-input-number__increase {
  margin-top: 3px;
}
/deep/ .el-input-number__decrease {
  margin-bottom: 3px;
}
.time_con {
  display: flex;
  flex-direction: row;
}
.time /deep/ .el-input__prefix {
  width: 30px;
  margin-left: 170px;
}
button {
  width: 136px;
  height: 32px;
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  padding: 0 40px !important;
  border-radius: 4px !important;
  border: 0 !important;
  font-size: 14px !important;
  color: #fff !important;
  margin-top: 35px;
  margin-bottom: 25px;
}
p {
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 14px;
}
p span:nth-child(1) {
  color: red;
  margin-right: 5px;
}
</style>