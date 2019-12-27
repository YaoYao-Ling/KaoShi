<template>
  <div class="app-container">
    <div class="top">
      <h3>添加用户</h3>
    </div>
    <div class="main">
      <!-- 添加用户 -->
      <li>
        <AddUser></AddUser>
      </li>
      <!-- 添加身份 -->
      <li>
        <AddIdentity></AddIdentity>
      </li>
      <!-- 添加api接口权限 -->
      <li>
        <AddApi></AddApi>
      </li>
      <!-- 添加试图接口权限 -->
      <li>
        <AddAttempt></AddAttempt>
      </li>
      <!-- 给身份设置api接口权限 -->
      <li>
        <SetApi></SetApi>
      </li>
      <!-- 给身份设置试图权限 -->
      <li>
        <SetAttempt></SetAttempt>
      </li>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addList } from "@/api/table";
import AddUser from "../../components/addUser/addUser";
import AddIdentity from '../../components/addUser/addIdentity';
import AddApi from '../../components/addUser/addApi';
import AddAttempt from '../../components/addUser/addAttempt';
import SetApi from '../../components/addUser/setApi';
import SetAttempt from '../../components/addUser/setAttempt'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  components: {
    AddUser,
    AddIdentity,
    AddApi,
    AddAttempt,
    SetApi,
    SetAttempt
  },
  created() {},
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
.app-container .top {
  width: 100%;
  height: 50px;
}
.app-container .top h3 {
  line-height: 50px;
  font-weight: normal;
}
.app-container .main {
  width: 100%;
  border: solid 1px #ccc;
  background: #f0f2f5;
  display: flex;
  flex-wrap: wrap;
}
.app-container .main li {
  width: 33.3%;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}


</style>
