<template>
  <el-dialog
    :title="dialogFormSettings.dialogFormTitle"
    :visible.sync="dialogFormSettings.dialogFormVisible"
    :close-on-click-modal="false"
    append-to-body
    :destroy-on-close="true"
    :width="dialogFormSettings.width ? dialogFormSettings.width : '900px'"
  >
    <!-- @opened="closeDialog" -->
    <formGroup
      ref="formgroup"
      v-if="
        !dialogFormSettings.dialogType ||
          dialogFormSettings.dialogType == 'form'
      "
      :formGroupSettings="dialogFormSettings.dialogFormItems"
      @formGroupSubmit="handleButtonSubmit"
      @linkSelect="handleSelectChange"
      @inlineFncs="inlineFncs"
    />
    <img
      v-if="dialogFormSettings.dialogType == 'image'"
      :src="dialogFormSettings.imgSrc"
      width="100%"
      alt=""
    />
  </el-dialog>
</template>
<script>
export default {
  name: "dialogForm",
  props: {
    dialogFormSettings: Object
  },
  methods: {
    inlineFncs(flag) {
      this.$emit("inlineFncs", flag);
    },
    handleSelectChange(link, data) {
      this.$emit("linkSelect", link, data);
    },
    handleButtonSubmit(btn, data, postDatas) {
      this.$emit("handleDialogForm", btn, data, postDatas);
    },
    closeDialog() {
      // if (
      //   this.$refs &&
      //   this.$refs.formgroup &&
      //   this.$refs.formgroup.$refs &&
      //   this.$refs.formgroup.$refs.formItems
      // ) {
      //   this.$refs.formgroup.$refs.formItems.clearValidate();
      // }
      // this.$refs.formgroup.$refs.formItems.resetFields();
      // console.log(this.$refs.formgroup.$refs.formItems);
    }
  },
  mounted() {
    if (
      !this.dialogFormSettings.dialogType ||
      this.dialogFormSettings.dialogType == "form"
    ) {
      this.dialogFormSettings.dialogFormItems.fullScreen = true;
    }
  }
};
</script>
