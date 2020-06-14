<template>
  <div class="content">
    <div class="sgin">
      <div class="logo">
        <div class="logo_content">
          <div class="welcome">欢迎登陆</div>
          <div class="welcome_detail">xxxxx系统</div>
        </div>
      </div>
      <div class="login-content">
        <div class="login2" v-show="!isSign">
          <el-form
            :model="registerForm"
            :rules="registerRules"
            :label-position="regPosition"
            ref="registerForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="name" label="名称">
              <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="mobilePhone" label="手机号码">
              <el-input v-model="registerForm.mobilePhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input :type="passw" v-model="registerForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="password2" label="确认密码">
              <el-input  :type="passw"  v-model="registerForm.password2" placeholder="再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('registerForm')">确定</el-button>
              <el-button type="primary" @click="goback">返回</el-button>
            </el-form-item>
          </el-form>
        </div>

        <transition name="el-zoom-in-center">
          <div class="login" v-show="isSign">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :label-position="labelPosition"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="psd">
                <el-input :type="passw" v-model="ruleForm.psd" placeholder="请输入密码">
                  <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button type="primary" @click="sgin">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  height: 160%;
  background-image: url(../../assets/bk.png);
  overflow: hidden;
}
.login-content {
  width: 50%;
  background-color: #ffffff;
}
.login {
  margin: auto;
  width: 80%;
  height: 158px;
  padding: 18px;
  margin-top: 35%;
}

.login2 {
  margin: auto;
  width: 80%;
  height: 158px;
  padding: 18px;
  margin-top: 15%;
}

.logo {
  width: 50%;
}
.logo_content {
  height: 50%;
  margin-top: 25%;
  margin-left: 10%;
  color: #ffffff;
}
.welcome {
  font-size: xx-large;
}
.welcome_detail {
  margin-left: 10%;
  margin-top: 10%;
}
.sgin {
  display: flex;
  justify-content: center;
  height: 40%;
  width: 55%;
  margin: auto;
  margin-top: 10%;
  background: rgba(121, 106, 238, 0.9);
}
</style>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      regPosition: "right",
      ruleForm: {
        name: "12312341003",
        psd: "nihao123"
      },
      isSign: true,
      icon: "el-input__icon el-icon-view",
      passw: "password",
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        psd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      registerForm: {
        name: "",
        mobilePhone: "",
        password: "",
        password2: ""
      },
      registerRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        mobilePhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          localStorage.setItem("token", "");
          this.$server
            .post("http://132.232.17.86:8060/api/auth", {
              password: this.ruleForm.psd,
              account: this.ruleForm.name
            })
            .then(data => {
              console.log(data);
              console.log("登录成功~~");
              localStorage.setItem("token", data.token);
              console.log(localStorage.getItem("token"));
              this.$router.push({ path: "/home" });
            })
            .catch(data => {
              console.log(data);
              this.$message.error("登陆失败" + data);
            });
        } else {
          return false;
        }
      });
    },
    submit(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.registerForm.name);

          this.$server
            .post("http://132.232.17.86:8060/brand/register", {
              name: this.registerForm.name,
              mobilePhone: this.registerForm.mobilePhone,
              password: this.registerForm.password,
              logo: "",
              countryCode: "86",
              introduction: "我们家的公寓超级好玩！！"
            })
            .then(data => {
              console.log(data);
              console.log("登录成功~~");
              this.$message({
                message: "恭喜您已注册成功，请登陆！",
                type: "success"
              });
              this.goback();
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sgin: function() {
      console.log("注册。。。。。。");
      this.isSign = false;
    },
    goback: function() {
      this.isSign = true;
    },
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passw == "text") {
        this.passw = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-loading";
      }
    }
  }
};
</script>
