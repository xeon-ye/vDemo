<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24" v-if="$store.getters.userInfo.type == '1'">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('memberCreditlist')"
        >
          <i class="el-icon-arrow-left"></i>
          返回会员综合评分列表
        </el-link>
      </el-col>
      <el-col :span="24" v-else>
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('memberCreditlist')"
        >
          <i class="el-icon-arrow-left"></i>
          返回会员综合评分列表
        </el-link>
      </el-col>
      <el-col :span="24">
        <div class="table-container">
          <!-- <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-col class="mb20" :span="24">
            <formGroup
              :formGroupSettings="formGroupSettings"
              @formGroupSubmit="handleSearchSubmit"
            />
          </el-col> -->
          <el-col class="mb20" :span="24">
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableItem="handleTableItem"
          />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm :dialogFormSettings="dialogFormSettings" />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
// import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/creditSystem/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/creditSystem/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/creditSystem/tableHeaderOptWithoutBtn.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memberControl/dialogViewFormItems.json";
export default {
  name: "memberCreditlistDetail",
  components: {
    commonTitleWithBorder,
    // formGroup,
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
        tableTitle: "会员评分详情列表"
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
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          defaultExpandAll: true,
          headerOptions: tableHeaderOpts,
          hidelongItem: "true"
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 2
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "添加账户信息",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: []
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
      pageType: this.$route.params.gptype
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["title"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this,
        postdata = {
          basMemberId: id
        };
      that.$getData("getMemberInfo", postdata).then(data => {
        that.dialogFormSettings.dialogFormTitle = "会员详情";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
        that.dialogFormSettings.dialogFormItems.formButtonList = [];
        that.dialogFormSettings.dialogFormItems.formGroupValues = data.data;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 分页获取列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          memberId: that.$route.query.parentSysId
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getMemberCreditlistByMemberId", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberCreditlistByMemberId", postdata).then(xhr => {
            that.dealData(xhr);
          });
        } else {
          that.dealData(data);
        }
      });
    },
    dealData(data) {
      this.tablelistSettings.tableDatas = data.rows;
      this.paginationSettings.totalNumbers = parseInt(data.total);
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
    // 获取会员列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_invoicetype"
      })
      .then(data => {
        let invoicetypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogViewFormItems.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
      });
  }
};
</script>
