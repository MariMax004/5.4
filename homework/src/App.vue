<template>
 <div class="container mt-4">
   <div class="row">
     <div class="col-sm-4 mx-auto">
   <form @submit.prevent="regist " novalidate >


       <pre>
         {{$v.formReg.name}}
       </pre>

     <div v-show="step === 1" class="step">
     <div class="form-group">
       <label for="name">Имя</label>
       <input @blur="$v.FormReg.name.touch()" v-model="FormReg.name" type="text" class="form-control" id="name">
     </div>

     <div class="form-group">
       <label for="surname">Фамилия</label>
       <input v-model="FormReg.surname" type="text" class="form-control" id="surname">
     </div>

     <div class="form-group">
       <label for="email">Email</label>
       <input v-model="FormReg.email" type="text" class="form-control" id="email">
     </div>
       <button @click="nextStep" type="button" class="btn btn-primary">Далее</button>
     </div>

     <transition name="slide-fade">
       <div v-show="step === 2" class="step">

         <div class="form-group">
           <label for="password">Пароль</label>
           <input v-model="FormReg.password" type="password" class="form-control" id="password">
         </div>

         <div class="form-group">
           <label for="passwordSecond">Подтверждение пароля</label>
           <input v-model="FormReg.passwordSecond" type="password" class="form-control" id="passwordSecond">
         </div>
         <button @click="nextStep" type="submit" class="btn btn-primary mr-2">Зарегистрироваться</button>
         <button @click="backStep" type="button" class="btn btn-light">Назад</button>
       </div>
     </transition>
   </form>
 </div>
 </div>
 </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      step: 1,
      FormReg:{
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordSecond: ''
      }
    }
  },
  methods: {
    nextStep() {
      this.step++
    },
    backStep() {
      this.step--
    },
    regist(){
      console.log('Регистрация прошла успешно')
    }
  },
  validations:{
    FormReg:{
      name: required}
  }
}
</script>

<style>
.slide-fade-leave-active {
  transition: all 0.3s
}
.slide-fade-enter{
  transform: translateX(10px);
  opacity: 0;
}
</style>
