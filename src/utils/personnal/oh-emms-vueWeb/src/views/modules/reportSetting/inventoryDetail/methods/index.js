const methods = {
  initReport() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "reportServer" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    let reportlet = "stock/emmsStockSummary.cpt";
    let reporturl =
      this.$api[btns.postUrl] +
      `${window.location.host}/${this.$global.projectName}`;
    reporturl += "&reportlet=/" + reportlet;
    // 组织机构
    if (formData.storeOrgId && formData.storeOrgId.length > 0) {
      let orgid =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
      reporturl += "&orgid=" + orgid;
    }
    // 仓房
    if (formData.storepointId) {
      reporturl += "&storepointId=" + formData.storepointId;
    }
    // 货位
    if (formData.storehouseId) {
      reporturl += "&storepointId=" + formData.storepointId;
    }
    // 批次号
    if (formData.batchNo) {
      reporturl += "&batchNo=" + formData.batchNo;
    }
    // 入库年份
    if (formData.inYear) {
      reporturl += "&inYear=" + formData.inYear;
    }
    // 编码
    if (formData.code) {
      reporturl += "&code=" + formData.code;
    }
    // 是否可回收物资
    if (formData.isRecycled) {
      reporturl += "&isRecycled=" + formData.isRecycled;
    }
    // 物资名称
    if (formData.emmsBasMaterialName) {
      reporturl += "&emmsBasMaterialName=" + formData.emmsBasMaterialName;
    }
    this.url = reporturl;
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 搜索和表单 组织切换共用方法
    if (linkName === "changeOrg") {
      if (data && data.length) {
        this.getStorePointList(data[data.length - 1]).then(res => {
          let list = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
          this.setGroupFormValue(this.searchFormItems, "storepointId", list);
        });
      } else {
        this.setGroupFormValue(this.searchFormItems, "storepointId", []);
      }
    }
    // 搜索和表单 切换库点共用方法
    if (linkName === "changeStorePoint") {
      if (data) {
        this.getStoreHouseList(data).then(res => {
          this.setGroupFormValue(this.searchFormItems, "storehouseId", res);
        });
      } else {
        this.setGroupFormValue(this.searchFormItems, "storehouseId", []);
      }
    }
  },
  // 赋值
  setGroupFormValue(array, name, data) {
    array.forEach(item => {
      if (item.name === name) {
        item.data = data;
      }
    });
  },
  /**
   * 获取库点
   */
  getStorePointList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStorePointList_common, {
        orgid: id,
        districtFlag: false
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
        reslove(data);
      });
    });
  },
  /**
   * 获取仓房
   */
  getStoreHouseList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.dictList_common, {
        _refKey: "storehouse",
        status: "1",
        spId: id
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        reslove(data);
      });
    });
  }
};
export default methods;
