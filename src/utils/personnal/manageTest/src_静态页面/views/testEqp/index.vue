<template>
  <div class="manage">
    <myheader :myheaderOption="headerOption" />
    <mt-field
      label="设备名"
      placeholder="请输入设备名"
      v-model="formdata.eqpName"
    ></mt-field>
    <mt-field
      label="状态寄存器地址"
      placeholder="请输入状态寄存器地址"
      v-model="formdata.statusRegister"
    ></mt-field>
    <mt-field
      label="控制寄存器地址"
      placeholder="请输入控制寄存器地址"
      v-model="formdata.controlRegister"
    ></mt-field>
    <div class="pl15 mt15 mb15">
      <mt-cell title="打开仓窗"></mt-cell>
      <ul class="pl10 text-info">
        <li>1.打开仓窗</li>
        <li>2.打开仓窗</li>
        <li>3.打开仓窗</li>
        <li>4.打开仓窗</li>
      </ul>
    </div>
    <div>
      <mt-checklist
        class="page-part"
        title="状态寄存器"
        v-model="value2"
        :options="options2"
      >
      </mt-checklist>
      <div>
        已获取到的状态值:
        <span v-for="status in value2" :key="status">
          {{ status }}
        </span>
      </div>
    </div>
    <div>
      <div class="largeBtnContainer mb10">
        <mt-button size="large" type="primary" @click.native="startTest">
          打开仓窗
        </mt-button>
      </div>
      <div class="largeBtnContainer">
        <mt-button size="large" type="primary" @click.native="stopTest">
          终止测试
        </mt-button>
        <mt-button size="large" type="primary" @click.native="affirm">
          动作已结束
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "testEqp",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      headerOption: {
        hideleft: false,
        title:
          this.$route.query.controlType == "tank" ? "柜控测试" : "程控测试",
        routePath: "selectTest"
      },
      value2: ["0", "1"],
      options2: [
        {
          label: "全关",
          value: "0",
          disabled: true
        },
        {
          label: "正开",
          value: "1",
          disabled: true
        },
        {
          label: "全开",
          value: "2",
          disabled: true
        }
      ],
      formdata: {
        eqpName: "",
        stateRegisterIp: "",
        controlRegisterIp: ""
      }
    };
  },
  methods: {
    startTest() {
      console.log(this.formdata, "save");
      this.$router.push("preTestEqp");
    },
    stopTest() {
      console.log(this.formdata, "test");
      this.$router.push("selectTest");
    },
    affirm() {
      console.log(this.formdata, "test");
      this.$router.push("testResult");
    }
  },
  mounted() {
    if (this.$route.query.testEqpId || this.$route.query.testEqpId == 0) {
      this.formdata = this.$store.getters.testInfo[this.$route.query.testEqpId];
    }
    console.log(this.formdata);
  }
};
</script>
