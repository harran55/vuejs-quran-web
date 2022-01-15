<template>
    <div class="container position-relative">
        <div class="row">
            <div class="col-12 col-md-7 m-auto d-block px-lg-5 p-0">
                <div class="ayah but">
                    <button @click="pause" :title="isPlay ? 'تشغيل' : 'إيقاف'" class="iplay">
                        <svg v-if="isPlay && !isLoad" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                        </svg>
                        <svg v-else-if="isPlay && isLoad" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-clockwise spinn" viewBox="0 0 16 16">
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </button>
                    <button class="iplay d-lg-inline-block d-none" type="button">
                        <div class="volume">
                            <input type="range" class="form-range" min="0" max="100" v-model="volume">
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                            <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
                        </svg>
                    </button>
                    <button v-for="(val, int) in options" :key="int" type="button" :variant="(page_repeat == val.value ? 'primary' : '')"
                    @click="repeat(val.value)" :id="'btn'+int" class="iplay" data-bs-placement="bottom" data-bs-toggle="tooltip" :title="val.hover">
                    <svg v-if="int == 0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                    <svg v-if="int == 1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                    <svg v-if="int == 2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                    </svg>
                    <small>{{ val.text }} <input v-if="int == 1" type="number" v-model="inayah"></small>
                    </button>
                    <button class="iplay" type="button" :variant="valTime ? 'primary' : ''">
                        <svg @click="FunTimeStop()" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        <small>
                            فترة السكون
                            <input type="number" v-model="timeStop">
                        </small>
                    </button>
                </div>
                <div class="ayah reader" id="reader">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                    </svg>
                    <div id="list">
                        <ul class="list-unstyled m-0 p-0">
                            <li v-for="(item, index) in arrayAudio" :key="index" :id="'li'+index" :variant="item.identifier ==  $parent.settings.reader ? 'primary' : ''"
                            @click="reReader(item.identifier)" :v-if="item.identifier != null">
                            {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="setting_font">
                    <a type="link" @click="style('add')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </a>
                    <span>
                        الخط
                    </span>
                    <a type="link" @click="style('sub')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </a>
                </div>
                <div class="setting_save">
                    <button type="button" @click="save" :class="set_save ? 'd-block isave' : 'd-block'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
                        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
                        <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
                        </svg>
                        <small>
                            حفظ مكان التوقف
                        </small>
                    </button>
                    <button type="button" @click="open_save" class="d-block" v-if="set_save">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                        <small>
                            فتح مكان التوقف
                        </small>
                    </button>
                </div>
            </div>
            <div class="col-12 col-md-7 m-auto d-block px-lg-5 p-0">
                <div class="ayah load px-2" aria-load="true">
                    <div class="spinner">
                        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <span v-for="(value, index) in surah" :key="index" :data-id="value.number" :id="'button'+value.number">
                        <span v-if="index == 0 || value.numberInSurah == 1" :class="value.numberInSurah == 1 ? 'in-surah' : 'of-surah'">
                            <b>{{ value.surah.number }}.</b> {{ value.surah.name }}
                        </span>
                        <strong v-if="par == 1 && value.numberInSurah == 1" v-html="value.text" @click="xplay(index)" 
                        :class="index == tRead ? 'x-start' : ''" :data-id="index"></strong>
                        <strong v-else :inner-html.prop="value.text | basmala" @click="xplay(index)" 
                        :class="index == tRead ? 'x-start' : ''" :data-id="index"></strong>
                        
                        <b class="numbers" v-text="value.numberInSurah"></b>
                    </span>
                    <div class="bpage">
                        <button v-if="$route.params.id > 1" @click="goLink(0)" class="float-end button-right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                        </button>
                        <button class="fs-5 fw-bold" @click="page_number('add')">
                            +
                        </button>
                        <input type="number" v-model="page" @keyup="page_number()" class="page_number">
                        <button class="fs-5 fw-bold" @click="page_number('sub')">
                            -
                        </button>
                        <button v-if="$route.params.id < 604" @click="goLink(1)" class="float-start button-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                                <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <audio id="audio"></audio>
    </div>
</template>

<script>
import axios from 'axios'
import jsonAudio from '@/assets/audio'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

export default {
    name: 'SurahAyah',
    data() {
        return {
            // quran: [], // الاصدار القديم لجلب الآيات
            npage: [],
            surah: [], // array الآيات
            par: Number, 
            arrayAudio: jsonAudio.data, // array القراء
            page: 0, // رقم الصفحة
            ayah: 0, // رقم الآية
            timeStop: 0, // مدة فترة السكون
            valTime: false, // حالة فترة السكون 
            inayah: 2, // عدد تكرار قراءة الآية
            set_save: false, // حفظ مكان التوقف
            isPlay: false, // play OR pause
            isLoad: false, // Loading Page
            // show: false, // Loading Page الاصدار القديم بأمكانك أزالته
            tRead: Number, // رقم الآية التي يتم قرائتها في الوقت الفعلي
            volume: 100,  // مستوى الصوت يقسم على واحد
            fontSize: 16, // حجم الخط px
            // fontWord: 2, // المسافة بين الكلمات px للأصدار القديم بأمكانك حذفه
            /*
            خاصية التكرار page_repeat
            page -> تكرار قراءة الصفحة
            ayah -> تكرار قراءة الآية
            next -> قراءة صفحة صفحة
            */
            page_repeat: 'page', // خاصية التكرار 
            /*
            حالة التكرار reayah
            0 -> لا يعمل false
            1 -> يعمل true
            */
            reayah: 0, // حالة التكرار 
            /*
            مرتبط بخاصية التكرار options
            وهي حالات او انواع الحالات
            */
            options: [
                { 
                    text: 'تكرار الصفحة',
                    hover: 'سيتم تكرار قراءة الصفحة', 
                    value: 'page' 
                    },
                { 
                    text: 'تكرار الآية ',
                    hover: 'سيتم تكرار قراءة الآية بحسب العدد المدخل', 
                    value: 'ayah' 
                    },
                { 
                    text: 'قراءة صفحة صفحة',
                    hover: 'سيتم الانتقال الى الصفحة التالية بعد الأنتهى من قراءة الصفحة', 
                    value: 'next' 
                    },
            ]
        }
    },
    methods: {
        async run() {
            // this.quran = this.$parent.settings.surah.data
            await this.setLoad(true)
            this.npage = this.$parent.settings.npage
            this.show  = true
            let Nxpage = this.par = this.$route.params.id
            let Qar    = this.$parent.settings.reader
            this.ayah  = this.$route.params.ayah
            if (!this.set_save) {
                if (Cookies.get('page')) {
                    this.set_save = true
                }
            }
            await axios.get('//api.alquran.cloud/v1/page/'+Nxpage+'/'+Qar)
            .then(response => {
                this.surah = []
                this.surah = response.data.data.ayahs
                this.page  = response.data.data.ayahs[0].page
                this.show = false
                this.setLoad(false)
                this.save_play()
            });
        },
        async pause() {
            var audio = document.getElementById("audio")
            if (audio.paused) {
                await audio.play()
            } else {
                await audio.pause()
            }
            this.isPlay = audio.paused
        },
        async xplay(hid) {
            var id = hid
            this.tRead = id
            var coun = this.surah.length
            var sound = await this.surah[id].audio
            var audio = document.getElementById("audio")
            await audio.setAttribute('src', sound)
            setInterval(() => {audio.volume = (this.volume / 100)}, 100)
            audio.onplaying = () => {
                this.isPlay = false
                this.isLoad = false
            }
            audio.onprogress = () => {
                this.isLoad = true
            }
            if (!this.isPlay) {
                await audio.play()
            }
            
            audio.onended = () => {
                if (coun-1 > id && this.page_repeat == 'page' || coun-1 > id && this.page_repeat == 'next') {
                    if (this.valTime) {
                        setTimeout(() => {
                            this.xplay(id+1)
                        }, (this.timeStop * 1000))
                    }
                    else {
                        this.xplay(id+1)
                    }
                }
                else if (this.page_repeat == 'ayah') {
                    if (this.reayah < this.inayah) {
                        if (this.valTime) {
                            setTimeout(() => {
                                this.xplay(id)
                                this.reayah++
                            }, (this.timeStop * 1000))
                        } else {
                            this.xplay(id)
                            this.reayah++
                        }
                    } else {
                        if (this.valTime) {
                            setTimeout(() => {
                                this.reayah = 0
                                this.xplay(id+1)
                            }, (this.timeStop * 1000))
                        } else {
                        this.reayah = 0
                        this.xplay(id+1)
                        }
                    }
                }
                else if (this.page_repeat == 'page'){
                    if (this.valTime) {
                        setTimeout(() => {
                            this.xplay(0)
                        }, (this.timeStop * 1000))
                    } else {
                        this.xplay(0)
                    }
                }
                else if (this.page_repeat == 'next'){
                    if (this.page <= 603) {
                        this.$router.push({name: 'Surah', params: {id: (this.page+1)}})
                    }
                    else {
                        this.$refs['modal'].show()
                    }
                }
            }
        },
        goLink(val = null) {
            this.setLoad(true)
            this.$router.push({name: 'Surah', params: {id: (val ? this.page+1 : this.page-1)}})
        },
        goPage() {
            this.setLoad(true)
            this.$router.push({name: 'Surah', params: {id: this.par}})
        },
        repeat(val) {
            this.page_repeat = val
        },
        reReader(val) {
            this.$parent.settings.reader = val
            Cookies.set('reader', val)
            this.run()
        },
        page_number(val = null) {
            const ppage = this.page;
            if (val == 'add') {
                this.$router.push({name: 'Surah', params: {id: (ppage + 1)}})
            } else if (val == 'sub') {
                this.$router.push({name: 'Surah', params: {id: (ppage - 1)}})
            } else {
                this.$router.push({name: 'Surah', params: {id: ppage}})
            }
        },
        style(val) {
            let style = document.querySelector('style')
            if (val == 'add') this.fontSize++
            else if (val == 'sub') this.fontSize--
            style.innerHTML = 'span strong {font-size:'+this.fontSize+'px;}';
        },
        save() {
            var page = this.page
            if (!ayah) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title:'قم بأختيار الآية ليتم حفظ مكان التوقف',
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
            var ayah = document.querySelector('.x-start').getAttribute('data-id')
            Cookies.set('page', page, { expires: 360 })
            Cookies.set('ayah', ayah, { expires: 360 })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title:'تم حفظ مكان التوقف',
                showConfirmButton: false,
                timer: 1500
                })
        },
        open_save() {
            if (Cookies.get('page')) {
                this.setLoad(true)
                var page = Cookies.get('page')
                var ayah = Cookies.get('ayah')
                this.$router.push({name: 'SurahId', params: {id: page, ayah: ayah}})
            }
        },
        save_play() {
            var ayah = this.$route.params.ayah
            if (ayah) {
                this.xplay(ayah)
            }
            else {
                this.xplay(0)
            }
        }, 
        setLoad(val) {
            if (val) document.querySelector('.ayah.load').setAttribute('aria-load', 'true')
            else document.querySelector('.ayah.load').setAttribute('aria-load', 'false')
        },
        FunTimeStop() {
            this.valTime = (this.valTime ? false : true)
        }
    },
    mounted() {
        this.run()
    },
    created() {
        this.run()
    },
    watch: {
        $route: "run"
    }
}
</script>