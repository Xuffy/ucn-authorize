<template>
    <section class="get-invitation-code">
        <div class="contianer">
            <div class="hd">
                <h4> {{ $i.login.text.RequestToGetInvitationCode }} </h4>
                <p>{{$i.login.text.submitInfo}}：{{$i.login.text.email}}-xxx@xxx.com; {{$i.login.text.tel}}-123456789</p>
            </div>
            <el-form label-width="200px" class="form-box" :model="companyInfo" :rules="rules" ref="companyInfo">
                <div class="form-wrap">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$i.login.getInvitationCode.email" class="right" prop="email">
                                <el-input style="width: 300px" v-model="companyInfo.email" :placeholder="this.$i.login.placeholder.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.companyType" prop="type">
                                <el-select v-model="companyInfo.type" filterable :placeholder="this.$i.login.placeholder.companyType"  style="width: 300px">
                                    <el-option
                                        v-for="item in companyTypeInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        style="width: 300px">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.companyName"  prop="companyName" class="right">
                                <el-input :placeholder="this.$i.login.placeholder.companyName" style="width: 300px" v-model="companyInfo.companyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.contactNumber" prop="companyTel">
                                <el-input style="width: 300px" v-model="companyInfo.companyTel" :placeholder="this.$i.login.placeholder.contactNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.country" class="right" >
                                <el-select v-model="companyInfo.country" :placeholder="this.$i.login.placeholder.country" style="width: 300px">
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
                            <el-form-item :label="this.$i.login.getInvitationCode.city" >
                                <el-input :placeholder="this.$i.login.placeholder.city" type="text"  style="width: 300px" v-model="companyInfo.city"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.address" class="right">
                                <el-input style="width: 300px" v-model="companyInfo.address" :placeholder="this.$i.login.placeholder.address"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item :label="this.$i.login.getInvitationCode.website" >
                                <el-input style="width: 300px" v-model="companyInfo.website" :placeholder="this.$i.login.placeholder.website"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="bottom-btn">
                <div class="btn-wrap">
                    <el-button type="primary" :loading="isDisable" @click="submitForm('companyInfo')">
                      {{$i.login.btn.submit}}
                    </el-button>
                    <el-button @click="backSignUp">{{ $i.login.btn.cancel }}</el-button>
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
                companyTypeInfo:[],
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
                optionsSupplier: [],
                optionsCustomer: [],
                optionsService: [],
                rules: {
                    companyName:[
                        { required: true, message: this.$i.login.prompt.companyName, trigger: 'blur' },
                        { max: 100, message:  this.$i.login.prompt.companyNamelength, trigger: 'blur,change' }
                    ],
                    type:[
                        { required: true, message: this.$i.login.prompt.companyType, trigger: 'blur' },
                    ],
                    companyTel: [
                        {  required: true, message: this.$i.login.prompt.inputYourTel, trigger: 'blur' },
                        {  max: 13, message: this.$i.login.prompt.telLength, trigger: 'blur,change' }
                    ],
                    email: [
                        { required: true, message: this.$i.login.prompt.inputYourEmail, trigger: 'blur' },
                        { type: 'email', message: this.$i.login.prompt.pleaseEnterCorrectEmail, trigger: 'blur,change' }
                    ],
                }
            }
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
                        return false;
                    }
                });
            },
            getCountry(){
                //获取国家
                this.$ajax.get(this.$apis.get_country).then(res=>{
                  this.country = res;
                })
            },
            istype(){
              let {type} = this.$sessionStore.get('query');
                switch (type)
                {
                    case '1':
                        this.companyTypeInfo = this.optionsCustomer;
                        break;
                    case '2':
                        this.companyTypeInfo = this.optionsSupplier;
                        break;
                    case '3':
                        this.companyTypeInfo = this.optionsService;
                        break;
                    default:
                         this.$message.warning({message: this.$i.login.prompt.emptyType});

                }
            },
            registerApplication(){
              let {type} = this.$sessionStore.get('query');
                this.companyInfo.partnerType = type;
                this.companyInfo.companyType = type;
                this.$localStore.set('type', this.companyInfo.type);

              this.isDisable = true;
                this.$ajax.post(this.$apis.post_user_application, this.companyInfo)
                .then(res => {
                    this.$message({
                      type: 'success',
                      message: this.$i.login.prompt.signInSuccess,
                      onClose: (() => {
                        this.$router.push({
                          path: '/signUp',
                        })
                        // window.history.go(-1);
                      })
                    });
                }).catch(res =>{
                    this.isDisable = false;
                });
            }
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
        },
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
