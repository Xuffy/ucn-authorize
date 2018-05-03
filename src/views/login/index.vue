<template>
  <div class="login">
    <div class="login-top"></div>
    <section id="login-app" class="login-box" v-loading="loading2" element-loading-text="登陆加载中">
      <div style="text-align: center;">
        <i class="logo"></i>
        <span class="title">{{ $tc('login.text.signIn') }}</span>
      </div>
      <div class="login-form">
        <div class="from">
          <el-form :model="formInline" label-width="100px" :rules="ruleInline" ref="formInline">
            <div class="from-item">
              <el-form-item :label="$tc('login.userInformation.email')" prop="email">
                <el-input v-model="formInline.email" type="email" placeholder="Email" style="width:300px"></el-input>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item :label="$tc('login.userInformation.password')" prop="password">
                <el-input v-model="formInline.password" type="password" placeholder="Password"
                          style="width:300px" @keyup.enter.native="handleSubmit('formInline')"></el-input>
              </el-form-item>
            </div>
            <div class="login-link" style="margin-top:50px;">
              <!-- <el-checkbox v-model="checked">{{ $t('login.text.remenberMe') }}</el-checkbox> -->
              <router-link to="/forgetPassword">{{ $tc('login.text.forgetPassword') }}?</router-link>
            </div>
            <el-button type="primary" @click="handleSubmit('formInline')"  style="width:100%;margin:10px 0;" >
              {{$tc('login.text.loginIn')}}
            </el-button>
            <div class="login-link active">
              <router-link
                :to="{path:'signUp', query: {type : this.$route.query.type}}">
                {{$tc('login.text.noAccount')}}? {{$tc('login.text.signUpNow')}}>>
              </router-link>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';

  export default {
    name: 'login',
    data() {
      return {
        loading2: false,
        formInline: {
          email: '',
          password: ''
        },
        ruleInline: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'change'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.$localStore.clearAll();
      this.$sessionStore.clearAll();
      this.formInline.email = this.$cookieStore.getCookie('username');
      this.formInline.password = this.$cookieStore.getCookie('password');
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.judgeCookieSign()
          } else {
            this.$message({
              message: '请输入正确的用户名密码！',
              type: 'warning',
            });
            return false;
          }
        });

      },
      judgeCookieSign() {
        let baseUrl = this.$route.query.redirect;
        this.loading2 = true;
        if (!this.formInline.email || !this.formInline.password) {
          return false;
        }
        this.$ajax.post(this.$apis.post_auth_signin, this.formInline)
          .then(data => {
            this.loading2 = false
            let expire = new Date(new Date().valueOf() + (24 * 60 * 60 * 1000 * 30))
              , url = `${Base64.decode(baseUrl)}?token=${Base64.encode(data.userSessionToken)}`;
            this.$cookieStore.addCookie('username', this.formInline.email, expire);
            this.$cookieStore.addCookie('password', this.formInline.password, expire);
            this.$localStore.set('URL', Base64.decode(baseUrl));
            window.location.href = url;
          }) 
          .catch((res) => {
            this.loading2 = false
          });
      },
    }
  }
</script>
<style scoped lang="less">
  .login {

  .login-link {
    display: flex;
    justify-content: flex-end;
  &
  .active {
    justify-content: center;
  }

  a {
    color: #409EFF;
    font-size: 12px;

  &
  :hover {
    opacity: .6;
  }

  }
  }
  }
  .login .ivu-input-group-prepend {
    background-color: #ffffff;
    border: none;
    width: 40px;
    text-align: left;
  }

  .login .ivu-form-item-content {
    line-height: 40px;
    height: 40px;
  }

  .login .ivu-input {
    height: 40px;
    border: none;
    padding: 0;
    border-radius: 0;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-input:focus {
    border: none;
    box-shadow: none;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-input:hover {
    border-color: none;
    border-bottom: 1px solid #e6e6e6;
  }

  .login .ivu-form-item-error-tip {
    left: 40px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login-top {
    position: absolute;
    width: 100%;
    height: 398px;
    background-image: url("../../assets/images/login-back.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  .login-box {
    max-width: 500px;
    width: 500px;
    height: 380px;
    background-color: #fff;
    position: fixed;
    top: 45%;
    left: 50%;
    margin-top: -160px;
    margin-left: -250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  }

  .login-box .logo {
    display: inline-block;
    background-image: url("../../assets/images/logo.jpg");
    width: 150px;
    height: 68px;
    vertical-align: middle;
    margin: 30px 20px 20px 0;
    background-size: 100% 100%;
  }

  .login-box .title {
    display: inline-block;
    vertical-align: middle;
    font-size: 50px;
  }

  .login-form {
    padding-left: 45px;
    padding-right: 45px;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

  .from {

  .from-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

  span {
    width: 100px;
    font-size: 12px;
    color: #666;
    text-align: right;
    padding-right: 10px;
  }

  }
  }
  }


</style>
