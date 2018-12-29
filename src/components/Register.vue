<template>
  <div class="container">
    <div class="userContent form-signin">
      <h2 class="form-signin-heading">Register</h2>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class='userInfo'>
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="form.username" placeholder="请输入用户名称" class='username'></el-input>
        </el-form-item>
        <el-form-item prop="account" label="账号名称">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Util from '../assets/js/utils'
  // import 'element-ui/lib/theme-default/index.css'
  import axios from 'axios'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!Util.emailReg.test(this.form.email)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!Util.phoneReg.test(this.form.phone)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username: '',
          account: '',
          password: '',
          checkPass: '',
          email: '',
          phone: '',
          // card: '',
          // birth: '',
          sex: ''
        },
        rules: {
          username: [
           {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
           },
           {
            min: 1, max: 10, message: '请输入1-10位用户名', trigger: 'blur'
           }
          ],
          account: [
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 6, max: 10, message: '请输入6-10位账号', trigger: 'blur'
            }
          ],
          password: [
           {
            validator: validatePass,
            trigger: 'blur'
           },
           {
            min: 6, max: 10, message: '请输入6-18位密码', trigger: 'blur'
           }
          ],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          email: [{
            validator: validateEmail,
            trigger: 'blur'
          }],
          phone: [{
            validator: validatePhone,
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '请输入性别',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$http.post('/api/register', self.form).then(function(response) {
                console.log(response)
                self.$router.push('./RegisterSuccess')
            }).then(function(error) {
              console.log(11)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancle() {
        this.$router.push('/qmusic/login')
      },
      getDateTimes(str) {
        var strs = new Date(str)
        return strs
      }
    }
  }
</script>

<style>
.container{
    background: url('../assets/img/bg.jpg') no-repeat;
    background-size: 100% 100%;
    padding-top: 90px;
    padding-bottom: 90px;
  }
  .username{
    margin-top: 10px;
  }
  .crumbs-register {
    height: 50px;
    line-height: 50px;
  }
  .register-title {
    line-height: 50px;
    margin: 0 auto;
    width: 50px;
    font-size: 16px;
  }
  .form-signin{
    background: #fff;
    border-radius: 5px;
  }
  .userContent {
    width: 30%;
    margin: 0 auto;
    height: 580px;

  }
  .select-sex {
    width: 320px;
  }
  .userInfo{
    display: inline-block;
  }
   h2.form-signin-heading {
    margin: 0;
    padding: 20px 15px;
    text-align: center;
    background: #42b983;
    border-radius: 5px 5px 0 0;
    color: #fff;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 300;
    font-family: 'Open Sans', sans-serif;
}
</style>