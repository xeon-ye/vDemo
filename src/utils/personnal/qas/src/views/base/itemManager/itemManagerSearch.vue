<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <span class="panel_tit">查询条件</span>
      </template>
      <el-form label-width="80px" :inline="true">
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <el-form-item label="名称查询">
                <el-input
                  v-model="search.name"
                  class="dialog_input"
                  placeholder="请输入内容"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="3" class="textAlignRight">
            <el-button type="primary" @click="do_search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "itemManagerSearch",
  props: {
    defaultSearchData: {
      type: Object
    }
  },
  data() {
    return {
      activeName: "1",
      search: {
        name: ""
      }
    };
  },
  methods: {
    do_search() {
      this.$emit("doSearch", this.search);
    }
  }
};
</script>
