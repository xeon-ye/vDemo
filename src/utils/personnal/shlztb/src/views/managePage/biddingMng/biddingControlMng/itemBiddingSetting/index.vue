<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-col class="mb20" :span="24">
            <formGroup
              :formGroupSettings="formGroupSettings"
              @formGroupSubmit="handleSearchSubmit"
            />
          </el-col>
          <el-col class="mb20" :span="24">
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
            <el-col :span="18">
              <operateButtonsGroup
                class="textAlignRight"
                :operateButtonsSettings="operateButtonsSettings"
                @handleOperateButton="handleOperateButton"
              />
            </el-col>
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
            @handleTableItem="handleTableItem"
          />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/itemBiddingSetting/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/itemBiddingSetting/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/itemBiddingSetting/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/itemBiddingSetting/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/itemBiddingSetting/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/itemBiddingSetting/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/itemBiddingSetting/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/itemBiddingSetting/dialogViewFormItems.json";
import dialogFormRules from "@/utils/formRulesJson/itemBiddingSetting/dialogRule";
export default {
  name: "itemBiddingSetting",
  components: {
    commonTitleWithBorder,
    formGroup,
    operateButtonsGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "标的设置列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
      },
      /**
       * table 表格配置
       * @param {params} tableDatas table表格数据列表
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       **/
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      },
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {
        filterRules: []
      },
      filterRules: [],
      page: 1,
      /**
       * clientlist 委托单位列表
       */
      clientlist: []
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      let that = this;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "新增标的设置信息";
      that.dialogFormSettings.dialogFormItems.formGroupValues = {
        detailListStr: [
          {
            detailCode: "",
            detailName: "",
            sortSeq: ""
          }
        ]
      };
      dialogEditFormItemslist.map(editItem => {
        if (editItem.name == "sysCode") {
          editItem.disabled = false;
        }
      });
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this,
        dialogData;
      that.tablelistSettings.tableDatas.map(itemdata => {
        if (itemdata.sysCode == id) {
          dialogData = JSON.parse(JSON.stringify(itemdata));
        }
      });
      dialogData.detailListStr = dialogData.detailList;
      that.dialogFormSettings.dialogFormTitle = "查看标的设置信息";
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
      that.dialogFormSettings.dialogFormItems.formButtonList = [];
      that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      // that.tablelistSettings.tableDatas.map(tabledata => {
      //   if (tabledata.sysCode == id) {
      //     that.dialogFormSettings.dialogFormTitle = "查看标的设置信息";
      //     that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
      //     that.dialogFormSettings.dialogFormItems.formButtonList = [];
      //     that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
      //     that.dialogFormSettings.dialogFormVisible = true;
      //     that.dialogFormSettings.dialogType = "form";
      //   }
      // });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysCode == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(editItem => {
          if (editItem.name == "sysCode") {
            editItem.disabled = true;
          }
        });
        dialogData.detailListStr = dialogData.detailList;
        that.dialogFormSettings.dialogFormTitle = "编辑标的设置信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            sysCode: id
          };
          that.$http(that.$api.removeBidTargetSetting(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.getDataList();
            }
          });
        });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, data) {
      dialogEditFormItemslist.map(item => {
        if (item.name == link) {
          item.hideItem = data == "10" ? false : true;
        }
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (data.detailList) {
        delete data.detailList;
      }
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: this.page,
          rows: that.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getBidTargetSettingList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getBidTargetSettingList", postdata).then(xhr => {
            that.$dealData(that, xhr, "sysCode", null, []);
          });
        } else {
          that.$dealData(that, data, "sysCode", null, []);
        }
      });
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>
