<template>
  <div class="form-group">
    <el-form
      ref="formItems"
      :model="formGroupSettings.formGroupValues"
      :rules="formGroupSettings.rules"
      label-width="80px"
      style="overflow: hidden;"
    >
      <el-row>
        <!-- <el-col v-if="formGroupSettings.fullScreen" :span="24"> -->
        <el-col :span="formGroupSettings.fullScreen ? 24 : 20">
          <el-col
            v-for="formItem in formGroupSettings.formGroupList"
            :key="formItem.name"
            :span="formItem.span"
          >
            <!-- item:hideSymbol -->
            <!--    {
                      "type": "hideSymbol",
                      "name":"hideSymbol",
                      "span": 12,
                      "width": "130px"
                    },
            -->
            <el-form-item
              v-if="formItem.type == 'hideSymbol'"
              class="visiHidden"
            >
              <el-input></el-input>
            </el-form-item>
            <!-- item:image -->
            <el-form-item
              v-if="formItem.type == 'image'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <template
                v-for="(imgItem, index) in formGroupSettings.formGroupValues[
                  formItem.name
                ]"
              >
                <el-col :span="6" :key="index">
                  <img
                    v-if="imgItem.viewPic"
                    :src="imgItem.imgSrc"
                    alt=""
                    width="100%"
                  />
                  <a
                    v-else
                    @click="return false;"
                    class="file displayBlock textEllipsis pl6"
                    :href="imgItem.imgSrc"
                    target="_blank"
                  >
                    <em
                      class="el-icon-picture-outline"
                      v-if="imgItem.isImage == 'true'"
                    ></em>
                    <em class="el-icon-files" v-else></em>
                    <span class="ml10">{{ imgItem.fileName }}</span>
                  </a>
                </el-col>
              </template>
            </el-form-item>
            <!-- item:transfer -->
            <el-form-item
              v-if="formItem.type == 'transfer'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-transfer
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :props="formItem.transferProps"
                :data="formItem.data"
                filterable
                :titles="formItem.titles"
                :button-texts="formItem.buttons"
                :filter-method="filterMethod"
                :filter-placeholder="formItem.placeholder"
              ></el-transfer>
            </el-form-item>
            <!-- item:input -->
            <el-form-item
              v-if="formItem.type == 'input' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input
                v-if="formItem.password"
                :show-password="formItem.password"
                :disabled="formItem.disabled"
                :placeholder="formItem.placeholder"
                autocomplete="new-password"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
              <el-input
                v-else
                :disabled="formItem.disabled"
                :placeholder="formItem.placeholder"
                autocomplete="off"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
            </el-form-item>
            <!-- item:inputHidden -->
            <el-form-item
              v-if="formItem.type == 'inputHidden'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
              class="displayNone"
            >
              <el-input
                :show-password="formItem.password"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
            </el-form-item>
            <!-- item:stepInput -->
            <el-form-item
              v-if="formItem.type == 'stepInput' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input-number
                class="width100"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :step="formItem.step"
                :precision="formItem.precision"
                :placeholder="formItem.placeholder"
                :min="formItem.min"
                :max="formItem.max"
                @change="
                  handleChangeSelect(
                    formItem.linkName,
                    formGroupSettings.formGroupValues[formItem.name]
                  )
                "
              ></el-input-number>
            </el-form-item>
            <!-- item:textarea -->
            <el-form-item
              v-if="formItem.type == 'textarea' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input
                :disabled="formItem.disabled"
                type="textarea"
                :rows="formItem.rows || 2"
                :placeholder="formItem.placeholder"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :class="formItem.className"
              ></el-input>
            </el-form-item>
            <!-- item:html -->
            <el-form-item
              v-if="formItem.type == 'html'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <div
                style="line-height:40px;"
                v-html="formGroupSettings.formGroupValues[formItem.name]"
              ></div>
            </el-form-item>
            <!-- item:rate -->
            <el-form-item
              v-if="formItem.type == 'rate'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-rate
                class="pt10 pb10"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :colors="formItem.colors"
              >
              </el-rate>
            </el-form-item>
            <!-- item:inputTable -->
            <el-form-item
              v-if="formItem.type == 'inputTable' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <div :class="['inputTable', formItem.tableName]">
                <el-table
                  size="mini"
                  :data="formGroupSettings.formGroupValues[formItem.name]"
                  border
                  style="width: 100%;margin:auto;"
                  highlight-current-row
                >
                  <el-table-column
                    v-for="(item, index) in formItem.headers"
                    :label="item.title"
                    :prop="item.key"
                    :width="item.width"
                    :key="index"
                  >
                    <template slot-scope="scope">
                      <template v-if="item.inputTypeByDate">
                        <el-select
                          v-if="scope.row.inputType == 'select'"
                          size="mini"
                          :disabled="scope.row.disabled"
                          :placeholder="scope.row.placeHolder || '请选择'"
                          v-model="scope.row[item.key]"
                          class="width100"
                          auto-complete="off"
                        >
                          <el-option
                            v-for="opt in scope.row.data"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                          ></el-option>
                        </el-select>
                        <el-input
                          v-else-if="scope.row.inputType == 'input'"
                          size="mini"
                          :disabled="scope.row.disabled"
                          placeholder="请输入内容"
                          v-model="scope.row[item.key]"
                        ></el-input>
                        <el-input-number
                          v-else-if="scope.row.inputType == 'number'"
                          size="mini"
                          class="width100"
                          :precision="scope.row.precision || 0"
                          :disabled="scope.row.disabled"
                          v-model="scope.row[item.key]"
                          :step="scope.row.step || 1"
                          :min="scope.row.min"
                          :max="scope.row.max"
                        ></el-input-number>
                        <span
                          v-else-if="scope.row.inputType == 'nullSpan'"
                        ></span>
                        <el-input
                          v-else
                          type="textarea"
                          size="mini"
                          :autosize="true"
                          :disabled="scope.row.disabled"
                          placeholder="请输入内容"
                          v-model="scope.row[item.key]"
                        ></el-input>
                      </template>
                      <template v-else>
                        <el-select
                          v-if="item.inputType == 'select'"
                          size="mini"
                          :disabled="item.disabled"
                          :placeholder="item.placeHolder || '请选择'"
                          v-model="scope.row[item.key]"
                          class="width100"
                          auto-complete="off"
                        >
                          <el-option
                            v-for="opt in item.data"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                          ></el-option>
                        </el-select>
                        <el-input
                          v-else-if="item.inputType == 'input'"
                          size="mini"
                          :disabled="item.disabled"
                          placeholder="请输入内容"
                          v-model="scope.row[item.key]"
                        ></el-input>
                        <el-input-number
                          v-else-if="item.inputType == 'number'"
                          size="mini"
                          class="width100"
                          :precision="item.precision || 0"
                          :disabled="item.disabled"
                          v-model="scope.row[item.key]"
                          :step="item.step || 1"
                          :min="item.min"
                          :max="item.max"
                        ></el-input-number>
                        <span v-else-if="item.inputType == 'nullSpan'"></span>
                        <el-input
                          v-else
                          type="textarea"
                          size="mini"
                          :autosize="true"
                          :disabled="item.disabled"
                          placeholder="请输入内容"
                          v-model="scope.row[item.key]"
                        ></el-input>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    class="textAlignCenter"
                    v-if="formItem.useType == 'add'"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        size="mini"
                        @click="removeDomain(scope.row, formItem.name)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-row v-if="formItem.useType && formItem.useType == 'add'">
                <el-col :span="6" :offset="18" class="textAlignCenter mt10">
                  <el-button
                    type="success"
                    size="mini"
                    @click="addDomain(formItem.tableItems, formItem.name)"
                  >
                    新增
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- item:flowComment -->
            <el-form-item
              class="scorelist"
              v-if="
                formItem.type == 'flowComment' &&
                  formGroupSettings.formGroupValues[formItem.name] &&
                  formGroupSettings.formGroupValues[formItem.name].length > 0
              "
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-row class="scorelist-body">
                <el-table
                  size="mini"
                  :data="formGroupSettings.formGroupValues[formItem.name]"
                  border
                  style="width: 100%;margin:auto;"
                >
                  <el-table-column
                    v-for="(itemhead, index) in formItem.headers"
                    :label="itemhead.title"
                    :prop="itemhead.key"
                    :width="itemhead.width"
                    :key="index"
                  >
                    <template slot-scope="scope">
                      <template v-if="itemhead.type && itemhead.type == 'rate'">
                        <el-rate
                          disabled
                          v-model="scope.row[itemhead.key]"
                          :colors="itemhead.colors"
                        >
                        </el-rate>
                      </template>
                      <template v-else>
                        <template v-if="itemhead.key == 'time'">
                          {{ scope.row[itemhead.key] | normalTime("-") }}
                        </template>
                        <template v-else>
                          {{ scope.row[itemhead.key] }}
                        </template>
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-form-item>
            <!-- item:date -->
            <el-form-item
              v-if="formItem.type == 'date'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-date-picker
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :type="formItem.dateType"
                :range-separator="formItem.dateRangeSeparator"
                :start-placeholder="formItem.dateStartPlaceholder"
                :end-placeholder="formItem.dateEndPlaceholder"
                :format="formItem.format"
                :value-format="formItem.valueFormat"
                :disabled="formItem.disabled"
              ></el-date-picker>
            </el-form-item>
            <!-- item:button -->
            <el-form-item
              v-if="formItem.type == 'button'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-button
                v-for="formBtn in formItem.data"
                :key="formBtn.flag"
                :type="formBtn.styleType"
                :size="formBtn.size"
                :icon="formBtn.icon"
                @click="handleChangeSelect(formItem.linkName, formBtn.flag)"
              >
                {{ formBtn.label }}
              </el-button>
            </el-form-item>
            <!-- item:checkbox -->
            <el-form-item
              v-if="formItem.type == 'checkbox'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-checkbox-group
                class="width100 pt14"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :disabled="formItem.disabled"
                @change="
                  handleChangeSelect(
                    formItem.linkName,
                    formGroupSettings.formGroupValues[formItem.name]
                  )
                "
              >
                <el-checkbox
                  v-for="opt in formItem.data"
                  :key="opt.value"
                  :label="opt.value"
                >
                  {{ opt.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- item:radio -->
            <el-form-item
              v-if="formItem.type == 'radio'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-radio-group
                class="width100 pt14"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :disabled="formItem.disabled"
                @change="
                  handleChangeSelect(
                    formItem.linkName,
                    formGroupSettings.formGroupValues[formItem.name]
                  )
                "
              >
                <el-radio
                  v-for="opt in formItem.data"
                  :key="opt.value"
                  :label="opt.value"
                >
                  {{ opt.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- item:select -->
            <el-form-item
              v-if="formItem.type == 'select' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-col
                :span="
                  formItem.buttonBehind
                    ? 24 - parseInt(formItem.buttonAttr.span)
                    : 24
                "
              >
                <el-select
                  class="width100"
                  v-model="formGroupSettings.formGroupValues[formItem.name]"
                  :placeholder="formItem.placeHolder"
                  :disabled="formItem.disabled"
                  :filterable="formItem.filterable"
                  :multiple="formItem.multiple"
                  :defaultFirstOption="formItem.multiple"
                  :clearable="!formItem.cannotClear"
                  auto-complete="off"
                  @change="
                    handleChangeSelect(
                      formItem.linkName,
                      formGroupSettings.formGroupValues[formItem.name]
                    )
                  "
                >
                  <el-option
                    v-for="opt in formItem.data"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col
                v-if="formItem.buttonBehind"
                :span="formItem.buttonAttr.span"
                class="textAlignRight"
              >
                <el-button
                  :class="formItem.buttonAttr.buttonClass"
                  :type="formItem.buttonAttr.type"
                  :size="formItem.buttonAttr.size"
                  @click="handleInlineFnc(formItem.buttonAttr.flag)"
                >
                  {{ formItem.buttonAttr.label }}
                </el-button>
              </el-col>
            </el-form-item>
            <!-- item:editor -->
            <el-form-item
              class="editor"
              v-if="formItem.type == 'editor' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <vue-ueditor-wrap
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :config="formItem.config"
              ></vue-ueditor-wrap>
            </el-form-item>
            <!-- item:upload -->
            <el-form-item
              v-if="formItem.type == 'upload' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-upload
                class="upload-demo"
                ref="fileUpd"
                :accept="formItem.acceptType"
                action="123"
                :data="upddata"
                :multiple="formItem.multiple"
                :on-change="handleChange"
                :on-preview="handlePreview"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :on-success="handleUpdSuccess"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">
                  <em class="el-icon-plus"></em>
                  {{ formItem.choseBtn }}
                </el-button>
              </el-upload>
            </el-form-item>
            <!-- item:elTreeSelect -->
            <el-form-item
              v-if="formItem.type == 'elTreeSelect' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width || '0px'"
              :prop="formItem.name"
            >
              <elTreeSelect
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :props="formItem.props"
                :modelName="formItem.name"
                :options="formItem.data"
                :disabled="formItem.disabled"
              />
            </el-form-item>
            <!-- item:selectTree -->
            <el-form-item
              v-if="formItem.type == 'selectTree' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <kt-select-tree
                class="selectTree"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :data="formItem.data"
                :width="formItem.treeWidth"
                :size="formItem.treeSize"
                :canChoseItem="formItem.canChoseItem"
                :filterable="formItem.filterable"
                :multiple="formItem.multiple"
                :clearable="formItem.clearable"
                :disabled="formItem.disabled"
              ></kt-select-tree>
            </el-form-item>
            <!-- item:group -->
            <el-form-item
              v-if="formItem.type == 'group'"
              :label-width="formItem.width || '0px'"
            >
              <commonTitleWithBorder :title="formItem.title" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="formGroupSettings.fullScreen ? 24 : 4">
          <el-form-item
            label-width="0"
            :class="[
              formGroupSettings.fullScreen
                ? 'textAlignCenter'
                : 'textAlignRight',
              formGroupSettings.buttonGroupClass
            ]"
          >
            <el-button
              v-for="formBtn in formGroupSettings.formButtonList"
              :key="formBtn.flag"
              :type="formBtn.styleType"
              :size="formBtn.size"
              :icon="formBtn.icon"
              @click="onSubmit(formBtn, 'formItems')"
            >
              {{ formBtn.label }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import elTreeSelect from "@/components/elTreeSelect";
// import inputTable from "@/components/inputTable";
export default {
  name: "formGroup",
  props: {
    formGroupSettings: Object
  },
  components: {
    commonTitleWithBorder,
    elTreeSelect
  },
  data() {
    return {
      fileList: [],
      upddata: {},
      uploadForm: new FormData(),
      updfileParamName: this.formGroupSettings.formGroupTypeUploadName,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  beforeMount() {
    let that = this;
    this.fileList = [];
    this.formGroupSettings.formGroupList.map(item => {
      if (item.type == "editor") {
        item.config.serverUrl = that.$global.ueEditorServerUrl;
        item.config.UEDITOR_HOME_URL = that.$global.ueEditorUrl;
      }
      // if (item.type == "upload") {
      //   that.updfileParamName = item.name ? item.name : "files";
      // }
    });
  },
  // updated() {
  //   this.fileList = [];
  // },
  methods: {
    handleInlineFnc(flag) {
      if (!flag) {
        console.log("没有定义按钮功能");
        return;
      }
      this.$emit("inlineFncs", flag);
    },
    //inputtable取值
    getTableData(data) {
      console.log(data, "data");
    },
    // 文件上传相关钩子
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 ${files.length} 个文件`);
      console.log(files, fileList);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      // console.log(file, fileList);
    },
    submitUpload() {
      this.$refs.fileUpd[0].submit();
    },
    handleUpdSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      // that.$emit("formGroupSubmit", formBtn, "updType");
    },
    // 添加删除打分项
    removeDomain(item, flag) {
      if (this.formGroupSettings.formGroupValues[flag].length <= 1) {
        return false;
      }
      var index = this.formGroupSettings.formGroupValues[flag].indexOf(item);
      if (index !== -1) {
        this.formGroupSettings.formGroupValues[flag].splice(index, 1);
      }
    },
    addDomain(item, flag) {
      let newObj = JSON.parse(JSON.stringify(item));
      this.formGroupSettings.formGroupValues[flag].push(newObj);
    },
    // 下拉关联其他项目
    handleChangeSelect(linkname, data) {
      if (!linkname) {
        return false;
      }
      this.$emit("linkSelect", linkname, data);
    },
    updDataChange(data) {
      let that = this;
      return new Promise(resolve => {
        that.uploadForm = new FormData();
        let postParams = JSON.parse(JSON.stringify(data)),
          updstrName = that.updfileParamName;
        postParams = that.$globalFnc.postArrtoString(postParams);
        // if (that.fileList.length == 1) {
        //   updstrName = "file";
        // }
        // if (that.fileList.length > 1) {
        //   updstrName = "files";
        // }
        let keys = Object.keys(postParams);
        for (let key of keys) {
          if (key != "viewfiles" && key != "flowComments")
            that.uploadForm.append(key, postParams[key]);
        }
        if (that.fileList.length > 0) {
          for (var i = 0; i < that.fileList.length; i++) {
            that.uploadForm.append(updstrName, that.fileList[i].raw);
          }
        }
        resolve(that.uploadForm);
      });
    },
    // 提交表单
    onSubmit(formBtn, formName) {
      if (formBtn.flag == "cancle") {
        this.$emit("formGroupSubmit", formBtn, {});
        return false;
      }
      let that = this,
        postDatas = {};
      this.$refs[formName].fields.map(filed => {
        if (filed.labelFor != "viewfiles" && filed.labelFor != "flowComments")
          postDatas[filed.labelFor] = filed.fieldValue;
      });
      if (formBtn.flag == "reset") {
        this.$refs[formName].resetFields();
        return false;
      }
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.formGroupSettings.formGroupTypeUpload) {
            that
              // .updDataChange(that.formGroupSettings.formGroupValues)
              .updDataChange(postDatas)
              .then(data => {
                // that.submitUpload();
                that.fileList = [];
                that.$emit("formGroupSubmit", formBtn, data, postDatas);
              });
          } else {
            that.$emit(
              "formGroupSubmit",
              formBtn,
              postDatas
              // that.formGroupSettings.formGroupValues
            );
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
