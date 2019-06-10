<template>
    <div class="logout">
      <div class="container">
        <p>注销当前账户？</p>
        <span @click="logout" class="logout-btn">确定</span>
      </div>
      <div class="errorTip_wrap" >
        <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
const baseURL = "https://wallet-api.launchain.cn"
const querystring = require('querystring')
export default {
  name: 'logout',
  data () {
    return {
      errorTip: false,
      errorMessage: ""
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    //获取Cookie
    getCookie(name) {
      let cookieName = encodeURIComponent(name) + '=';
      let cookieStart = document.cookie.indexOf(cookieName);
      let cookieValue = null;
      if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(
          document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    },
    //删除Cookie
    unsetCookie:function (name) {
      document.cookie = name + "= ; expires=" + new Date(0);
    },
    logout(){
      let token = this.getCookie("token")

      //alert(token)

      axios({
        method: 'DELETE',
        url: `${baseURL}/v1/rr-points/user/signout/${token}`,
        headers: {
          'X-Access-Token': token,
        }
      }).then(res => {
        this.unsetCookie("session_id")
        this.unsetCookie("token")
        this.unsetCookie("user_id")
        this.unsetCookie("phone")
        this.unsetCookie("head_img")
        this.unsetCookie("nick_name")
        this.unsetCookie("openid")
        this.errorMessage = "注销成功！";
        this.errorTip = true;
        let that = this;
        window.setTimeout(function () {
          that.errorTip = false;
          that.$router.push("/login")
        },2000)
      }).catch(error => {
      })
    }
  },
  watch: {},
  computed: {},
  components: {},
}
</script>

<style scoped lang="stylus">
  .logout
    width 750px
    height 1500px
    background url("./imgs/bj.jpg") no-repeat center
    background-attachment fixed
    background-size 100% 100%
    display flex
    justify-content center
    align-items center
    .container
      width 570px
      height 400px
      background-color #ffffff
      box-shadow 0 4px 43px 0 rgba(83, 83, 83, 0.96)
      border-radius 50px
      p
        font-size 40px /*px*/
        color #091624
        text-align center
        margin 130px 0 80px 0
      .logout-btn
        width 450px
        height 80px
        line-height 80px
        text-align center
        background-color #386cff
        box-shadow 0 0 35px 0 rgba(56, 108, 255, 0.34)
        border-radius 40px
        font-size 36px /*px*/
        color #ffffff
        display inline-block
        margin 0 auto
        margin-left 60px
    .errorTip_wrap{
      width 100%
      text-align center
      font-size 0
      position fixed
      top 50%
      .errorTip{
        display inline-block
        box-sizing border-box
        line-height 1.6
        max-width 520px;
        padding 20px 30px
        background-color #000000
        opacity 0.7
        font-size 30px;/*px*/
        color #ffffff
        border-radius 30px
      }
    }
</style>
