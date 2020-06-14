<template>
  <div class="home">
    <div class="menu">
      <div>
        <h3>欢迎XXX</h3>
      </div>
      <div class="menuinfo">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="rgba(121, 106, 238, 0.9)"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>品牌管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="handleSelect(1)">门店管理</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                  <el-menu-item index="1-3">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.home {
  display: flex;
  height: 100%;
}
.content {
  width: 85%;
}
.menu {
  height: 100%;
  width: 15%;
  background: rgba(121, 106, 238, 0.9);
}
.menuinfo{
  margin-top: 35px;
}
</style>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      if (key === 1) {
        // 跳转到门店管理页面
        this.$router.push({ path: "/store" });
      } else if (key === "3") {
        // 跳转到消息中心
        this.$router.push({ path: "/message" });
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
