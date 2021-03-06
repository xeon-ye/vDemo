import axios from "../../axios";
import requestInterface from "../../axios/request";
/* 搜索栏点击事件通用方法 searchformBtnAction */
import searchformBtnAction from "./searchformBtnAction";
/* 对话框操作按钮点击事件通用方法 */
import dialogformBtnAction from "./dialogformBtnAction";
/* 页面初始化数据通用方法 */
import initPageData from "./initPageData";
/* 格式化搜索栏数据 */
import formatSearchData from "./formatSearchData";

export default {
  install: _Vue => {
    /* 格式化搜索栏数据 */
    _Vue.prototype.$formatSearchData = formatSearchData;
    /* 页面初始化或者绑定 */
    _Vue.prototype.$initPageData = initPageData;
    /* 处理搜索栏数据，并发起列表搜索 */
    _Vue.prototype.$searchformBtnAction = searchformBtnAction;
    /* 处理对话框按钮事件 */
    _Vue.prototype.$dialogformBtnAction = dialogformBtnAction;
    /* 获取接口数据get方法 */
    _Vue.prototype.$getData = (urlstr, params, isFormdata, isJumpInterface) => {
      let formflag = isFormdata ? isFormdata : false;
      let jumpInterfaceFlag = isJumpInterface ? isJumpInterface : false;
      return new Promise(resolve => {
        axios(
          requestInterface["getMethod"](urlstr, formflag, jumpInterfaceFlag),
          params
        ).then(xhr => {
          resolve(xhr);
        });
      });
    };
    /* 获取接口数据post方法 */
    _Vue.prototype.$postData = (
      urlstr,
      params,
      isFormdata,
      isJumpInterface
    ) => {
      let formflag = isFormdata ? isFormdata : false;
      let jumpInterfaceFlag = isJumpInterface ? isJumpInterface : false;
      return new Promise(resolve => {
        axios(
          requestInterface["postMethod"](urlstr, formflag, jumpInterfaceFlag),
          params
        ).then(xhr => {
          resolve(xhr);
        });
      });
    };
    /* 获取接口数据所有方法 */
    _Vue.prototype.$methodData = (
      type,
      urlstr,
      params,
      isFormdata,
      isJumpInterface
    ) => {
      let formflag = isFormdata ? isFormdata : false,
        method = type ? type : "get";
      let jumpInterfaceFlag = isJumpInterface ? isJumpInterface : false;
      return new Promise(resolve => {
        axios(
          requestInterface["kindMethod"](
            method,
            urlstr,
            formflag,
            jumpInterfaceFlag
          ),
          params
        ).then(xhr => {
          resolve(xhr);
        });
      });
    };
  }
};
