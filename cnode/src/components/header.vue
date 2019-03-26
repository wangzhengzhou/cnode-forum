<template>
  <div class="header">
    <router-link :to="{
      name:'root',
      path:'/'
    }">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
    <span class="icon-search"></span>
    <input type="text"  class="input" value="        " :class="{mous:mouse}" @mouseover="mouseover" @mouseleave="mouseleave">
    <ul>
      <router-link :to="{
        name:'root',
        path:'/'
      }">
        <li><a href="#">首页</a></li>
      </router-link>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      mouse:false
    }
  },
  methods:{
    mouseover(){
      this.mouse = true;
    },
    mouseleave(){
      this.mouse = false;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('//at.alicdn.com/t/font_1105335_wo7y74ussub.css');
.header>.mous{
  background-color: white;
}
.icon-search{
  display: inline-block;
  font-family: 'iconfont';
  font-size: 20px;
  margin-left: -230px;
  color:#444;
  margin-top: 16px;
  font-weight: bold; 
}
.input{
  line-height: 26px;
  border-radius:14px; 
  width: 240px;
  float: left;
  margin-top: 14px;
  margin-left: 20px;
  border: none;
  background-color:#999
}
.header::after{
  content: '';
  display: block;
  clear: both;
}
.header{
  padding:0 70px;
  height:50px;
  background-color: #444;
}
img{
  max-width:120px;
  margin: 10px 0 ;
  float: left;
}
ul{
  list-style: none;
  float: right;
  margin-right: 50px;
}
li{
  display: inline-block;
  margin-right:10px; 
  font-size: 14px;
  line-height: 50px;
}
a{
  text-decoration: none;
  color: #ccc;
}
</style>
