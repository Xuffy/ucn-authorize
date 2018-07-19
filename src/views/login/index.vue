<template>
  <div class="login">
    <div class="login-box" v-bind:class="{ loginBoxH : isIdentifyingCode }">
      <div class="left-form">
        <i class="logo"></i>
        <div class="form-box">

          <input type="text" class="username" :placeholder="$i.login.userInformation.email"
                 v-model="form.email"  @blur="checkVerificationCode">

          <input type="password" class="password" :placeholder="$i.login.userInformation.password"
                 v-model="form.password" @keyup.enter="submitLogin">

          <div v-show="isIdentifyingCode">
            <input type="text" class="identifyingCode" :placeholder="$i.login.userInformation.identifyingCode"
            v-model="form.verificationCode" @keyup.enter="submitLogin">
            <img class="verificationCode"  :src="src"/>
            <i class="el-icon-refresh refresh" @click="refreshVerificationCode"></i>
          </div>



          <el-button type="primary" size="medium" :loading="loading"
                     @click="submitLogin">{{$i.login.text.loginIn}}
          </el-button>

          <p class="bottom-text">
            <span>{{$i.login.text.noAccount}}?</span>
            <router-link
              :to="{path:'signUp', query: {type : query.type}}">
              {{$i.login.text.signUpNow}}>>
            </router-link>
          </p>
        </div>
      </div>
      <div class="right-box">
        <div class="text-box">
          <p class="sign-title">{{ $i.login.text.signIn}}</p>
          <router-link to="/forgetPassword">{{ $i.login.text.forgetPassword }}?</router-link>
          <router-link
            :to="{path:'signUp', query: {type : query.type}}">
            {{$i.login.text.noAccount}}? {{$i.login.text.signUpNow}}>>
          </router-link>
        </div>
        <div class="back-image"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';

  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        isIdentifyingCode : false,
        src:'',
        form: {
          email: '',
          password: '',
          verificationCode: ''
        },
        query: this.$sessionStore.get('query') || {}
      }
    },
    created() {
     
    },
    mounted() {
      this.form.email = this.$localStore.get('username') || '';
      this.form.password = Base64.decode(this.$localStore.get('password') || '');
       if(this.form.email!=''){
         this.checkVerificationCode();
      }
    },
    methods: {
      submitLogin() {
        let params = _.clone(this.form);
        if (this.$validateForm(params, this.$db.login.signIn)) {
          return false;
        }

        this.loading = true;
        params.partnerType = this.query.type;

        this.$ajax.post(this.$apis.post_auth_signin, params)
          .then(data => {
            let expire = new Date(new Date().valueOf() + (24 * 60 * 60 * 1000 * 30))
              , url = `${Base64.decode(this.query.redirect).replace(/\?/g,'')}?token=${Base64.encode(data.userSessionToken)}`;
            this.$localStore.set('username', this.form.email, expire);
            this.$localStore.set('password', Base64.encode(this.form.password), expire);

            this.$sessionStore.clearAll();
            window.location.href = url;
          })
          .finally((res) =>{
            this.loading = false
            this.checkVerificationCode();
            this.refreshVerificationCode();
          });
      },
      //刷新图片验证码
      refreshVerificationCode(){
        this.src = `${this.$apis.GET_VERIFICATION_CODE_REFRESH}?email=${this.form.email}&t=${Math.random()}`;
      },
      //检查用户是否需要验证验证码
      checkVerificationCode(){
        this.$ajax.get(this.$apis.GET_VERIFICATION_CODE_CHECK, {
              email: this.form.email
        })
        .then(res => {
           if(res.needVerify){
              this.isIdentifyingCode = true;
              this.refreshVerificationCode()
           }else{
              this.isIdentifyingCode = false;
           }
       });
      }
    }
  }
</script>
<style scoped>
  .login {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #212224;
  }

  .login-box {
    width: 760px;
    height: 400px;;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loginBoxH{
    height: 450px;
  }
  .left-form {
    width: 310px;
    height: 100%;
    background-color: #2e2f31;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    float: left;
  }

  .right-box {
    float: left;
    width: 450px;
    height: 100%;
    background-color: #ffffff;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .logo {
    background-image: url("../../assets/images/logo2.png");
    width: 168px;
    height: 45px;
    background-size: 100% 100%;
    display: block;
    margin: 65px 0 0 70px;
  }

  .form-box {
    width: 205px;
    margin-left: 52px;
    margin-top: 15px;
  }

  .username, .password {
    background-color: #2e2f31;
    border: none;
    width: 100%;
    border-bottom: 1px solid #aaaaaa;
    color: #aaaaaa;
    line-height: 30px;
    margin-top: 20px;
    font-size: 14px;
    transition: all .5s;
  }

  .username:hover,
  .password:hover,
  .identifyingCode:hover,
  .username:focus,
  .password:focus
  .identifyingCode:focus{
    color: #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .form-box /deep/ .el-button {
    background-color: #1981f9;
    border-color: #1981f9;
    font-size: 16px;
    width: 100%;
    margin-top: 50px;
    transition: all .5s;
  }

  .form-box /deep/ .el-button:hover {
    background-color: #0663f9;
  }

  .bottom-text {
    font-size: 14px;
    margin-top: 40px;
  }

  .bottom-text span {
    color: #aeaeae;
  }

  .bottom-text a {
    color: #0f84f7;
  }

  .text-box {
    margin: 115px 0px 0 50px;
  }

  .text-box a {
    display: block;
    color: #2e312f;
    font-size: 14px;
    line-height: 20px;
    transition: all .5s;
  }

  .text-box a:hover {
    transform: translate(5px);
  }

  .sign-title {
    font-size: 50px;
    margin-bottom: 20px;
  }

  .back-image {
    background-image: url("../../assets/images/login-back.png");
    width: 450px;
    height: 76px;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    border-bottom-right-radius: 15px;
  }

  .identifyingCode{
    background-color: #2e2f31;
    border: none;
    width: 50%;
    border-bottom: 1px solid #aaaaaa;
    color: #aaaaaa;
    line-height: 30px;
    margin-top: 20px;
    font-size: 14px;
    transition: all .5s;
  }
  .verificationCode{
    display: inline-block;
    width: 25%;
    height: 30px;
    vertical-align: middle;
    margin: 0 5px;
  }
  .refresh{
    vertical-align: middle;
    display: inline-block;
    font-size: 30px;
    color: #eeeeee;
    cursor: pointer;
  }
</style>
