<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24" v-if="$route.params.parentSysId">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('biddingProjectMng')"
        >
          <i class="el-icon-arrow-left"></i>
          返回专场管理页面
        </el-link>
      </el-col>
      <!-- <a href="/oh-shlztb/_view/common/util/officeView" target="_blank">test</a> -->
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
import { getToken } from "@/utils/auth";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/dealInfoCommon/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/dealInfoCommon/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/dealInfoCommon/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/dealInfoCommon/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/dealInfoCommon/dialogFormItems.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/dealInfoCommon/dialogCheckFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/dealInfoCommon/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/dealInfoCommon/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/dealInfoCommon/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/dealAnnouncement/dialogRule";

export default {
  name: "dealAnnouncement",
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
        tableTitle: "交易公告列表"
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
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          // ref: "multipleTable",
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          // defaultExpandAll: true,
          // treeProps: {
          //   children: "children",
          //   hasChildren: "hasChildren"
          // },
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
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupTypeUpload: "true",
          formGroupTypeUploadName: "newsFiles",
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
      filterRules: [
        {
          field: "type",
          value: "07",
          op: "equal"
        }
      ],
      page: 1,
      pageType: this.$route.params.gptype
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        pageName: "page",
        searchObjName: "searchInfo",
        searchObjArrName: "filterRules",
        defaultSearchArrName: "filterRules",
        containByNames: ["title"],
        searchKey: "field",
        searchValue: "value",
        searchSymbol: "op",
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton(data) {
      if (data.parentSysId) {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          projectId: data.parentSysId
        };
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      }
      let that = this;
      this.dialogFormSettings.dialogFormItems.formGroupValues.type = "07";
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "新增交易公告";
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看交易公告";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "checkflow") {
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogFormTitle = "流程图查看";
        that.dialogFormSettings.dialogType = "image";
        that.dialogFormSettings.imgSrc =
          that.$global.flowPicUrl +
          "?processInstanceId=" +
          id +
          "&_jwt=" +
          getToken() +
          "&t=" +
          new Date().getTime();
      } else if (type == "edit" || type == "adjustNews") {
        if (id instanceof Object) {
          postdata = {
            sysId: id.sysId
          };
        } else {
          postdata = {
            sysId: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == postdata.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        // dialogData = that.getDataItemDetail(postdata.sysId);
        that.dialogFormSettings.dialogFormTitle = "编辑交易公告";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        if (
          type == "adjustNews" &&
          dialogData.userActiveTasks &&
          dialogData.userActiveTasks.length > 0
        ) {
          dialogData.userActiveTasks.map(task => {
            that.dialogFormSettings.dialogFormTitle = task.name;
            dialogData.taskId = task.id;
            if (task.userTaskActions && task.userTaskActions.length > 0) {
              task.userTaskActions.map(taskAction => {
                taskAction.flag = taskAction.value;
                taskAction.label = taskAction.text;
                taskAction.needAction = true;
                taskAction.styleType = "primary";
                taskAction.postUrl = "flowTradeInformation";
              });
              that.dialogFormSettings.dialogFormItems.formButtonList =
                task.userTaskActions;
            }
          });
          delete dialogData.userActiveTasks;
          delete dialogData.processStatus;
        }
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
            sysId: id
          };
          that.$http(that.$api.removeTradeInformation(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
            }
          });
        });
      } else if (type == "approve") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        if (
          dialogData.userActiveTasks &&
          dialogData.userActiveTasks.length > 0
        ) {
          dialogData.userActiveTasks.map(task => {
            that.dialogFormSettings.dialogFormTitle = task.name;
            dialogData.taskId = task.id;
            if (task.formKey == "approve") {
              if (task.userTaskActions && task.userTaskActions.length > 0) {
                task.userTaskActions.map(taskAction => {
                  taskAction.flag = taskAction.value;
                  taskAction.label = taskAction.text;
                  taskAction.needAction = true;
                  taskAction.styleType = "primary";
                  taskAction.postUrl = "flowTradeInformation";
                });
                that.dialogFormSettings.dialogFormItems.formButtonList =
                  task.userTaskActions;
              }
              that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
            }
          });
          delete dialogData.userActiveTasks;
          if (dialogData.processStatus) {
            delete dialogData.processStatus;
          }
        }
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
      } else {
        that
          .$http(that.$api.flowBidConsoleItem(that.pageType), id)
          .then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.getDataList(that.searchInfo);
            }
          });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        isneedAction: "needAction",
        btnFlag: "flag",
        btnPostUrl: "postUrl",
        actionName: "userAction",
        dialogFormSettingName: "dialogFormSettings",
        dialogFormVisibleParamName: "dialogFormVisible",
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取列表数据信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        },
        searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("tradeInformationList", postdata).then(data => {
        let formatdata = [
          {
            formated: "extd1",
            formatFnc: "dateStampFormat",
            needformat: "extd1"
          }
        ];
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("tradeInformationList", postdata).then(xhr => {
            that.$dealData(that, xhr, null, null, formatdata).then(() => {
              that.dealTableData();
            });
          });
        } else {
          that.$dealData(that, data, null, null, formatdata).then(() => {
            that.dealTableData();
          });
        }
      });
    },
    dealTableData() {
      if (this.tablelistSettings.tableDatas.length < 1) return;
      this.tablelistSettings.tableDatas.map(tableItem => {
        if (tableItem.files) {
          tableItem.viewfiles = this.$globalFnc.fileFormat(
            tableItem.files,
            "officeViewUrl"
          );
          delete tableItem.files;
        }
      });
    },
    getDataItemDetail(id) {
      let postdata = { sysId: id };
      this.$getData("tradeInformationDetail", postdata).then(xhr => {
        return xhr.data;
      });
    }
  },
  mounted() {
    let that = this;
    if (that.$route.params.parentSysId) {
      that.handleOperateButton(that.$route.params);
    }
    that.handleSearchSubmit();
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "web_portal_infostatus"
      })
      .then(data => {
        let statuslist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "status") {
            item.data = statuslist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "project",
        _noCache: "true"
      })
      .then(data => {
        let projectlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "projectId") {
            item.data = projectlist;
          }
        });
        dialogCheckFormItemslist.map(item => {
          if (item.name == "projectId") {
            item.data = projectlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "projectId") {
            item.data = projectlist;
          }
        });
      });
  }
};
</script>
