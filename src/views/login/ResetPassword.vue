<template>
    <div class="">
        <div class="input-email" v-show="readPassword">
            <el-form :label-position="labelPosition" class="inputBox center" label-width="200px"  :model="password" :rules="rules" ref="password">
            <el-form-item :label="this.$i.login.text.newPassword" prop="pass">
                <el-input v-model="password.pass" type="password" :placeholder="this.$i.login.placeholder.password"  style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item :label="this.$i.login.text.repeatThePassword" prop="checkPass">
                <el-input v-model="password.checkPass" type="password" :placeholder="this.$i.login.placeholder.password"  style="width:200px;"></el-input>
            </el-form-item>
            </el-form>
            <div class="inputBox btn">
                <el-button type="primary" @click="Next('password')" :loading="loading" :disabled="sendFlag">{{$i.login.btn.submit }}</el-button>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>

export default {
  name: "inputEmail",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$i.login.prompt.inputYourPassword));
      } else {
        if (this.password.checkPass !== "") {
          this.$refs.password.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$i.login.prompt.checkpassword));
      } else if (value !== this.password.pass) {
        callback(new Error(this.$i.login.prompt.passwordMistake));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      readPassword: false,
      loading: false,
      password: {
        pass: "",
        checkPass: ""
      },
      sendFlag:false,
      bFlage:true,
      rules: {
        pass: [
          {
            min: 6,
            message: this.$i.login.prompt.passwordLength,
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          {
            min: 6,
            message: this.$i.login.prompt.passwordLength,
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postUserPasswordReset();
        } else {
          return false;
        }
      });
    },
    getUserValidateReset() {
      let { activeToken, email,reset_email } = this.$route.query;
      if (!activeToken) {
        return this.$message({
          type: "warning",
          message: this.$i.login.prompt.signlinkFailureInSuccess,
          onClose: () => {
            this.$router.push({
              path: "/inputEmail"
            });
          }
        });
      }
      this.$ajax.get(this.$apis.GET_USER_VALIDATE_RESET, { activeToken, email })
        .then(res => {
          this.readPassword = true;
        }).catch(err=>{
        });
    },
    postUserPasswordReset() {
        this.loading = true;
        let { activeToken, email } = this.$route.query;
        this.$ajax.post(this.$apis.POST_USER_PASSWORD_RESET, {
            email: email,
            token: activeToken,
            password: this.password.checkPass
            })
        .then(res => {
            this.$message({
                type: "success",
                message: this.$i.login.prompt.resetSuccess,
                onClose: () => {
                this.$router.push({
                    path: "/forgetPassword/Finish"
                });
                }
            });
            this.sendFlag = true
            this.loading = false;
        })
        .catch(res => {
            this.loading = false;
        });
    }
  },
  created() {
      this.getUserValidateReset();
      this.$sessionStore.set('query',this.$route.query);
  }
};
</script>
<style lang="less" scoped>
.input-email {
  flex: 1;
  display: flex;
  flex-direction: column;
  .inputBox {
    padding: 70px 0;
    margin: 0 auto;
    &.center {
      height: 40%;
      margin: 0 auto;
    }
    .form-input {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 30px;
    }
    &.btn {
      text-align: center;
      padding-left: 10%;
    }
    label {
      width: 40%;
      text-align: right;
      padding-right: 15px;
    }
  }
}
.fromOpacity{
    width:100%; 
    height:100%; 
    background: rgba(0,0,0,.8);
    z-index: 999;
}
</style>

