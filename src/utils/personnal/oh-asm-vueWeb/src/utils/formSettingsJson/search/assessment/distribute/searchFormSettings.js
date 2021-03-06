const submitKpiSearchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "150px",
    data: []
  },
  {
    type: "select",
    label: "状态",
    name: "schemeKpiStatus",
    span: 8,
    width: "150px",
    data: [
      {
        value: "1",
        label: "已完成"
      },
      {
        value: "0",
        label: "未完成"
      },
      {
        value: "2",
        label: "已提交"
      }
    ]
  }
];
const releaseKpiSearchFormItems = {
  "random-assess": [
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      linkName: "scheme",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "被抽查市县",
      name: "assessedOrgId",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "150px",
      data: [
        {
          value: "0",
          label: "未完成"
        },
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "2",
          label: "已上报"
        }
      ]
    }
  ],
  "higher-assess": [
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      linkName: "scheme",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "被考核市县",
      name: "assessedOrgId",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "150px",
      data: [
        {
          value: "0",
          label: "未完成"
        },
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "2",
          label: "已上报"
        }
      ]
    }
  ]
};
const kpiSearchFormBtns = [
  {
    flag: "submit",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "schemeKpiBySchemeId"
  }
  // {
  //   flag: "cancel",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "",
  //   postUrl: ""
  // }
];
const distributeFormItems = {
  1: [
    {
      type: "inputHidden",
      label: "阶段",
      name: "assessPhase",
      span: 8,
      width: "80px"
    },
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      span: 8,
      width: "100px",
      linkName: "searchScheme",
      data: []
    },
    // {
    //   type: "select",
    //   label: "被考核市县",
    //   name: "assessedOrgId",
    //   span: 8,
    //   width: "100px",
    //   data: []
    // },
    {
      type: "input",
      label: "考核任务",
      name: "kpiName",
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "100px",
      data: [
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "0",
          label: "未完成"
        },
        {
          value: "2",
          label: "已发布"
        }
      ]
    }
  ],
  2: [
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      span: 8,
      width: "100px",
      linkName: "searchScheme",
      data: []
    },
    // {
    //   type: "select",
    //   label: "被考核市县",
    //   name: "assessedOrgId",
    //   span: 8,
    //   width: "100px",
    //   data: []
    // },
    {
      type: "input",
      label: "考核任务",
      name: "kpiName",
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "100px",
      data: [
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "0",
          label: "未完成"
        },
        {
          value: "2",
          label: "已发布"
        }
      ]
    }
  ]
};

const distributeFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "distributeSuperviseList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: "distributeSuperviseList"
  // }
];
export {
  distributeFormItems,
  distributeFormBtns,
  submitKpiSearchFormItems,
  releaseKpiSearchFormItems,
  kpiSearchFormBtns
};
