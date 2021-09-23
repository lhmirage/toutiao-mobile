<template>
  <div class="login-container">
    <van-nav-bar class="van-nav-bar"
                 title="登录"
                 left-arrow
                 @click-left="$router.back()" />

    <!-- 基于vant表单验证
         1.用form标签包裹
         2.给form绑定submit事件,验证通过才会触发
         3.使用field的rules属性定义校验规则
         (规则建议放到data中,否则太长) -->
    <!-- 登录表单 -->
    <van-form @submit="onlogin"
              :show-error="false"
              validate-first
              ref="login-form"
              :show-error-message="false"
              @failed="onfailed">
      <van-field v-model="user.mobile"
                 icon-prefix="toutiao"
                 left-icon="shouji"
                 placeholder="请输入手机号"
                 center
                 name="mobile"
                 :rules="formRules.mobile" />
      <van-field v-model="user.code"
                 clearable
                 icon-prefix="toutiao"
                 left-icon="yanzhengma"
                 placeholder="请输入验证码"
                 center
                 name="code"
                 :rules="formRules.code">
        <template #button>
          <van-count-down :time="1000 * 60"
                          format="ss s"
                          v-if="isCountDownShow"
                          @finish="isCountDownShow = false" />
          <van-button class="send-btn"
                      size="mini"
                      round
                      @click.prevent="onSendSms"
                      :loading="isSendSmsLoading"
                      v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    type="primary"
                    block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false, // 控制倒计时组件
      isSendSmsLoading: false // 发送验证码时候的加载
    }
  },
  methods: {
    async onlogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 1找到数据接口
      // 2封装请求方法
      // 3请求调用登录
      try {
        const { data } = await login(this.user)
        // 4处理响应结果
        Toast.success('登陆成功')
        // 将后端返回的token放到vuex中
        this.$store.commit('setUser', data)
        // 跳转回原来界面
        this.$router.back()
      } catch (err) {
        console.log('登陆失败', err)
        Toast.fail('登陆失败')
      }
    },
    onfailed (error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      // 校验手机号码,通过则发送验证码,隐藏按钮显示倒计时,倒计时结束显示发送按钮
      try {
        await this.$refs['login-form'].validate('mobile') // 获取对象,验证部分表单项
        this.isSendSmsLoading = true // 按下发送后,防止多次按动
        await sendSms(this.user.mobile)
        // 短信发出,显示倒计时
        this.isCountDownShow = true
        // 倒计时结束,重新显示发送按钮,finish事件处理
      } catch (err) {
        // try里面任何代码的错误都会进入catch
        let message = '' // 定义一个公用message用于后面显示
        if (err && err.response && err.response.status === 429) {
          message = '发送频繁,请稍后再试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败,请稍后再试'
        }
        // 逻辑判断错误属性并显示在界面上
        Toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false // 关闭发送按钮的loading状态
    }
  }
}
</script>

<style scope lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
