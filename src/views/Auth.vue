<template>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="text-center display-2 teal--text text--accent-3"
                        >Войти в OpenWay</h1>
                        <h4 class="text-center mt-4">Введите свои данные для входа</h4>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation>
                          <v-text-field
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                              :rules="emailValid"
                              v-model="email"
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
                              :rules="passValid"
                              v-model="pass"
                              required
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3" style="margin-bottom: 10%">
                        <v-btn rounded color="teal accent-3" dark @click="sendFormAuth()">ВОЙТИ</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">OpenWay</h1>
                        <h4
                            class="text-center"
                        >Скорее зарегистрируйся у нас в летней школе на обучение</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark to="/reg">Перейти к регистрации</v-btn>
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
import Vue from "vue";

export default {
  data: () => ({
    valid: false,
    email: '',
    emailValid: [
      v => !!v || 'Поле не должно быть пустым',
      v => /.+@.+\..+/.test(v) || 'E-mail не корректен',
    ],
    pass: '',
    passValid: [
      v => !!v || 'Поле не должно быть пустым',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(v) || 'Пороль не корректен',
    ],
  }),
  methods:{
    sendFormAuth: function (){
      if(this.validate()){
        let formDataReg = {
          userpassword: this.pass,
          email: this.email
        }
        axios({
          method: 'post',
          url: 'https://openwaymaria.herokuapp.com/user/worker/auth',
          data: formDataReg
        }).then(resp => {
          console.log(resp.data)
          let user = resp.data.split(",")[1]
          if(user == 'админ') {
            Vue.$cookies.set('isLog','true');
            Vue.$cookies.set('isAdmin','true');
            Vue.$cookies.set('login', this.email);
            this.$router.push('/info/admin')
          }else if(user == 'пользователь') {
            Vue.$cookies.set('isLog','true');
            Vue.$cookies.set('isAdmin','false');
            Vue.$cookies.set('login', this.email);
            this.$router.push('/info')
          }
        })
      }
    },
    validate () {
      return this.$refs.form.validate()
    },
  }
};
</script>