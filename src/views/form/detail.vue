<template>
  <div class="box">
    <div v-for="(item,index) in data.data.questions" :key="index">
      <p>{{item.title}}</p>
      <div class="con">
        {{item.questions_stem}}
      </div>
      <div>
        {{item.questions_answer}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  },
  updated() {
      console.log(this.data.data.questions)
  },
};
</script>

<style lang="scss" scoped>
/deep/ .app-main{
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #ccc!important;
    }
.box{
  width:681px;
  height: 1983px;
     background: rgb(255, 255, 255);
    padding: 24px;
    margin: 0px 20px 20px 0px;
    border-radius: 10px;
}
.con{
  width:553px;
  height: 922px;
  text-align: left;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
}
</style>