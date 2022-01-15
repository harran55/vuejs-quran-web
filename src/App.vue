<template>
  <div id="app">
    <div id="nav" class="container">
      <img src="./assets/logo.png" alt="">
      <router-link :to="{name: 'Home'}" class="r">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-text-paragraph" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </router-link>
      <a class="l" @click="zmode" type="link">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
          <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </a>
    </div>
    <router-view />

    <footer class="text-center">
      المكتبة السحابية <b><a href="https://alquran.cloud/api" target="_blank" class="text-decoration-none">alquran.cloud</a></b><br/>
      بناء وتطوير <b><a href="https://io.hsoub.com/u/h1om" target="_blank" class="text-decoration-none">
      حران المري </a></b> <br/>
      التطبيق مفتوح المصدر <b><a href="https://github.com/harran55/vuejs-quran-web" target="_blank" class="text-decoration-none">vuejs quran</a></b>
      <br/>
      v 2022.1
    </footer>
  </div>
</template>

<script>
import jsonAudio from '@/assets/audio'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'App',
  data() {
    return {
      settings: {
        mode   : 'dark',
        reader : "ar.alafasy",
        readers: jsonAudio.data,
        language: 'ar',
        surah: [],
      }
    }
  },
  methods: {
    run() {
      this.setMode(true)
        axios.get('//api.alquran.cloud/v1/surah')
        .then(response => {
            this.surah = response.data.data;
        })
        if (Cookies.get('reader')) {
          this.settings.reader = Cookies.get('reader')
        }
    },
    setMode(val) {
      var get  = Cookies.get('mode');
      var mode = this.mode
      if (get && val) {
        document.querySelector('body').setAttribute('data-theme', get)
      } else {
        Cookies.set('mode', mode, { expires: 360 })
      }
    },
    zmode () {
      if (this.mode == 'light') {
        document.querySelector('body').setAttribute('data-theme', 'dark')
        this.mode = 'dark'
        this.setMode(false)
      }
      else {
        document.querySelector('body').setAttribute('data-theme', 'light')
        this.mode = 'light'
        this.setMode(false)
      }
    }
  },
  mounted() {
      this.run()
  }
}
</script>