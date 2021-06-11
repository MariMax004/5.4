<template>
  <v-main>
    <h1 style="text-align: center">User</h1>
    <div class="text-center">
      <v-btn rounded outlined @click="logout()">Выйти</v-btn>
    </div>
    <div class="text-center" style="margin-top: 30px">
      <v-btn style="margin-right: 10px" rounded outlined @click="pl()">+</v-btn>
      <v-btn rounded outlined @click="mi()">-</v-btn>
    </div>
    <h2 style="text-align: center; margin-top: 20px">{{cnt}}</h2>
  </v-main>
</template>

<script>
import Vue from "vue";
export default {
  name: "InfoUser",
  data: () => ({
    cnt: 0,
  }),
  methods:{
    checkLog(){
      if(Vue.$cookies.get('isLog') === "false")
        this.$router.push('/')
    },
    logout(){
      Vue.$cookies.set('isLog','false');
      Vue.$cookies.set('isAdmin','false');
      Vue.$cookies.set('login', '');
      this.$router.push('/')
    },
    pl(){
      this.cnt+=1
    },
    mi(){
      this.cnt-=1
    }
  },
  mounted() {
    this.checkLog()
  }
}
</script>