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
                                    <el-input placeholder="Please input your Invitation code" type="text" v-model="invitationCode" style="max-width:200px" />
                                    <router-link to="/getInvitationCode" id="a">Go Submit a Request>></router-link>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.userName')" prop="userName">
                                     <el-input placeholder="nput your username" type="text" v-model="userInfo.userName" clearable style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.email')" prop="useremail">
                                    <el-input placeholder="xxxx@xxx.com" type="email" v-model="userInfo.useremail" clearable style="max-width:200px" />
                                    <span>This will be your log in email</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.password')" prop="password">
                                    <el-input placeholder="Input your password" type="password" clearable v-model="userInfo.password" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$tc('login.userInformation.tel')" prop="userTel">
                                     <el-input placeholder="IPlease input your contact number" type="text" v-model="userInfo.userTel" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item prop="checkpassword">
                                    <el-input placeholder="Input your password again" type="password" clearable v-model="userInfo.checkpassword" style="max-width:200px" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="form-box">
                            <h4 class="hd">{{ $tc('login.text.companyInformation') }}</h4>
                            <div style="padding-top:30px">
                                 <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.companyName')" prop="name">
                                            <el-input placeholder="Input company name" type="text" v-model="userInfo.name" clearable style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.companyType')" prop="companyType">
                                            <el-select v-model="userInfo.companyTypeN" placeholder="Select companyType" style="width: 200px">
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
                                            <el-input placeholder="Input company name" type="text" v-model="userInfo.tel" style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.website')" >
                                            <el-input placeholder="Input company website" v-model="userInfo.website" type="url"  clearable style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.country')">
                                            <el-select v-model="userInfo.country" placeholder="请选择"  style="width: 200px">
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
                                            <el-input placeholder="Please city" type="text"  v-model="userInfo.city"  style="max-width:200px" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item :label="$tc('login.getInvitationCode.address')">
                                            <el-input placeholder="Please address" type="text" v-model="userInfo.address" style="max-width:200px" />
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
                callback(new Error('请输入密码'));
                } else {
                if (this.userInfo.checkpassword !== '') {
                    this.$refs.userInfo.validateField('checkpassword');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.userInfo.password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            // var checkPhone = (rule, value, callback) => {
            //     let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            //     let tel =  /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
            //     if(!tel.test(value) || !mobile.test(value)){
            //         return callback(new Error('请填写联系电话(座机格式\'区号-座机号码\')'));
            //     }
            // };
            return {
                single:false,
                country:[],
                invitationCode:'cstX1J',
                userInfo:{
                    tenantType:0,
                    country:'',
                    userName:'',
                    useremail:'',
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
                        { required: true, message: '请输入邀请码', trigger: 'blur' },
                        { min: 3, max:6, message: '长度在 3 到 6 个字符', trigger: 'blur,change' }
                    ],
                    userName:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    useremail: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, validator: validatePass, trigger: 'blur' }
                    ],
                    userTel:[
                        // {  required: true, message: '请输入联系方式', trigger: 'blur' },
                        {  max: 13, message: '长度在13个字符以内', trigger: 'blur,change' }
                    ],
                    checkpassword: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur,change' }
                    ],
                    companyType:[
                        { required: true, message: '请输入公司类型', trigger: 'blur' },
                    ],
                    tel: [
                        {  required: true, message: '请输入联系方式', trigger: 'blur' },
                        {  max: 13, message: '长度在13个字符以内', trigger: 'blur,change' }
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
                  this.signUp()
                // this.$refs[formName].validate((valid) => {
                // if (valid) {
                //      this.signUp()
                // } else {
                //     console.log('error submit!!');
                //     return false;
                // }
                // });
            },
            handleChange(value) {
                console.log(value)
            },
            backSignIn(){
                this.$router.push('/');
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
                    partnerType: this.userInfo.companyType,
                    companyType: this.userInfo.companyType,
                    companyName: this.userInfo.name,
                    website: this.userInfo.website,
                    companyTel: this.userInfo.tel,
                    country: this.userInfo.country,
                    city: this.userInfo.city,
                    address: this.userInfo.address,
                    invitationCode: this.invitationCode,
                    userName: this.userInfo.userName,
                    email: this.userInfo.useremail,
                    password: this.userInfo.password,
                    userTel: this.userInfo.userTel
                }
                console.log(params)
                this.$ajax.post(this.$apis.post_user_signup,params).then(res =>{
                    console.log(res)
                    //注册成功，系统提示注册成功并跳转对应的workbench页面（采购商、供应商、服务商）
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        // onClose(){
                        //      this.$router.push('/');
                        // }
                    });
                    let  baseUrl =  this.$route.query.redirect
                    const finalUrl = `${baseUrl}?token=${res.userSessionToken}`
                }).catch(res =>{
                    console.log(res)
                });
            },
            getCompany(){
                //校验邀请码  
                  console.log(this.invitationCode)
                this.$ajax.get(`${this.$apis.get_user_invitationCode}/${this.invitationCode}`).then(res =>{
                    if(res.companyType == 3){
                        this.Type = this.optionsService
                        console.log(this.Type)
                    }else if(res.companyType == 2){
                        this.Type = this.optionsSupplier
                    }else{
                        this.Type = this.optionsCustomer
                    }
                    console.log(res)
                    this.userInfo = res
                }).catch(res =>{
                    console.log('请求失败')
                });
            },
            getCountry(){
                //获取国家
                this.$ajax.get(this.$apis.get_country).then(res=>{
                  this.country = res    
                }).catch(err=>{
                    console.log(err)
                    console.log('请求失败')
                })
            },
        },
        created() {
             this.getCompany()
              this.getCountry()
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
            width:100%;
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
