<template>
  <div class="home bgfff manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <div v-if="equipmentList.length > 0">
      <mt-cell
        v-for="equipment in equipmentList"
        :key="equipment.ctrlId"
        :title="equipment.ctrlName"
        is-link
        :value="equipment.testSatus"
        @click.native="handleRouterTo(equipment)"
      >
      </mt-cell>
    </div>
    <div v-else>
      <mt-cell title="还没有添加测试分机！"></mt-cell>
    </div>
    <div class="mt10">
      <div class="largeBtnContainer">
        <mt-button size="large" type="primary" @click.native="handleAddEqp">
          添加分机
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 顶部操作栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "测试分机",
        routePath: this.$store.getters.userInfo.hasonlyOnePoint
          ? "backToApp"
          : "choseStorePoint"
        // rightIcon: "tianjia"
      },
      // 已选的添加的分机类型
      testType: "testEquipment",
      // 已添加的分机列表
      equipmentList: [],
      // 添加分机的路径
      addpath: "addEquipment"
    };
  },
  methods: {
    // 添加分机按钮
    handleAddEqp() {
      this.$router.push({
        path: "selectEqumentType"
      });
    },
    // 点击分机列表，跳转分机内容
    handleRouterTo(equipment) {
      this.$store.dispatch("setTestEquipmentType", equipment.controllerType);
      let routeObj = {
        path: this.$store.getters.equipTypeToPath[equipment.controllerType],
        query: {
          eqpId: equipment.ctrlId,
          testType: equipment.controllerType
        }
      };
      this.$router.push(routeObj);
    },
    // 获取当前已保存的分机列表
    getExtensionList() {
      let storePointId = this.$store.getters.userInfo.storePointId,
        getStorepointInternal = null,
        that = this;
      if (!storePointId) {
        getStorepointInternal = setInterval(() => {
          storePointId = this.$store.getters.userInfo.storePointId;
          if (storePointId) {
            clearInterval(getStorepointInternal);
            getdata();
          }
        }, 50);
      } else {
        getdata();
      }
      function getdata() {
        that
          .$postData(that.$api.getControllerList, {
            storePointId: storePointId
          })
          .then(xhr => {
            xhr.data.map(item => {
              switch (item.ctrlState) {
                case "successed":
                  item.testSatus = "成功";
                  break;
                case "notDetected":
                  item.testSatus = "未测试";
                  break;
                case "failed":
                  item.testSatus = "失败";
                  break;
                default:
                  item.testSatus = "已测试" + item.ctrlState + "项";
              }
            });
            that.equipmentList = xhr.data;
          });
      }
    }
  },
  mounted() {
    this.getExtensionList();
  }
};
</script>
