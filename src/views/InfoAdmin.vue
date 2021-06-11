<template>
  <v-main>
    <h1 style="text-align: center">Admin Info</h1>
    <div class="text-center">
      <v-btn rounded outlined @click="logout()">Выйти</v-btn>
    </div>
    <InfoPeople v-for="el in users" :key="el.Email"
    :mail="el.Email" :name="el.Name"></InfoPeople>
  </v-main>

</template>

<script>
import Vue from "vue";
import axios from "axios";
import InfoPeople from "../components/InfoPeople";
export default {
  name: "InfoAdmin",
  components: {InfoPeople},
  data: () => ({
    users: [],
  }),
  methods:{
    checkLog(){
      if(Vue.$cookies.get('isLog') === "false" || Vue.$cookies.get('isAdmin') === "false") {
        if(Vue.$cookies.get('isLog') === "true"){
          this.$router.push('/info')
        }else {
          this.$router.push('/')
        }
      }
    },
    getAccounts(){
      axios({
        method: 'get',
        url: 'https://openwaymaria.herokuapp.com/user/worker/getUsers'
      }).then(resp => {
        this.users = resp.data
        console.log(this.users)
      })
    },
    logout(){
      Vue.$cookies.set('isLog','false');
      Vue.$cookies.set('isAdmin','false');
      Vue.$cookies.set('login', '');
      this.$router.push('/')
    }
  },
  mounted() {
    this.checkLog()
    this.getAccounts()
  }
}
</script>

<style scoped>

</style>