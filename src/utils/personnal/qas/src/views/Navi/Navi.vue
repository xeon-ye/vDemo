<template>
  <el-container id="main_container">
    <!--左侧容器-->
    <el-aside id="left_menu">
      <el-row class="tac">
        <el-col :span="24">
          <div class="logo">
            <span :class="isCollapse ? 'displayNone' : 'displayInline'">
              浙江省粮食质量监管系统
            </span>
          </div>
          <!--左侧菜单栏-->
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="left_menu_select"
            background-color="#ffffff"
            text-color="#3D4966"
            :collapse-transition="true"
            :default-active="current_active"
            :collapse="isCollapse"
            active-text-color="#3377FF"
          >
            <!--最外层模板循环-->
            <template v-for="item in current_menu" @topselect="menuChange">
              <!-- 判断是否有子目录 -->
              <template v-if="item.children && item.children.length">
                <el-submenu :index="item.id" :key="item.id">
                  <template slot="title">
                    <i :class="item.menuview"></i>
                    <span class="left_text">{{ item.text }}</span>
                  </template>
                  <!--遍历二级目录-->
                  <template v-for="subitem in item.children">
                    <!--判断是否存在三级目录-->
                    <template
                      v-if="subitem.children && subitem.children.length"
                    >
                      <el-submenu :index="subitem.id" :key="subitem.id">
                        <template slot="title">
                          <i :class="subitem.menuview"></i>
                          <span class="left_text">{{ subitem.text }}</span>
                        </template>
                        <!--遍历三级目录-->
                        <el-menu-item
                          v-for="menuitem in subitem.children"
                          :index="menuitem.menuaction"
                          :key="menuitem.id"
                        >
                          <template slot="title">
                            <i :class="menuitem.menuview"></i>
                            {{ menuitem.text }}
                          </template>
                        </el-menu-item>
                      </el-submenu>
                    </template>
                    <!--无三级目录时 作为导航-->
                    <template v-else>
                      <el-menu-item
                        :index="subitem.menuaction"
                        class="leftMenuMenu"
                        :key="subitem.id"
                      >
                        <template slot="title">
                          <i :class="subitem.menuview"></i>
                          {{ subitem.text }}
                        </template>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <!--无子目录时 作为导航-->
              <template v-else>
                <el-menu-item :index="item.menuaction" :key="item.id">
                  <template slot="title">
                    <i :class="item.menuview"></i>
                    <span class="left_text">{{ item.text }}</span>
                  </template>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <!--右侧容器-->
    <el-container>
      <!--右侧顶部容器-->
      <el-header>
        <el-row :gutter="20">
          <!--菜单收缩按钮-->
          <el-col :span="1">
            <div class="logo-box">
              <i
                class="el-icon-s-fold toggle"
                @click="isCollapse = !isCollapse"
              ></i>
            </div>
          </el-col>
          <!--顶部导航-->
          <el-col :span="21">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo topMenu"
              mode="horizontal"
              @select="handleSelect"
              :unique-opened="true"
              background-color="#336CDE"
              text-color="#fff"
              active-text-color="#ffd04b"
              ref="elMenuTop"
            >
              <el-menu-item :index="$constants.DEF_MENU_INDEX_INDEX"
                >首页</el-menu-item
              >
              <top-menu
                v-for="menuItem in menuItemArray"
                :key="menuItem.id"
                :menu="menuItem"
              />
            </el-menu>
          </el-col>
          <el-col :span="2">
            <div class="user-icon">
              <el-avatar :size="35" :title="userName">{{ userName }}</el-avatar>
            </div>
            <div class="user-icon logout-box">
              <i
                class="el-icon-switch-button logout"
                @click="logout"
                title="退出"
              ></i>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--右侧页面容器-->
      <el-main class="mainContainer">
        <!--面包屑菜单-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbNameArray"
            :key="index"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <!--页面视图 绑定key值,同路由参数改变时路由刷新-->
        <router-view
          :key="$route.path + $route.params"
          @transfBreadcrumb="getBreadcrumbName"
        ></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script type="text/ecmascript-6">
import topMenu from './views/Navi/topMenu'

