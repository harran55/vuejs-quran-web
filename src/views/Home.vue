<template>
    <div id="surahs" class="container">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="alert alert-info">
                  الهدف من التطبيق تعليمي لمساعدتك على حفظ وقراءة القرآن الكريم بشكل أسهل واسرع إن شاء الله
                </div>
              </div>
              <div class="col-12 mb-3">
                <router-link :to="{name: 'SurahId', params: {id: save_page, ayah: save_ayah}}" v-if="save_get" class="get_save text-decoration-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                        <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    آخر ما توقفت عنده 
                    صفحة رقم
                    {{ save_page }}
                </router-link>
                <div class="card p-2 search">
                  <input type="search" v-model="keyword" placeholder="البحث: أدخال رقم او اسم السورة" class="border-0 p-2 rounded">
                </div>
              </div>
                <div v-for="(value, index) in filteredList" :key="index" class="col-6 col-lg-3 col-md-4 col-sm-6 surah mb-3">
                  <div class="card rounded p-2">
                    <router-link :to="{name: 'Surah', params: {id: (nPage[value.number-1])}}" class="text-decoration-none rounded">
                        <b>{{ value.number }}</b> 
                        <div>{{ value.name }}
                          <small v-if="value.revelationType == 'Meccan'">سورة مدنية</small>
                          <small v-else>سورة مكية</small>
                        </div>
                    </router-link>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import jsonSurah from '@/assets/Surah'
import Cookies from 'js-cookie'

export default {
    name: 'surah',
    data() {
        return {
            surah: jsonSurah.data,
            save_get: false,
            save_page: 0,
            save_ayah: 0,
            keyword: '',
            nPage: ['1','2','50','77','106','128','151','177','187','208','221','235','249','255','262','267','282','293','305','312','322','332','342','350','359','367','377','385','396','404','411','415','418','428','434','440','446','453','458','467','477','483','489','496','499','502','507','511','515','518','520','523','526','528','531','534','537','542','545','549','551','553','554','556','558','560','562','564','566','568','570','572','574','575','577','578','580','582','583','585','586','587','587','589','590','591','591','592','593','594','595','595','596','596','597','597','598','598','599','599','600','600','601','601','601','602','602','602','603','603','603','604','604','604']
        }
    },
    methods: {
      getSave() {
        if (Cookies.get('page')) {
          this.save_get  = true
          this.save_page = Cookies.get('page')
          this.save_ayah = Cookies.get('ayah')
        }
      }
    },
    mounted() {
      this.getSave()
    },
    computed: {
        filteredList() {
        return this.surah.filter(post => {
            return ((post.name).replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618), "g"), "") + ' - ' + (post.number)).toLowerCase().includes(this.keyword.toLowerCase())
        })
        }
    }
}
</script>