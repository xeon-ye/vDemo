<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <div class="bgfff">
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mt-field
          label="分机名"
          placeholder="请输入分机名"
          v-model="formdata.controllerName"
        >
        </mt-field>
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mySelect
          :mySelectOption="connectTpyeOptionSettings"
          @myselectChange="handleGetConnectTpyeValue"
        />
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mySelect
          v-show="formdata.connectionType !== 'tcp'"
          :mySelectOption="serialPortOptionSettings"
          @myselectChange="handleGetSerialPortValue"
        />
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mt-field
          v-show="formdata.connectionType == 'tcp'"
          label="IP地址"
          placeholder="请输入分机地址"
          v-model="formdata.host"
        ></mt-field>
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mt-field
          v-show="formdata.connectionType == 'tcp'"
          label="端口"
          placeholder="请输入端口"
          v-model="formdata.port"
        ></mt-field>
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mySelect
          :mySelectOption="protocolOptionSettings"
          @myselectChange="handleGetProtocolValue"
        />
      </div>
      <div
        class="positionRel"
        v-for="param in paramlist"
        :key="param.paramName"
      >
        <span
          v-if="param.paramRequired == 'true'"
          class="positionAbs text-danger symbolRequired"
        >
          *
        </span>
        <mt-field
          :label="param.paramDesc"
          placeholder="请输入"
          v-model="formdata.protocolParameter[param.paramName]"
          @focus.native.capture="handleCommentFocus"
        ></mt-field>
      </div>
      <template
        v-if="$store.getters.mainTestInfo.testType == 'testTemperature'"
      >
        <div class="positionRel">
          <span class="positionAbs text-danger symbolRequired">*</span>
          <mt-field
            label="线缆数量"
            placeholder="请输入线缆数量"
            v-model="formdata.customParameters.lineNumbers"
          >
          </mt-field>
        </div>
        <div class="positionRel">
          <span class="positionAbs text-danger symbolRequired">*</span>
          <mt-field
            label="每根线缆点位数量"
            placeholder="请输入线缆数量"
            v-model="formdata.customParameters.pointNumPerLine"
          >
          </mt-field>
        </div>
        <div class="positionRel">
          <span class="positionAbs text-danger symbolRequired">*</span>
          <mt-field
            label="起始线缆号"
            placeholder="请输入起始线缆号"
            v-model="formdata.customParameters.startLineNo"
          >
          </mt-field>
        </div>
        <mt-field
          label="仓温仓湿1线缆号（选填）"
          placeholder="请输入线缆号"
          v-model="formdata.customParameters.temHumlineNo1"
        >
        </mt-field>
        <mt-field
          label="仓温仓湿2线缆号（选填）"
          placeholder="请输入线缆号"
          v-model="formdata.customParameters.temHumlineNo2"
        >
        </mt-field>
      </template>
    </div>
    <div class="largeBtnContainer mt10 mb10">
      <mt-button
        size="large"
        type="primary"
        :disabled="!saveCannotClick"
        @click.native="handleSaveEqpInfo('save')"
      >
        保存并返回
      </mt-button>
    </div>
    <div class="largeBtnContainer">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('test')"
      >
        下一步
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addEquipment",
  components: {
    myheader: () => import("@/components/myheader"),
    mySelect: () => import("@/components/mySelect")
  },
  data() {
    return {
      // 保存按钮置灰
      saveCannotClick: false,
      // 数字类型项目列表
      numberTypeFormKey: [
        {
          key: "lineNumbers",
          formChildName: "customParameters",
          formName: "线缆数量"
        },
        {
          key: "pointNumPerLine",
          formChildName: "customParameters",
          formName: "每根线缆点位数量"
        },
        {
          key: "startLineNo",
          formChildName: "customParameters",
          formName: "起始线缆号"
        },
        {
          key: "temHumlineNo1",
          formChildName: "customParameters",
          formName: "仓温仓湿1线缆号"
        },
        {
          key: "temHumlineNo2",
          formChildName: "customParameters",
          formName: "仓温仓湿2线缆号"
        }
      ],
      // 必填项key值
      requiredFormKey: [
        {
          key: "controllerName",
          formName: "分机名"
        },
        {
          key: "connectionType",
          formName: "连接类型"
        },
        {
          key: "protocolType",
          formName: "协议类型"
        }
      ],
      // 显示串口
      showSerial: false,
      // 头部状态栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: this.$store.getters.mainTestInfo.eqpId
          ? "home"
          : "selectEqumentType"
      },
      // 连接类型下拉框配置数据
      connectTpyeOptionSettings: {
        cellTitle: "连接类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.connectTpyeDatas,
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 串口下拉框配置数据
      serialPortOptionSettings: {
        cellTitle: "串口",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.serialPortDatas,
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 协议类型下拉框配置数据
      protocolOptionSettings: {
        cellTitle: "协议类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.protocolDatas[
              this.$store.getters.mainTestInfo.testType
            ],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 页面表单数据
      formdata: {
        storePointId: this.$store.getters.userInfo.storePointId,
        controllerId: this.$store.getters.mainTestInfo.eqpId
          ? this.$store.getters.mainTestInfo.eqpId
          : "",
        channelParameter: "",
        testType: this.$store.getters.mainTestInfo.testEquipment,
        controllerName: "",
        connectionType: "tcp",
        connectTpye_dsc: "",
        serialPort: "",
        serialPort_dsc: "",
        host: "",
        port: "",
        protocolType: "",
        protocol_dsc: "",
        protocolParameter: {},
        customParameters: {},
        controllerType: this.$store.getters.mainTestInfo.testType
      },
      // 协议参数列表
      paramlist: [],
      // 控制器id
      controllerId: this.$store.getters.mainTestInfo.eqpId
        ? this.$store.getters.mainTestInfo.eqpId
        : "",
      protocolParams: null //保存ajax获取到的配置数据
    };
  },
  methods: {
    handleCommentFocus() {
      this.saveCannotClick = true;
    },
    // 连接类型下拉框事件绑定
    handleGetConnectTpyeValue(val) {
      let that = this;
      that.formdata.connectionType = val[0].value;
      that.connectTpyeOptionSettings.cellValue = val[0].label + "▼";
      that.formdata.connectTpye_dsc = val[0].label;
      that.formdata.serialPort = this.$store.getters.serialPortDatas[0].value;
    },
    // 协议类型下拉框事件绑定
    handleGetProtocolValue(val) {
      let that = this;
      setTimeout(() => {
        that.formdata.protocolType = val[0].value;
        that.protocolOptionSettings.cellValue = val[0].label + "▼";
        that.formdata.protocol_dsc = val[0].label;
        that.formdata.protocolParameter = {};
        that.paramlist =
          that.$store.getters.protocolParamsDatas[val[0].value].paramList;
        that.paramlist.map(param => {
          if (that.protocolParams && that.protocolParams[param.paramName]) {
            that.formdata.protocolParameter[param.paramName] =
              that.protocolParams[param.paramName];
          } else if (!that.formdata.protocolParameter[param.paramName]) {
            that.formdata.protocolParameter[param.paramName] = "";
          }
        });
      }, 100);
    },
    // 串口下拉框事件绑定
    handleGetSerialPortValue(val) {
      let that = this;
      that.formdata.serialPort = val[0].value;
      that.serialPortOptionSettings.cellValue = val[0].label + "▼";
      that.formdata.serialPort_dsc = val[0].label;
    },
    // 底部操作按钮事件绑定
    handleSaveEqpInfo(type) {
      let postUrl = "",
        postData = {},
        regNumber = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, // /^\d+$/,
        regIpv4 = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
      for (let prop in this.formdata.protocolParameter) {
        if (!this.formdata.protocolParameter[prop]) {
          delete this.formdata.protocolParameter[prop];
        }
      }
      for (let item of this.paramlist) {
        if (
          !this.formdata.protocolParameter[item.paramName] &&
          item.paramRequired == "true"
        ) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      }
      for (let reqItem of this.requiredFormKey) {
        if (!this.formdata[reqItem.key]) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      }
      this.formdata.controllerType = this.$store.getters.mainTestInfo.testType;
      if (this.formdata.connectionType == "serial") {
        this.formdata.host = "localhost";
        this.formdata.port = this.formdata.serialPort;
        if (!this.formdata.port) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      } else {
        if (!this.formdata.port || !this.formdata.host) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
        if (!regNumber.test(this.formdata.port)) {
          this.$messagebox.alert("端口号只能填写数字", "提示");
          return false;
        }
        if (!regIpv4.test(this.formdata.host)) {
          this.$messagebox.alert("IP地址格式校验不通过", "提示");
          return false;
        }
      }
      if (!this.$store.getters.mainTestInfo.eqpId) {
        postUrl = this.$api.saveControllerConfig;
        postData = this.formdata;
      } else {
        postUrl = this.$api.updateControllerConfig;
        postData.controllerId = this.$store.getters.mainTestInfo.eqpId;
        postData.testControllerDto = this.formdata;
      }
      this.$postData(postUrl, postData).then(xhr => {
        if (type == "save") {
          this.$router.push("home");
        } else {
          if (!this.$store.getters.mainTestInfo.eqpId) {
            this.$store.dispatch("setMainTestInfo", {
              key: "eqpId",
              value: xhr.data
            });
          }
          this.$router.push({
            path: "equipmentList"
          });
        }
      });
    },
    // 根据分机id获取分机信息
    getControllerConfig() {
      this.$postData(this.$api.getControllerConfig, {
        controllerId: this.$store.getters.mainTestInfo.eqpId,
        storePointId: this.$store.getters.userInfo.storePointId
      }).then(xhr => {
        xhr.data.controllerId = this.$store.getters.mainTestInfo.eqpId
          ? this.$store.getters.mainTestInfo.eqpId
          : "";
        xhr.data.channelParameter = "";
        this.protocolParams = xhr.data.testControllerDto.protocolParameter;
        this.formdata = xhr.data.testControllerDto;
        this.controllerId = xhr.data.controllerId;
        if (this.formdata.connectionType === "serial") {
          this.formdata.serialPort = this.formdata.port;
          this.formdata.port = "";
        }
        for (
          let i = 0;
          i < this.connectTpyeOptionSettings.slots[0].values.length;
          i++
        ) {
          if (
            this.connectTpyeOptionSettings.slots[0].values[i].value ==
            this.formdata.connectionType
          ) {
            this.connectTpyeOptionSettings.slots[0].defaultIndex = i;
            break;
          }
        }
        for (
          let i = 0;
          i < this.serialPortOptionSettings.slots[0].values.length;
          i++
        ) {
          if (
            this.serialPortOptionSettings.slots[0].values[i].value ==
            this.formdata.serialPort
          ) {
            this.serialPortOptionSettings.slots[0].defaultIndex = i;
            break;
          }
        }
        for (
          let i = 0;
          i < this.protocolOptionSettings.slots[0].values.length;
          i++
        ) {
          if (
            this.protocolOptionSettings.slots[0].values[i].value ==
            this.formdata.protocolType
          ) {
            this.protocolOptionSettings.slots[0].defaultIndex = i;
            break;
          }
        }
        setTimeout(() => {
          this.saveCannotClick = false;
        }, 500);
      });
    }
  },
  watch: {
    /**
     * 深度监听当前页面是否经过编辑，编辑过可以点击，否则不让点击
     */
    formdata: {
      handler() {
        this.saveCannotClick = true;
      },
      deep: true
    }
  },
  mounted() {
    if (this.$store.getters.mainTestInfo.eqpId) {
      this.getControllerConfig();
    } else {
      setTimeout(() => {
        this.saveCannotClick = false;
      }, 500);
    }
  }
};
</script>
