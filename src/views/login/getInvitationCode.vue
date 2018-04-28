<template>
    <section class="get-invitation-code">
        <div class="contianer">
            <div class="hd">
                <h4> {{ $t('login.text.RequestToGetInvitationCode') }} </h4>
                <p>Please submit your company infomation, and we will contact you soon, if you have any question, feel free to contact us：email-xxx@xxx.com; tel-123456789</p>
            </div>
            <el-form label-width="200px" class="form-box" :model="companyInfo" :rules="rules" ref="companyInfo">
                <div class="form-wrap">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.email')" class="right" prop="email">
                                <el-input style="width: 300px" v-model="companyInfo.email" placeholder="Input email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.companyType')" prop="companyType">
                                <el-select v-model="companyInfo.companyType" filterable placeholder="Select companyType"  style="width: 300px">
                                    <el-option
                                        v-for="item in companyInfo.companyTypeInfo"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                        style="width: 300px">
                                    </el-option>
                                </el-select>  
                                <!-- <el-select v-model="companyInfo.companyType" filterable placeholder="Select companyType"  v-else-if="companyInfo.type === 1" style="width: 300px">
                                    <el-option
                                        v-for="item in companyInfo.optionsSupplier"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                        style="width: 300px">
                                    </el-option>
                                </el-select> 
                                <el-select v-model="companyInfo.companyType" filterable placeholder="Select companyType" v-else style="width: 300px">
                                    <el-option
                                        v-for="item in companyInfo.optionsCustomer"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                        style="width: 300px">
                                    </el-option>
                                </el-select>    -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.companyName')"  prop="companyName" class="right">
                                <el-input placeholder="Input company name" style="width: 300px" v-model="companyInfo.companyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.contactNumber')" prop="companyTel">
                                <el-input style="width: 300px" v-model="companyInfo.companyTel"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.country')" class="right" >
                                <el-select v-model="countryCode" placeholder="请选择"  style="width: 300px">
                                    <el-option
                                    v-for="item in country"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    style="width: 300px">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.city')" >
                                <el-input placeholder="Please city" type="text"  style="width: 300px" v-model="companyInfo.city"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.address')" class="right">
                                <el-input style="width: 300px" v-model="companyInfo.address"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.website')" >
                                <el-input style="width: 300px" v-model="companyInfo.website"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="bottom-btn">
                <div class="btn-wrap">
                    <el-button type="primary" @click="submitForm('companyInfo')">{{ $tc('login.btn.submit') }}</el-button>
                    <el-button @click="backSignUp">{{ $tc('login.btn.cancel') }}</el-button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    // import {provinceAndCityData, CodeToText } from 'element-china-area-data'
    export default {
        name:'',
        data() {
            return {
                single:false,
                country:[],
                countryCode:'',
                selectedOptions: [],
                companyType:2,
                partnerType:'',
                companyInfo:{
                    email:'',
                    tenantType: 0, //租户类型
                    companyType: '',                  
                    companyName: '',
                    website: '',
                    companyTel: '',
                    city: '',
                    address: '',
                    companyTypeInfo:[],
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
                    type:''
                },
                rules: {
                    companyName:[
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur,change' }
                    ],
                    companyType:[
                        { required: true, message: '请输入公司类型', trigger: 'blur' },
                    ],
                    companyTel: [
                        {  required: true, message: '请输入联系方式', trigger: 'blur' },
                        {  max: 13, message: '长度在13个字符以内', trigger: 'blur,change' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                }
            }
        },
        created() {
              this.getCountry()
            // this.$route.query.type 从url上获取那个端过来进行判断 
            if(this.$route.query.type == 2){
                this.companyInfo.companyTypeInfo = this.companyInfo.optionsSupplier
                 this.partnerType = 2
            }else if(this.$route.query.type == 1){
                 this.companyInfo.companyTypeInfo = this.companyInfo.optionsCustomer
                 this.partnerType = 1
            }else{
                this.companyInfo.companyTypeInfo = this.companyInfo.optionsService
                this.partnerType = 3
            }
        },
        methods: {
            backSignUp(){
                this.$router.push('/signUp');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.registerApplication()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
             getCountry(){
                //获取国家
                this.$ajax.get(this.$apis.get_country).then(res=>{
                  this.country = res     
                }).catch(err=>{
                    console.log('请求失败')
                })
            },
            registerApplication(){
                const params = {
                    email:this.companyInfo.email,
                    tenantType: 0, //租户类型
                    partnerType:this.partnerType,               //贸易类型
                    companyType: this.partnerType,
                    companyName: this.companyInfo.companyName,
                    website: this.companyInfo.website || '',
                    companyTel: this.companyInfo.companyTel || '',
                    country:  this.countryCode || '',
                    city: this.companyInfo.city || '',
                    address: this.companyInfo.address || '',
                }
                console.log(params)
               this.$ajax.post(this.$apis.post_user_application, params)
                .then(res => {
                    this.$message({
                        showClose: true,
                        message: '提交成功，我们将尽快联系您！',
                        center: true
                    });
                }).catch(res =>{
                
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .get-invitation-code {
        display:flex;
        width:100%;
        min-height:100vh;
        background:#f4f4f4;
        padding:20px;
        box-sizing: border-box;
        .contianer {
            padding:40px;
            flex:1;
            background:#fff;
            display:flex;
            flex-direction:column;
            box-sizing: border-box;
            .hd {
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-bottom:1px solid #f4f4f4;
                text-align: center;
                p, h4 {
                    padding-bottom:15px;
                }
                h4 {
                    font-size:16px;
                    color:#72777e;
                }
                p {
                    font-size:14px;
                    line-height:18px;
                }
            }
            .form-box {
                padding-bottom:50px;
                padding-top:20px;
                flex:2;
                box-sizing: border-box;
                &.active {
                    padding-bottom:100px;
                }
                .right{
                float: right;
                }
                .form-wrap {
                    // display:flex;
                    // flex-wrap:wrap;
                    .form {
                        width:50%;
                        margin-top:20px;
                        display:flex;
                        align-items: center;
                        &.heavy {
                            label {
                                position: relative;
                                &::after {
                                    position:absolute;
                                    right:5px;
                                    top:50%;
                                    margin-top:-4px;
                                    content:'*';
                                    color:#f44336;
                                    font-size:15px;
                                }
                            }
                        }
                        label {
                            width: 150px;
                            text-align: right;
                            padding-right:15px;
                            box-sizing: border-box;
                        }
                    }
                }
            }
            .bottom-btn {
                .choice {
                    padding:0 100px;
                    height: 80px;
                    display:flex;
                    align-items: center;
                }
                .btn-wrap {
                    width: 300px;
                    margin:0 auto;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
