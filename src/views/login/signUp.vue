<template>
  <section class="signUp">
    <div class="container">
      <div class="form-box active">
        <h4 class="hd">{{ $i.login.text.userInformation }}</h4>
        <div style="padding-top:30px">
          <el-form label-width="200px" :model="userInfo" :rules="rules" ref="userInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="this.$i.login.userInformation.invitationCode" prop="invitationCode">
                  <el-input :placeholder="this.$i.login.placeholder.invitationCode" type="text"
                            v-model="userInfo.invitationCode " style="max-width:200px" @change="getCompany()"/>
                  <router-link :to="{path:'getInvitationCode', query: {type : query.type}}" id="a">
                    {{$i.login.text.goSubmitARequest}}>>
                  </router-link>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="this.$i.login.userInformation.userName" prop="userName">
                  <el-input :placeholder="this.$i.login.placeholder.username" type="text" v-model="userInfo.userName"
                            clearable style="max-width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="this.$i.login.userInformation.email" prop="email">
                  <el-input :placeholder="this.$i.login.placeholder.email" type="email" v-model="userInfo.email"
                            clearable style="max-width:200px"/>
                  <span>{{$i.login.text.thisWillBeYourLogInEmail}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="this.$i.login.userInformation.password" prop="password">
                  <el-input :placeholder="this.$i.login.placeholder.password" type="password" clearable
                            v-model="userInfo.password" style="max-width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="this.$i.login.userInformation.tel" prop="userTel">
                  <el-input :placeholder="this.$i.login.placeholder.tel" type="text" v-model="userInfo.userTel"
                            style="max-width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="checkpassword">
                  <el-input :placeholder="this.$i.login.placeholder.checkpassword" type="password" clearable
                            v-model="userInfo.checkpassword" style="max-width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="form-box">
              <h4 class="hd">{{ $i.login.text.companyInformation }}</h4>
              <div style="padding-top:30px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.companyName" prop="name">
                      <el-input :placeholder="this.$i.login.placeholder.companyName" type="text" v-model="userInfo.name"
                                clearable style="max-width:200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.companyType" prop="companyTypeN">
                      <el-select v-model="userInfo.companyTypeN" :placeholder="this.$i.login.placeholder.companyType"
                                 style="width: 200px">
                        <el-option
                          v-for="item in Type"
                          :key="item.id"
                          :label="item.name"
                          :value="item.code"
                          style="width: 200px">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.contactNumber" prop="tel">
                      <el-input :placeholder="this.$i.login.placeholder.contactNumber" type="text"
                                v-model="userInfo.tel" style="max-width:200px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.website">
                      <el-input :placeholder="this.$i.login.placeholder.website" v-model="userInfo.website" type="url"
                                clearable style="max-width:200px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.country">
                      <el-select v-model="userInfo.country" :placeholder="this.$i.login.placeholder.country"
                                 style="width: 200px">
                        <el-option
                          v-for="item in country"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          style="width: 200px">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.city">
                      <el-input :placeholder="this.$i.login.placeholder.city" type="text" v-model="userInfo.city"
                                style="max-width:200px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="this.$i.login.getInvitationCode.address">
                      <el-input :placeholder="this.$i.login.placeholder.address" type="text" v-model="userInfo.address"
                                style="max-width:200px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="bottom-btn">
                  <div class="choice">
                    <el-checkbox v-model="single" :click="agreement(single)">{{$i.login.text.ihaveReaded}} "xxx"
                    </el-checkbox>
                  </div>
                  <div class="btn-wrap">
                    <el-button type="primary" @click="submitForm('userInfo')" :disabled="!single">{{ $i.login.btn.ok
                      }}
                    </el-button>
                    <el-button @click="$router.push({path: '/'})">{{ $i.login.btn.cancel }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';

  export default {
    name: 'signUp',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i.login.prompt.inputYourPassword));
        } else if (this.userInfo.password.indexOf(" ") >= 0) {
          callback(new Error(this.$i.login.prompt.passwordsCannotHaveSpaces));
        } else if (!/^[^\u4e00-\u9fa5]{6,}$/.test(this.userInfo.password)) {
          callback(new Error(this.$i.login.prompt.passwordLength));
        } else {
          if (this.userInfo.checkpassword !== '') {
            this.$refs.userInfo.validateField('checkpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i.login.prompt.checkpassword));
        } else if (value !== this.userInfo.password) {
          callback(new Error(this.$i.login.prompt.passwordMistake));
        } else {
          callback();
        }
      };
      return {
        query: this.$sessionStore.get('query'),
        single: false,
        country: [],
        userInfo: {
          tenantType: 0,
          userName: '',
          email: '',
          password: '',
          userTel: '',
          checkpassword: '',
          name: '',
          companyTypeN: '',
          tel: '',
          website: '',
          country: '',
          city: '',
          address: '',
          invitationCode: '',
        },
        Type: [],
        optionsSupplier: [],
        optionsCustomer: [],
        optionsService: [],
        rules: {
          invitationCode: [
            {required: true, message: this.$i.login.prompt.invitationCode, trigger: 'blur'},
          ],
          userName: [
            {required: true, message: this.$i.login.prompt.inputYourUserName, trigger: 'blur'},
          ],
          email: [
            {required: true, message: this.$i.login.prompt.inputYourEmail, trigger: 'blur'},
            {type: 'email', message: this.$i.login.prompt.pleaseEnterCorrectEmail, trigger: 'blur,change'}
          ],
          password: [
            {required: true, message: this.$i.login.prompt.inputYourPassword, trigger: 'blur'},
            {type: 'string', min: 6, validator: validatePass, trigger: 'blur'}
          ],
          userTel: [
            {required: true, message: this.$i.login.prompt.inputYourTel, trigger: 'blur'},
            {max: 13, message: this.$i.login.prompt.telLength, trigger: 'blur,change'}
          ],
          checkpassword: [
            {required: true, message: this.$i.login.prompt.checkpassword, trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$i.login.prompt.companyName, trigger: 'blur'},
            {max: 100, message: this.$i.login.prompt.companyNamelength, trigger: 'blur,change'}
          ],
          companyTypeN: [
            {required: true, message: this.$i.login.prompt.companyType, trigger: 'blur'},
          ],
          tel: [
            {required: true, message: this.$i.login.prompt.inputYourTel, trigger: 'blur'},
            {max: 13, message: this.$i.login.prompt.telLength, trigger: 'blur,change'}
          ],
          // email: [
          //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          // ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.signUp()
          } else {
            return false;
          }
        });
      },
      agreement(val) {
        //跳转协议
        // if(val){

        // }
      },
      signUp() {
        let {type} = this.$sessionStore.get('query');
        //注册
        const params = {
          tenantType: 0,
          partnerType: this.userInfo.companyType || type,
          companyType: this.userInfo.companyType || type,
          companyName: this.userInfo.name,
          website: this.userInfo.website,
          companyTel: this.userInfo.tel,
          country: this.userInfo.country,
          city: this.userInfo.city,
          address: this.userInfo.address,
          invitationCode: this.userInfo.invitationCode,
          userName: this.userInfo.userName,
          email: this.userInfo.email,
          password: this.userInfo.password,
          userTel: this.userInfo.userTel
        }
        this.$ajax.post(this.$apis.post_user_signup, params).then(res => {
          //注册成功，系统提示注册成功并跳转对应的workbench页面（采购商、供应商、服务商）
          if (res.partnerType == type) {
            this.$message.warning({
              message: this.$i.login.prompt.signUpSuccess,
              type: 'success',
            });
            // let baseUrl = this.$sessionStore.get('query')
            let url = `${Base64.decode(this.query.redirect)}?token=${Base64.encode(res.userSessionToken)}`;
            window.location.href = url;
          } else {
            this.$message.warning({message: this.$i.login.prompt.userNoExist});
          }
        });
      },
      getCompany() {
        if (!this.userInfo.invitationCode) {
          return false;
        }
        let {type} = this.$sessionStore.get('query');

        //校验邀请码
        this.$ajax.get(`${this.$apis.get_user_invitationCode}/${this.userInfo.invitationCode}`).then(res => {
          if (res.partnerType == type) {
            //YsOPY3
            this.userInfo.address = res.address
            this.userInfo.city = res.city
            this.userInfo.companyType = res.companyType
            this.userInfo.country = res.country
            this.userInfo.email = res.email
            this.userInfo.name = res.name
            this.userInfo.partnerType = res.partnerType
            this.userInfo.tel = res.tel
            this.userInfo.website = res.website
            this.userInfo.companyTypeN = this.$localStore.get('type')
          } else {
            this.$message.warning({message: this.$i.login.prompt.invitationCodeInvalid});
          }
        });
      },
      getCountry() {
        //获取国家
        this.$ajax.get(this.$apis.get_country).then(res => {
          this.country = res
        });
      },
      istype() {
        let {type} = this.$sessionStore.get('query');
        switch (type) {
          case '1':
            this.Type = this.optionsCustomer;
            break;
          case '2':
            this.Type = this.optionsSupplier;
            break;
          case '3':
            this.Type = this.optionsService;
            break;
        }
      },
    },
    created() {
       this.$ajax.post(this.$apis.POST_CODE_PART_SIGN,["CUSTOMER_TYPE","SR_TYPE","SP_TYPE"])
        .then(res => {
            this.optionsCustomer = _.findWhere(res, {'code': 'CUSTOMER_TYPE'}).codes;
            this.optionsSupplier = _.findWhere(res, {'code': 'SR_TYPE'}).codes;
            this.optionsService = _.findWhere(res, {'code': 'SP_TYPE'}).codes; 
            this.istype() ;  
        });
      this.getCountry();
    }
  }
</script>
<style lang="less" scoped>
  .signUp {
    padding: 20px;
    background: #f4f4f4;
    width: 100%;
    min-height: 100vh;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .signUp .container {
    min-height: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 10px 40px;
  }

  .signUp .container .form-box {
    padding-bottom: 50px;
  }

  .signUp .container .form-box .active {
    padding-bottom: 100px;
  }

  .signUp .container .form-box .hd {
    font-weight: normal;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #efefef;
  }

  .signUp .container .bottom-btn {
    border-top: 1px solid #f4f4f4;
  }

  .signUp .container .bottom-btn .choice {
    padding: 0 100px;
    height: 80px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .signUp .container .bottom-btn .btn-wrap {
    width: 300px;
    padding-bottom: 20px;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .signUp #a {
    color: #108EE9;
    font-size: 14px;
    text-decoration: none;
    line-height: 100%;
  }

  .signUp #a :hover {
    opacity: .8;
  }

  .signUp span {
    color: #999999;
    font-size: 12px;
  }
</style>
