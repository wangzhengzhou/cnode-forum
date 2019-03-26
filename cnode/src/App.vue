<template>
  <div id="app">
    <Header></Header>
    <div class="bod">
      <router-view name= "Slidebar" class="Slidebar"></router-view>
      <router-view name="main" class="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import Postlist from './components/postlist'

export default {
  name: 'App',
  components:{
    Header,Postlist
  }
}
</script>

<style >
*{
  margin: 0;
  padding: 0
}
#app{
  background-color: #e1e1e1
}
.main{
  width:68%;
  margin-top: 20px;
  border-radius:4px;
  margin-left:5% 
}
.Slidebar{
  float: right;
  width: 20%;
  margin-right: 5%;
}

</style>
