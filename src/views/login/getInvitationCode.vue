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
                                <el-input style="width: 300px" v-model="companyInfo.email" :placeholder="$tc('login.placeholder.email')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.companyType')" prop="type">
                                <el-select v-model="companyInfo.type" filterable :placeholder="$tc('login.placeholder.companyType')"  style="width: 300px">
                                    <el-option
                                        v-for="item in companyTypeInfo"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                        style="width: 300px">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.companyName')"  prop="companyName" class="right">
                                <el-input :placeholder="$tc('login.placeholder.companyName')" style="width: 300px" v-model="companyInfo.companyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.contactNumber')" prop="companyTel">
                                <el-input style="width: 300px" v-model="companyInfo.companyTel" :placeholder="$tc('login.placeholder.contactNumber')"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.country')" class="right" >
                                <el-select v-model="companyInfo.country" :placeholder="$tc('login.placeholder.country')" style="width: 300px">
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
                                <el-input :placeholder="$tc('login.placeholder.city')" type="text"  style="width: 300px" v-model="companyInfo.city"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.address')" class="right">
                                <el-input style="width: 300px" v-model="companyInfo.address" :placeholder="$tc('login.placeholder.address')"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item :label="$tc('login.getInvitationCode.website')" >
                                <el-input style="width: 300px" v-model="companyInfo.website" :placeholder="$tc('login.placeholder.website')"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="bottom-btn">
                <div class="btn-wrap">
                    <el-button type="primary" @click="submitForm('companyInfo')" :disabled="isDisable">{{ $tc('login.btn.submit') }}</el-button>
                    <el-button @click="backSignUp">{{ $tc('login.btn.cancel') }}</el-button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name:'',
        data() {
            return {
                isDisable: false,
                country:[],
                companyTypeInfo:{},
                companyType:'',
                companyInfo:{
                    tenantType: 0, //租户类型
                    partnerType:'',
                    companyType: '',
                    companyName: '',
                    email:'',
                    website: '',
                    companyTel: '',
                    country:'',
                    city: '',
                    address: '',
                    type:''
                },
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
                    companyName:[
                        { required: true, message: this.$tc('login.prompt.companyName'), trigger: 'blur' },
                        { max: 100, message:  this.$tc('login.prompt.companyNamelength'), trigger: 'blur,change' }
                    ],
                    type:[
                        { required: true, message: this.$tc('login.prompt.companyType'), trigger: 'blur' },
                    ],
                    companyTel: [
                        {  required: true, message: this.$tc('login.prompt.inputYourTel'), trigger: 'blur' },
                        {  max: 13, message: this.$tc('login.prompt.telLength'), trigger: 'blur,change' }
                    ],
                    email: [
                        { required: true, message: this.$tc('login.prompt.inputYourEmail'), trigger: 'blur' },
                        { type: 'email', message: this.$tc('login.prompt.pleaseEnterCorrectEmail'), trigger: 'blur,change' }
                    ],
                }
            }
        },
        created() {
              this.getCountry();
              this.istype() ;
        },
        methods: {
            backSignUp(){
              window.history.go(-1)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.registerApplication();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCountry(){
                //获取国家
                this.$ajax.get(this.$apis.get_country).then(res=>{
                  this.country = res;
                }).catch(err=>{
                    console.log(err)
                })
            },
            istype(){
                 // this.$route.query.type 从url上获取那个端过来进行判断
                //  this.$route.query.type = 1
                switch (Number(this.$route.query.type))
                {
                    case 1:
                        this.companyTypeInfo = this.optionsCustomer;
                        break;
                    case 2:
                        this.companyTypeInfo = this.optionsSupplier;
                        break;
                    case 3:
                        this.companyTypeInfo = this.optionsService;
                        break;
                    default:
                         this.$message.warning({message: this.$tc('login.prompt.emptyType') });

                }
            },
            registerApplication(){
                this.companyInfo.partnerType = this.$route.query.type;
                this.companyInfo.companyType = this.$route.query.type;
                this.$localStore.set('type', this.companyInfo.type);
                this.$ajax.post(this.$apis.post_user_application, this.companyInfo)
                .then(res => {
                    this.isDisable = true;
                    this.$message.warning({message: this.$tc('login.prompt.signInSuccess')});
                }).catch(res =>{
                    this.isDisable = false;
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
