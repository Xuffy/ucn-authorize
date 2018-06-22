<template>
  <div class="activation">
    <transition name="el-zoom-in-center">
      <el-card class="card-box" v-show="showEdit">
        <div slot="header" class="clearfix">
          <span v-text="$i.activation.title"></span>
          <!--<el-button style="float: right; padding:0" type="text">登录</el-button>-->
        </div>
        <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form-box">
          <el-form-item :label="$i.activation.pwd" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item><br>
          <el-form-item :label="$i.activation.confirmPwd" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item><br><br>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" :loading="submitLoading">{{$i.login.btn.submit}}</el-button>
            <el-button @click="resetForm">{{$i.activation.reset}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
  </div>
</template>
<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';

  export default {
    name: 'activation',
    data() {
      let validatePass
        , validatePass2;

      validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i.login.placeholder.password));
        } else if (value.length < 6) {
          callback(new Error(this.$i.login.prompt.passwordLength));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i.login.placeholder.checkpassword));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error(this.$i.login.prompt.passwordMistake));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [{validator: validatePass, trigger: 'blur'}],
          checkPass: [{validator: validatePass2, trigger: 'blur'}]
        },
        showEdit: false,
        validateLoading: false,
        submitLoading: false,
        queryString: {}
      }
    },
    mounted() {
      this.validateLoading = this.$loading({
        lock: true,
        text: this.$i.activation.authenticating,
        spinner: 'el-icon-loading',
        customClass: 'activation-loading'
      });
      this.queryString = this.$route.query || {};
      this.validateUser();
    },
    methods: {
      validateUser() {
        this.$ajax.get(this.$apis.USER_VALIDATE_ACTIVE,
          {token: this.queryString.activeToken, email: this.queryString.email})
          .then(res => {
            this.showEdit = true;
          })
          .finally(()=>this.validateLoading.close());
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.submitLoading = true;
            this.$ajax.put(this.$apis.USER_ACTIVE, {
              email: this.queryString.email,
              activeToken: this.queryString.activeToken,
              password: this.ruleForm.pass
            }).then(res => {
              this.$sessionStore.clearAll();
              this.$localStore.clearAll();
              window.location.href = Base64.decode(this.queryString.redirect);
            }).finally(() => {
              this.submitLoading = false;
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>
<style scoped>
  .card-box {
    width: 400px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .form-box {
    padding: 10px 20px 0 10px;
  }


</style>
<style>
  .activation-loading .el-icon-loading {
    font-size: 30px;
  }

</style>
