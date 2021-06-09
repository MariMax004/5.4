<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">OpenWay</h1>
                      <h4
                          class="text-center"
                      >Создай свой аккаунт для OpenWay, а если у тебя уже есть аккаунт, тогда входи в нашу систему</h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark to="/">Войти</v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">Создай аккаунт на площадке OpenWays</h1>
                      <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation>
                        <v-text-field
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            :rules="nameValid"
                            v-model="name"
                            required
                        />
                        <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            :rules="regEmailValid"
                            v-model="regEmail"
                            required
                        />

                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            :counter="5"
                            :rules="regPassValid"
                            v-model="regPass"
                            required
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-n5" style="margin-bottom: 10%">
                      <v-btn rounded color="teal accent-3" dark @click="sendFomtReg()">Зарегестрироваться</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    regEmail: '',
    regEmailValid: [
      v => !!v || 'Поле не должно быть пустым',
      v => /.+@.+\..+/.test(v) || 'E-mail не корректен',
    ],
    regPass: '',
    regPassValid:[
      v => !!v || 'Поле не должно быть пустым',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(v) || 'Пороль должен содержать буквы и хотя бы 1 цифру и иметь длинну 5 символов или бьольше',
    ],
    name:'',
    nameValid:[
      v => !!v || 'Поле не должно быть пустым',
      v => /^[a-zA-Zа-яА-Я]*$/.test(v) || 'Поле должно содержать только буквы',
    ]
  }),
  props: {
    source: String
  },
  methods:{
    sendFomtReg: function (){
      if(this.validate()){
        let formDataReg = {
          userpassword: this.regPass,
          email: this.regEmail,
          username: this.name
        }
        axios({
          method: 'post',
          url: 'http://localhost:8090/user/worker/add',
          data: formDataReg
        }).then(resp => {
          console.log(resp.data)
          this.$router.push('/')
        })
      }
    },
    validate () {
      return this.$refs.form.validate()
    },
  }
};
</script>