export default {
  name: "app",
  data() {
    return {
      activeIndex: this.$constants.DEF_MENU_INDEX_INDEX,
      current_active: 'qas-sample0101',
      is_toggle: false,
      isCollapse: false,
      showRouterView: true,
      menuItemArray: [],
      current_menu: {},
      userName: '',
      breadcrumbNameArray: [],
    }
  },
  components: {
    topMenu: topMenu,//顶部菜单
  },
  methods: {
    handleOpen() {
      //console.log(key, keyPath);
    },
    handleClose() {
      //console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      //更改激活目录
      this.current_active = key;

      //点击首页
      if (this.$constants.DEF_MENU_INDEX_INDEX == key) {
        this.$router.push({
          name: "index"
        });
        return false;
      }
      //更改当前使用目录
      if (keyPath[0]) {
        let menus = this.menuItemArray;
        for (let i = 0; i < menus.length; i++) {
          if (keyPath[0] == menus[i].id && menus[i].children && menus[i].children.length) {
            this.current_menu = menus[i].children;
            break;
          }
        }
      }
      let path = key.split('/');
      //路由跳转
      if (path[1]) {
        let name = path[1].split('_');
        this.$router.push({
          name: name[0],
          params: {
            id: name[1]
          }
        });
      } else {
        console.error("菜单路径配置错误,无法解析!")
      }
    },
    left_menu_select(key) {
      this.current_active = key;
      this.activeIndex = key;
      let path = key.split('/');
      //路由跳转
      if (path[1]) {
        let name = path[1].split('_');
        this.$router.push({
          name: name[0],
          params: {
            id: name[1]
          }
        });
      } else {
        console.error("菜单路径配置错误,无法解析!")
      }
    },
    //顶部导航选择 当前目录变更监听
    menuChange(newMenu) {
      this.current_menu = newMenu;
    },
    logout() {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$Api.logout().then(data => {
        //   if (data.success) {
        //     let url = data.data.targetUrl;
        //     window.location.href = url;
        //   }
        // });
        this.$Api.logout().then(() => {
          let url = "http://192.168.2.244:8888/cas/login?service=http://192.168.4.150:8081/oh-qas-web/";
          window.location.href = url;
        });
      })
    },
    //面包屑导航
    getBreadcrumbName(obj) {
      this.breadcrumbNameArray = obj;
    },
    getMenu() {
      //获取菜单
      this.$get({
        url: "/_data/base/menu/getMenuTreeByUser?sysType=oh-qas",
        fnc: data => {
          if (data) {
            //要用的菜单
            this.menuItemArray = data[0].children[0].children;
            //hash模式下解析当前路径,并手动跳转
            this.$dateUtl.refresh(this);
            //遍历菜单找出当前目录
            let menus = this.menuItemArray;
            let find = false;
            for (let i = 0; i < menus.length; i++) {
              //二级菜单
              if (menus[i].children) {
                let sec = menus[i].children;
                for (let j = 0; j < sec.length; j++) {
                  //三级菜单
                  if (sec[j].children) {
                    let third = sec[j].children;
                    for (let k = 0; k < third.length; k++) {
                      if (this.current_active == third[k].menuaction) {
                        this.current_menu = menus[i].children;
                        find = true;
                        break;
                      }
                    }
                  } else {
                    //没有三级菜单时尝试在二级菜单中匹配
                    if (sec[j].menuaction) {
                      if (this.current_active == sec[j].menuaction) {
                        this.current_menu = menus[i].children;
                        find = true;
                        break;
                      }
                    }
                  }
                }
              }
            }
            //没有匹配的目录时则使用菜单第一条数据
            if (!find) {
              this.current_menu = this.menuItemArray[0].children;
            }
          }
        },
      });
    },
    getBasicData() {

      //获取基础数据 产品品种数据
      this.$get({
        url: "/_data/basic/grainbreed/tree",
        fnc: data => {
          this.$store.dispatch('set_products', data[0].children);//保存到全局供其他子组件调用
        }
      });
      //获取基础数据 监测级别数据
      this.$get({
        url: "/_data/frame/ref/list?_refKey=dict&busintypeid=qas_adminLevel",
        fnc: data => {
          this.$store.dispatch('set_admins', data);//保存到全局供其他子组件调用
        }
      });
    },
    /* toLogin(){
      // let returnUrl="http://192.168.4.150:8081/oh-qas-web";
       let returnUrl="http://localhost:8080";
       window.location.href="http://192.168.2.244:8888/cas?service="+encodeURIComponent(returnUrl);
     },*/
  },
  created() {
    this.$get({
      url: "/_data/base/operator/getUserSeesion",
      fnc: data => {
        //失败或者没有用户信息
        if (!data || !data.success || !data.data) {
          return false;
        }
        //存储用户信息
        if (data && data.success) {
          let userData = data.data;
          this.$store.dispatch('set_userInfo', userData);
          this.userName = userData.name;
        }
      },
      rej: () => {
        //调到登录页面
        //this.toLogin();
      }
    });

    this.getMenu();
    this.getBasicData();

  }
}
</script>
