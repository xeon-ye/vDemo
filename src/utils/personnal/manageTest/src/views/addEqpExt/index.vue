<template>
  <div class="manage">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderRightFnc="handleMyheaderRightFnc"
    />
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mt-field
        label="设备名"
        placeholder="请输入设备名"
        v-model="formdata.eqpName"
      ></mt-field>
    </div>
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mySelect
        :mySelectOption="eqpTpyeOptionSettings"
        @myselectChange="handleGetEqpTpyeValue"
      />
    </div>
    <div class="positionRel" v-for="field in fieldlist" :key="field.key">
      <span
        v-if="field.required"
        class="positionAbs text-danger symbolRequired"
      >
        *
      </span>
      <mt-field
        :label="field.label"
        :placeholder="'请输入' + field.label + '值'"
        v-model="formdata[field.key]"
      ></mt-field>
    </div>
    <div
      class="largeBtnContainer mb10 mt10"
      v-if="this.$store.getters.mainTestInfo.testEqpId"
    >
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('update')"
      >
        保存
      </mt-button>
    </div>
    <div class="largeBtnContainer mb10" v-else>
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('save')"
      >
        保存
      </mt-button>
    </div>
    <div class="largeBtnContainer">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('tank')"
      >
        柜控测试
      </mt-button>
    </div>
    <div class="largeBtnContainer mt10">
      <mt-button
        size="large"
        type="primary"
        :disabled="remoteTestDisabled"
        @click.native="handleSaveEqpInfo('program')"
      >
        程控测试
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addEqpExt",
  components: {
    myheader: () => import("@/components/myheader"),
    mySelect: () => import("@/components/mySelect")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "添加测试设备",
        routePath: "equipmentList",
        rightIcon:
          this.$store.getters.mainTestInfo.testType == "testGas"
            ? "icontianjia"
            : ""
      },
      eqpTpyeOptionSettings: {
        cellTitle: "设备类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.eqpTpyeDatas[
              this.$store.getters.mainTestInfo.testType
            ],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      formdata: {
        eqpName: "",
        eqpTpye: "",
        eqpTpye_dsc: ""
      },
      remoteTestDisabled: !this.$store.getters.plcCanTestProgram,
      deviceId: this.$store.getters.mainTestInfo.testEqpId
        ? this.$store.getters.mainTestInfo.testEqpId
        : ""
    };
  },
  methods: {
    /**
     * 点击header右侧按钮
     */
    handleMyheaderRightFnc() {
      if (this.$store.getters.mainTestInfo.testType == "testGas") {
        this.$router.push({
          path: "addGasPoint"
        });
      } else {
        return false;
      }
    },
    handleGetEqpTpyeValue(val) {
      let that = this;
      that.$nextTick(function() {
        that.eqpTpyeOptionSettings.slots[0].values.forEach((e, i) => {
          if (e.value == that.formdata.eqpTpye) {
            that.eqpTpyeOptionSettings.slots[0].defaultIndex = i; // that.slots[0].defaultIndex设置picker的初始值
          }
        });
      });
      this.formdata.eqpTpye = val[0].value;
      this.formdata.eqpTpye_dsc = val[0].label;
      this.eqpTpyeOptionSettings.cellValue = val[0].label + "▼";
    },
    handleSaveEqpInfo(type) {
      let _this = this,
        reg = /^\d+$/;
      if (!this.formdata.eqpName || !this.formdata.eqpTpye) {
        this.$messagebox.alert("请完善必填项", "提示");
        return false;
      }
      for (let item of this.fieldlist) {
        if (!this.formdata[item.key] && item.required) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
        if (this.formdata[item.key] && !reg.test(this.formdata[item.key])) {
          this.$messagebox.alert("寄存器相关信息只能填写数字", "提示");
          return false;
        }
      }
      let obj = JSON.parse(JSON.stringify(this.formdata));
      let newobj = {
        storePointId: this.$store.getters.userInfo.storePointId,
        deviceName: this.formdata.eqpName,
        deviceType: this.formdata.eqpTpye,
        controllerId: this.formdata.id || "",
        controllerType: this.$store.getters.mainTestInfo.testType,
        deviceParameter: JSON.stringify(obj)
      };

      let postUrl = "",
        postData = {};
      if (!this.$store.getters.mainTestInfo.testEqpId) {
        postUrl = _this.$api.saveDeviceConfig;
        postData = newobj;
        postData.controllerType = this.$store.getters.mainTestInfo.testType;
      } else {
        postUrl = _this.$api.updateDeviceConfig;
        postData.testDeviceDto = newobj;
        postData.deviceId = _this.$store.getters.mainTestInfo.testEqpId;
      }
      _this.$postData(postUrl, postData).then(xhr => {
        if (xhr && xhr.data && xhr.data > 0) {
          if (type === "save" || type === "update") {
            this.$router.push({
              path: "equipmentList"
            });
          } else {
            if (!this.$store.getters.mainTestInfo.testEqpId) {
              this.$store.dispatch("setMainTestInfo", {
                key: "testEqpId",
                value: xhr.data
              });
            }
            this.$store.dispatch("setMainTestInfo", {
              key: "controlType",
              value: type
            });
            this.$router.push({
              path: "selectTest"
            });
          }
        }
      });
    },
    getDeviceConfig(testEqpId) {
      let _this = this;
      _this
        .$postData(_this.$api.getDeviceConfig, { deviceId: testEqpId })
        .then(xhr => {
          if (xhr && xhr.data) {
            _this.deviceId = xhr.data.deviceId;
            _this.formdata = JSON.parse(xhr.data.testDeviceDto.deviceParameter);
            _this.eqpTpyeOptionSettings.slots[0].values.forEach((e, i) => {
              if (e.value == _this.formdata.eqpTpye) {
                _this.eqpTpyeOptionSettings.slots[0].defaultIndex = i;
              }
            });
          }
        });
    }
  },
  mounted() {
    this.$data.formdata.id = this.$store.getters.mainTestInfo.eqpId;
    if (this.$store.getters.mainTestInfo.testEqpId) {
      this.headerOptionSettings.title = "修改测试设备";
      this.getDeviceConfig(this.$store.getters.mainTestInfo.testEqpId);
    }
  },
  computed: {
    fieldlist() {
      let flist = [];
      this.$store.getters.registers.map(item => {
        if (item.type == this.formdata.eqpTpye) {
          flist = [...item.formgroup];
        }
      });
      return flist;
    }
  }
};
</script>
