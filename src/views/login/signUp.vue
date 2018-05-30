<template>
    <section class="signUp">
        <div class="container">
            <div class="form-box active">
                <h4 class="hd">{{ $t('login.text.userInformation') }}</h4>
                <div style="padding-top:30px">
                    <el-form label-width="200px" :model="userInfo" :rules="rules" ref="userInfo" >
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.invitationCode')"  prop="invitationCode">
                                    <el-input :placeholder="$tc('login.placeholder.invitationCode')" type="text" v-model="userInfo.invitationCode " style="max-width:200px" @change="getCompany()"/>
                                    <router-link :to="{path:'getInvitationCode', query: {type : this.$route.query.type}}" id="a">Go Submit a Request>></router-link>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.userName')" prop="userName">
                                     <el-input :placeholder="$tc('login.placeholder.username')" type="text" v-model="userInfo.userName" clearable style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.email')" prop="email">
                                    <el-input :placeholder="$tc('login.placeholder.email')" type="email"  v-model="userInfo.email" clearable style="max-width:200px" />
                                    <span>This will be your log in email</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.password')" prop="password">
                                    <el-input :placeholder="$tc('login.placeholder.password')" type="password" clearable v-model="userInfo.password" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.tel')" prop="userTel">
                                     <el-input :placeholder="$tc('login.placeholder.tel')" type="text" v-model="userInfo.userTel" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item prop="checkpassword">
                                    <el-input :placeholder="$tc('login.placeholder.checkpassword')" type="password" clearable v-model="userInfo.checkpassword" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="form-box">
                            <h4 class="hd">{{ $tc('login.text.companyInformation') }}</h4>
                            <div style="padding-top:30px">
                                 <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.companyName')" prop="name">
                                            <el-input :placeholder="$tc('login.placeholder.companyName')" type="text" v-model="userInfo.name" clearable style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.companyType')" prop="companyTypeN">
                                            <el-select v-model="userInfo.companyTypeN" :placeholder="$tc('login.placeholder.companyType')" style="width: 200px">
                                                <el-option
                                                    v-for="item in Type"
                                                    :key="item.value"
                                                    :label="item.value"
                                                    :value="item.value"
                                                    style="width: 200px">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.contactNumber')" prop="tel">
                                            <el-input :placeholder="$tc('login.placeholder.contactNumber')" type="text" v-model="userInfo.tel" style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.website')" >
                                            <el-input :placeholder="$tc('login.placeholder.website')" v-model="userInfo.website" type="url"  clearable style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.country')">
                                            <el-select v-model="userInfo.country" :placeholder="$tc('login.placeholder.country')"  style="width: 200px">
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
                                        <el-form-item :label="$tc('login.getInvitationCode.city')">
                                            <el-input :placeholder="$tc('login.placeholder.city')" type="text"  v-model="userInfo.city"  style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.address')">
                                            <el-input :placeholder="$tc('login.placeholder.address')" type="text" v-model="userInfo.address" style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="bottom-btn">
                                    <div class="choice">
                                        <el-checkbox v-model="single" :click="agreement(single)">I have readed "xxx"</el-checkbox>
                                    </div>
                                    <div class="btn-wrap">
                                        <el-button type="primary" @click="submitForm('userInfo')" :disabled="!single">{{ $tc('login.btn.ok') }}</el-button>
                                        <el-button @click="backSignIn">{{ $tc('login.btn.cancel') }}</el-button>
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
        name:'signUp',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$tc('login.prompt.inputYourPassword')));
                }else if(this.userInfo.password.indexOf(" ")>=0){
                     callback(new Error(this.$tc('login.prompt.passwordsCannotHaveSpaces')));
                } else if(!/^[^\u4e00-\u9fa5]{6,}$/.test(this.userInfo.password)){
                    callback(new Error(this.$tc('login.prompt.passwordLength')));
                }else{
                if (this.userInfo.checkpassword !== '') {
                    this.$refs.userInfo.validateField('checkpassword');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error(this.$tc('login.prompt.checkpassword')));
                } else if (value !== this.userInfo.password) {
                callback(new Error(this.$tc('login.prompt.passwordMistake')));
                } else {
                callback();
                }
            };
            return {
                single:false,
                country:[],
                userInfo:{
                    tenantType:0,
                    country:'',
                    userName:'',
                    email:'',
                    password:'',
                    userTel:'',
                    checkpassword:'',
                    name:'',
                    companyTypeN:'',
                    tel:'',
                    website:'',
                    country:'',
                    city:'',
                    address:'',
                    invitationCode:'',
                },
                Type:[],
                optionsSupplier:
                [{
                    value: 'factory',
                    label: '工厂',
                    },{
                    value: 'trader',
                    label: '贸易商',
                    },{
                    value: 'shop',
                    label: '商铺',
                }],
                optionsCustomer:
                [{
                    value: 'large-scale supermarket',
                    label: '大型商超',
                    },{
                    value: 'chain supermarket',
                    label: '连锁超市',
                    },{
                    value: 'trader',
                    label: '贸易商',
                   },{
                    value: 'cross-border e-commerce',
                    label: '跨境电商',
                }],
                optionsService:
                [{
                    value: 'logistics company',
                    label: '物流公司',
                    },{
                    value: 'customs broker',
                    label: '报告公司',
                    },{
                    value: 'expert agent',
                    label: '进出口公司',
                    },{
                    value: 'trading company',
                    label: '工厂',
                    },{
                    value: 'inspect company',
                    label: '贸易公司',
                    },{
                    value: 'financial company',
                    label: '验货公司',
                    },{
                    value: 'shipping agent',
                    label: '金融公司',
                }],
                rules: {
                    invitationCode:[
                        { required: true, message: this.$tc('login.prompt.invitationCode'), trigger: 'blur' },
                    ],
                    userName:[
                        { required: true, message: this.$tc('login.prompt.inputYourUserName'), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$tc('login.prompt.inputYourEmail'), trigger: 'blur' },
                        { type: 'email', message: this.$tc('login.prompt.pleaseEnterCorrectEmail'), trigger: 'blur,change' }
                    ],
                    password:[
                        { required: true, message: this.$tc('login.prompt.inputYourPassword'), trigger: 'blur' },
                        { type: 'string', min: 6, validator: validatePass, trigger: 'blur' }
                    ],
                    userTel:[
                         {  required: true, message: this.$tc('login.prompt.inputYourTel'), trigger: 'blur' },
                        {  max: 13, message: this.$tc('login.prompt.telLength'), trigger: 'blur,change' }
                    ],
                    checkpassword: [
                        { required: true, message: this.$tc('login.prompt.checkpassword'), trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: this.$tc('login.prompt.companyName'), trigger: 'blur' },
                        { max: 100, message: this.$tc('login.prompt.companyNamelength'), trigger: 'blur,change' }
                    ],
                    companyTypeN:[
                        { required: true, message: this.$tc('login.prompt.companyType'), trigger: 'blur' },
                    ],
                    tel: [
                        {  required: true, message: this.$tc('login.prompt.inputYourTel'), trigger: 'blur' },
                        {  max: 13, message: this.$tc('login.prompt.telLength'), trigger: 'blur,change' }
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
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            handleChange(value) {
                console.log(value)
            },
            backSignIn(){
                window.history.go(-1)
            },
            agreement(val){
                //跳转协议
                // if(val){

                // }
            },
            signUp(){
                //注册
                 const params = {
                    tenantType: 0,
                    partnerType: this.userInfo.companyType || this.$route.query.type,
                    companyType: this.userInfo.companyType || this.$route.query.type,
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
                this.$ajax.post(this.$apis.post_user_signup,params).then(res =>{
                    //注册成功，系统提示注册成功并跳转对应的workbench页面（采购商、供应商、服务商）
                    if(res.partnerType == this.$route.query.type){
                        this.$message.warning({
                            message: this.$tc('login.prompt.signUpSuccess'),
                            type: 'success',
                        });
                        let  baseUrl = this.$localStore.get('URL')
                        , url = `${baseUrl}?token=${Base64.encode(res.userSessionToken)}`;
                        window.location.href = url;
                    }else{
                        this.$message.warning({message:this.$tc('login.prompt.userNoExist')});
                    }
                }).catch(res =>{
                    console.log(res)
                });
            },
            getCompany(){
                //校验邀请码
                this.$ajax.get(`${this.$apis.get_user_invitationCode}/${this.userInfo.invitationCode}`).then(res =>{
                    if(res.partnerType == this.$route.query.type){
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
                     }else{
                          this.$message.warning({message:this.$tc('login.prompt.invitationCodeInvalid')});
                     }
                }).catch(res =>{
                    console.log(res)
                });
            },
            getCountry(){
                //获取国家
                this.$ajax.get(this.$apis.get_country).then(res=>{
                  this.country = res
                }).catch(err=>{
                    console.log(err)
                })
            },
            istype(){
                switch (Number(this.$route.query.type))
                {
                    case 1:
                        this.Type = this.optionsCustomer;
                        break;
                    case 2:
                        this.Type = this.optionsSupplier;
                        break;
                    case 3:
                        this.Type = this.optionsService;
                        break;
                }
            },
        },
        created() {
            this.getCountry();
            this.istype();
        }
    }
</script>
<style lang="less" scoped>
    .signUp {
        padding:20px;
        background:#f4f4f4;
        width:100%;
        min-height:100vh;
        box-sizing: border-box;
        .container {
            min-height:100%;
            background: #fff;
            border-radius: 5px;
            padding:10px 40px;
            .form-box {
                padding-bottom:50px;
                &.active {
                    padding-bottom:100px;
                }
                .hd {
                    font-weight: normal;
                    font-size:15px;
                    height: 40px;
                    line-height:40px;
                    border-bottom:1px solid #efefef;
                }
            }
            .bottom-btn {
                border-top:1px solid #f4f4f4;
                .choice {
                    padding:0 100px;
                    height: 80px;
                    display:flex;
                    align-items: center;
                }
                .btn-wrap {
                    width: 300px;
                    padding-bottom:20px;
                    margin:0 auto;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
        #a {
            color:#108EE9;
            font-size: 14px;
            text-decoration: none;
            line-height: 100%;
            &:hover {
                opacity: .8;
            }
         }
        span{
            color: #999999;
            font-size: 12px;
        }
    }
</style>
