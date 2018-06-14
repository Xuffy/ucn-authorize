<template>
  <div class="activation">
    <transition name="el-zoom-in-center">
      <el-card class="card-box" v-show="showEdit">
        <div slot="header" class="clearfix">
          <span>激活账户-设置账户密码</span>
          <!--<el-button style="float: right; padding:0" type="text">登录</el-button>-->
        </div>
        <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form-box">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" :loading="submitLoading">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
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
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能少于6位'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
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
        text: '正在验证',
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
            this.validateLoading.close();
            this.showEdit = true;
          })
          .catch(() => {
            this.validateLoading.close();
            this.$notify.error({
              title: '错误',
              message: '激活验证失败',
              duration: 0
            });
          });
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
