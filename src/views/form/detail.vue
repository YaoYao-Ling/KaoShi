<template>
  <div class="big">
    <h2>试卷详情</h2>
    <div class="box">
      <div v-for="(item,index) in data.data.questions" :key="index">
        <div class="con" style="lineHeight:30px">
          <p>{{item.title}}</p>
          <div>{{item.questions_stem}}</div>
          <div class="aners" v-if="item.questions_answer">{{item.questions_answer}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      data: state => state.detail.one
    })
  },
  mounted() {
    this.getbj();
  },
  methods: {
    ...mapActions({
      getbj: "detail/detailFunc"
    })
  }
};
</script>

<style lang="scss" scoped>
.big {
  overflow: hidden;
  background: #f0f2f5;
  h2 {
    padding: 20px 0px;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0.5em;
    font-weight: 500;
    font-size: 21px;
    margin-left: 30px;
  }
}
.box {
  width: 681px;
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 20px 20px 0px;
  border-radius: 10px;
  margin-left: 30px;
}
.con {
  width: 553px;
    text-align: left;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
}
.aners{
  
  background: #F6F6F6;
  margin-top: 20px;
}
</style>