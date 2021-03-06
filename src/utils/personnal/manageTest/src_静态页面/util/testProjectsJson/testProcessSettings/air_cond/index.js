const testJson = [
  {
    name: "测试流程一",
    description: "运行-关闭",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认空调处于关闭状态" },
          { tip: "2.请先用柜控操作关闭空调，切换至程控模式" },
          { tip: "3.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认空调处于关闭状态" },
          { tip: "2.点击【开始测试】启动测试" }
        ],
        testItems: "",
        processId: "0",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "开始测试", instruction: "nextStep" }
        ],
        operateButtons: []
      },
      {
        idx: 1,
        processName: "空调启动",
        tipsTitle: "空调启动",
        tips: [
          { tip: "1.请点击【开启空调】按钮开启空调" },
          { tip: "2.空调正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控开启空调" },
          { tip: "2.空调正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "stop,operating,turnOn",
        processId: "1",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "开启空调", instruction: "turnOn" }]
      },
      {
        idx: 2,
        processName: "空调关闭",
        tipsTitle: "空调关闭",
        tips: [
          { tip: "1.请点击【关闭空调】按钮关闭空调" },
          { tip: "2.空调正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控关闭空调" },
          { tip: "2.空调正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "operating,stop,turnOff",
        processId: "2",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "获取结果", instruction: "getResult" }
        ],
        operateButtons: [{ label: "关闭空调", instruction: "turnOff" }]
      }
    ]
  }
];
export default testJson;
