<template>
  <div class="table-container">
    <el-card>
      <div slot="header">KT-TREE-SELECT</div>
      <el-form>
        <el-form-item label="Tree Single：">
          <kt-select-tree
            v-model="value01"
            :data="data"
            :filterable="true"
            :clearable="true"
          ></kt-select-tree>
          <el-button type="primary" size="mini" @click="clickMe01"
            >Submit Single!</el-button
          >
        </el-form-item>
        <el-form-item label="Tree Multiple：">
          <kt-select-tree
            v-model="value02"
            :data="data"
            :filterable="true"
            :multiple="true"
          ></kt-select-tree>
          <el-button type="primary" size="mini" @click="clickMe02"
            >Submit Multiple!</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "videoPlayer",
  data() {
    return {
      data: [],
      defaultExpandedKeys: [],
      // value01: '12102',
      // value02: ['12103', '12104', '12105', '12106', '12107', '12108']
      value01: "",
      value02: []
    };
  },
  methods: {
    clickMe01() {
      alert(this.value01);
    },
    clickMe02() {
      alert(this.value02.toString());
    }
  },
  created() {
    setTimeout(() => {
      // this.data = [
      //     {
      //         id: '1',
      //         name: '中国',
      //         parentId: 'G0',
      //         children: [
      //             {
      //                 id: 'S1', name: '广东', parentId: 'G0',
      //                 children: [
      //                     {id: 'C1', name: '广州', parentId: 'S1'},
      //                     {id: 'C2', name: '深圳', parentId: 'S1'},
      //                     {id: 'C3', name: '佛山', parentId: 'S1'}
      //                 ]
      //             },
      //             {id: 'S2', name: '湖南', parentId: 'G0'},
      //             {id: 'S3', name: '广西', parentId: 'G0'},
      //             {id: 'S4', name: '湖北', parentId: 'G0'},
      //         ]
      //     }
      // ];
      // this.defaultExpandedKeys = this.data[0].children.map(item => item.id).concat(this.data[0].id);
      this.data = [
        {
          id: "0",
          text: "检测项目",
          parentId: null,
          checked: false,
          state: "open",
          children: [
            {
              id: "100",
              text: "质量品质",
              parentId: "0",
              checked: false,
              state: "closed",
              code: "100.",
              type: "ITEMTYPE_CATEGORY",
              refValue: "",
              children: [
                {
                  id: "1001",
                  text: "理化指标",
                  parentId: "100",
                  checked: false,
                  state: "closed",
                  code: "100.1001.",
                  type: "ITEMTYPE",
                  refValue: "",
                  children: [
                    {
                      id: "1003",
                      text: "不完善粒",
                      parentId: "1001",
                      checked: false,
                      state: "closed",
                      code: "100.1001.1003",
                      type: "SUB_ITEMTYPE",
                      refValue: "",
                      children: [
                        {
                          id: "100380",
                          text: "生霉粒",
                          parentId: "1003",
                          checked: false,
                          state: "open",
                          code: "unsound_mildew",
                          dataType: "S",
                          busintypeid: null,
                          type: "ITEM",
                          refValue: ""
                        },
                        {
                          id: "100381",
                          text: "虫蚀粒",
                          parentId: "1003",
                          checked: false,
                          state: "open",
                          code: "unsound_wormeaten",
                          dataType: "S",
                          busintypeid: null,
                          type: "ITEM",
                          refValue: ""
                        },
                        {
                          id: "100382",
                          text: "病斑粒",
                          parentId: "1003",
                          checked: false,
                          state: "open",
                          code: "unsound_scab",
                          dataType: "S",
                          busintypeid: null,
                          type: "ITEM",
                          refValue: ""
                        }
                      ]
                    },
                    {
                      id: "1004",
                      text: "不完善粒1",
                      parentId: "1001",
                      checked: false,
                      state: "closed",
                      code: "100.1001.1003",
                      type: "SUB_ITEMTYPE",
                      refValue: ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
    }, 800);
  }
};
</script>
