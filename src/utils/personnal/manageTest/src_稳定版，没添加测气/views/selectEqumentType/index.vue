<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-cell
      v-for="type in testTypeList"
      :key="type.testEquipment"
      :title="type.label"
      @click.native="handleRouterTo(type)"
      is-link
    >
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: "selectEqumentType",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 分机类型列表
      testTypeList: this.$store.getters.testTypeDatas,
      // 顶部操作栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "选择分机类型",
        routePath: "home"
      }
    };
  },
  methods: {
    // 项目点击事件，测试流程点击跳转
    handleRouterTo(processObj) {
      this.$router.push({
        path: processObj.routepathName,
        query: { testType: processObj.value }
      });
    }
  }
};
</script>
