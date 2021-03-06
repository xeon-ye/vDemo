const assessmentDistributeDialogFormItems = [
    {
        "type": "inputHidden",
        "label": "数据id",
        "name": "assessmentId",
        "span": 24,
        "width": "150px"
    },
    {
        "type": "inputHidden",
        "label": "数据id",
        "name": "targetId",
        "span": 24,
        "width": "150px"
    },
    {
        "type": "input",
        "label": "年度",
        "name": "year",
        "span": 12,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "input",
        "label": "市县",
        "name": "cityName",
        "span": 12,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "input",
        "label": "考核内容",
        "name": "assessmentContent",
        "span": 24,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "input",
        "label": "重点考核事项",
        "name": "assessmentItems",
        "span": 24,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "input",
        "label": "考核指标",
        "name": "assessmentTarget",
        "span": 24,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "input",
        "label": "年度考核任务",
        "name": "assessmentTargetTask",
        "span": 24,
        "width": "150px",
        "disabled": true
    },
    {
        "type": "textarea",
        "label": "评分标准",
        "name": "scoreStandard",
        "span": 24,
        "width": "150px",
        "disabled": true,
        "rows": 4
    },
    {
        "type": "select",
        "label": "市级牵头部门",
        "name": "cityLeadDepartmentId",
        "span": 12,
        "multiple": false,
        "placeHolder": "请选择",
        "filterable": false,
        "width": "150px",
        "data": [{
            "label":"杭州市农业农村局",
            "value":"1002"
        },{
            "label":"杭州市商务局",
            "value":"1003"
        }]
    },
    {
        "type": "select",
        "label": "市级配合部门",
        "name": "cityCoordinationDepartmentId",
        "span": 12,
        "multiple": false,
        "placeHolder": "请选择",
        "filterable": false,
        "width": "150px",
        "data": [{
            "label":"杭州市农业农村局",
            "value":"1002"
        },{
            "label":"杭州市商务局",
            "value":"1003"
        }]
    },
    {
        "type": "select",
        "label": "处室",
        "hideItem": true,
        "name": "officeId",
        "span": 12,
        "multiple": false,
        "placeHolder": "请选择",
        "filterable": false,
        "width": "150px",
        "data": [{
            "label":"浙江省农业农村厅种植业和种业管理处",
            "value":"1004001"
        },{
            "label":"浙江省农业农村厅农田建设管理处",
            "value":"1004002"
        }]
    }
]
const assessmentDistributeDialogFormBtns = [
    {
        "flag": "save",
        "label": "保存",
        "styleType": "primary"
    },
    {
        "flag": "cancle",
        "label": "取消",
        "styleType": ""
    }
]
export {
    assessmentDistributeDialogFormItems,
    assessmentDistributeDialogFormBtns
}