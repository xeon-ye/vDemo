const updateRandomItemDialogBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "updateScheme_randomSupervisionCheck"
  },
  {
    flag: "random",
    label: "下一步(抽取市)",
    styleType: "primary",
    postUrl: "updateScheme_randomSupervisionCheck"
  },
  {
    flag: "print",
    label: "打印",
    styleType: "primary",
    postUrl: ""
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const updateRandomItemDialogItems = [
  {
    type: "inputHidden",
    label: "created",
    name: "created",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "createdBy",
    name: "createdBy",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "orgId",
    name: "orgId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "status",
    name: "status",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "chkSchemeId",
    name: "chkSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "extractedDistricts",
    name: "extractedDistricts",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "code",
    name: "code",
    span: 24,
    width: "150px"
  },
  {
    type: "input",
    label: "方案名称",
    name: "name",
    span: 12,
    width: "150px"
  },
  {
    type: "date",
    label: "年度",
    name: "year",
    span: 12,
    valueFormat: "yyyy",
    format: "yyyy",
    width: "150px",
    dateType: "year"
  },
  {
    type: "date",
    label: "开始时间",
    name: "startDt",
    span: 12,
    // valueFormat: "yyyy-MM-dd",
    // format: "yyyy-MM-dd",
    width: "150px",
    dateType: "date"
  },
  {
    type: "date",
    label: "结束时间",
    name: "endDt",
    span: 12,
    // valueFormat: "yyyy-MM-dd",
    // format: "yyyy-MM-dd",
    width: "150px",
    dateType: "date"
  },
  {
    type: "select",
    label: "检查事项",
    name: "chkDefItemId",
    data: [],
    span: 12,
    width: "150px"
  },
  {
    type: "select",
    label: "组长",
    name: "groupLeader",
    span: 12,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "副组长",
    name: "deputyGroupLeader",
    span: 12,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "检查组成员",
    name: "groupMembers",
    span: 24,
    multiple: true,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "检查最小范围",
    name: "scopeTo",
    linkName: "scopeTo",
    span: 12,
    data: [],
    width: "150px"
  },
  {
    type: "stepInput",
    label: "行政市个数",
    name: "cityNum",
    span: 12,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "区/县个数",
    hideItem: false,
    name: "countyNum",
    span: 12,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    hideItem: false,
    label: "乡/镇个数",
    name: "townNum",
    span: 12,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    hideItem: false,
    label: "村/社区个数",
    name: "villageNum",
    span: 12,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "html",
    label: "检查范围(随机抽取)",
    name: "districtInfos__dsp",
    disabled: true,
    span: 24,
    width: "150px"
  },
  {
    type: "textarea",
    label: "检查总结",
    name: "summary",
    span: 24,
    width: "150px"
  }
];
export { updateRandomItemDialogBtns, updateRandomItemDialogItems };
