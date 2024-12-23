<template>
  <div class="lending-page">
    <Three></Three>
    <div class="head aaa" id = "install">
      <div class="container">
        <div :class="{'head-wrapper':true,'light':this.$store.getters.getTheme}">
          <h1 class="head-logo">
            pinq
          </h1>
          <h3 class="head-sloggan">
            Keep your friends closer, stay in touch in real time!
          </h3>
          <div class="head-btn-wrapper">
            <button :class="{'head-btn':true,'light-btn':this.$store.getters.getTheme}" @click="redirectToDownload">Install</button>
          </div>
        </div>
      </div>
    </div>
    <div class="features">
      <div class="container">
        <div class="features-wrapper">
          <h2 class="features-head">
            Our Features
          </h2>
          <div class="feature-slider">
            <swiper-container
              :spaceBetween="30"
              :slides-per-view="slides"
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
              loop = "true"
              class="mySwiper"
              >
              <SwiperSlide>
                <div class="feature-content">
                  <div class="features-img-block">
                    <img src="../assets/tracking.jpg" alt="Feature image" />
                  </div>
                  <h3>Real-Time Tracking</h3>
                  <p>Track your friends on the map in real time.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="feature-content">
                  <div class="features-img-block">
                    <img src="../assets/messaging.jpg" alt="Feature image" />
                  </div>
                  <h3>Instant Messaging</h3>
                  <p>Send and receive messages instantly.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="feature-content">
                  <div class="features-img-block">
                    <img src="../assets/nearby.jpg" alt="Feature image" />
                  </div>
                  <h3>Find Nearby Friends</h3>
                  <p>Connect with people nearby who share your interests.</p>
                </div>
              </SwiperSlide>
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'about':true,'light':this.$store.getters.getTheme}" id = "about">
      <div class="container">
        <div :class="{'about-wrapper':true}">
          <div class="about-text">
            <h2 :class="{'about-text-head':true,'black-color':this.$store.getters.getTheme}">
              About the App
            </h2>
            <p :class="{'about-text-p':true,'black-color':this.$store.getters.getTheme}">
              Pinq is a mobile social networking app designed to enhance real-time connections. With GPS tracking, users can see their friends' locations on a map, send and receive instant messages, and get notifications when friends are nearby. pinq also enables users to discover new people with shared interests and explore exciting places around them. Privacy controls allow users to manage visibility by choosing who can see their location or setting location-sharing preferences for specific times or friends. Ideal for spontaneous meet-ups and group events, pinq keeps friends connected and helps users stay safe and social in real time.
            </p>
          </div>
          <div class="about-img-wrapper">
            <img src="../assets/about.png" alt="" class="about-img">
          </div>
        </div>
      </div>
    </div>
    <div class="faq-container" id="faq">
          <h1 class="faq-title">Frequently asked questions (FAQ)</h1>
      
          <div v-for="(item, index) in faqItems" :key="index" :class="{'faq-item':true}">
              <div :class="{'question-block':true,'light':this.$store.getters.getTheme}">
                  <button :class="{'faq-question':true,'light':this.$store.getters.getTheme}" @click="toggleAnswer(index)">    
                      {{ item.question }}
                  </button>
                  <svg class="svgstr" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M1.293 4.293a1 1 0 0 1 1.414 0L8 9.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z"/>
                  </svg>
              </div>
              <div v-show="item.isOpen" class="faq-answer">
              <p>{{ item.answer }}</p>
              </div>
          </div>
        </div>

  </div>
</template>
<script>
import {  SwiperSlide } from 'swiper/vue';
import Three from "./Three.vue";
import 'swiper/swiper-bundle.css';

export default {
  name:'MainC',
  components: {
    SwiperSlide,
    Three
  },
  created() {
    this.updateWidth();
    if(this.windowWidth < 1000){
          this.slides = 1
        }else{
          this.slides = 2
        }
  },
  mounted() {
    window.addEventListener("resize", this.updateWidth);
    this.theme = this.$store.getters.getTheme
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  },
  data() {
      return {
        theme: false,
        faqItems: [
          {
            question: "How much does Pinq cost?",
            answer:
              "Pinq is free to download and use, with optional premium features available for enhanced functionality.",
            isOpen: false,
          },
          {
            question: "What is Pinq?",
            answer:
              "Pinq is a mobile social networking app that helps you connect with friends in real time through features like GPS location tracking, instant messaging, and notifications about nearby friends.",
            isOpen: false,
          },
          {
            question: "Can I hide my location on Pinq?",
            answer:
              "Absolutely! You can turn off location sharing or customize it to be visible only to certain friends or during specific times.",
            isOpen: false,
          },
          {
            question: "Is Pinq safe to use?",
            answer:
              "Yes, safety is a priority at Pinq. The app offers advanced privacy controls and real-time connection features to keep you safe and social.",
            isOpen: false,
          },
          {
            question: "Can I use Pinq to meet new people?",
            answer:
              "Yes! Pinq lets you discover new people with shared interests and explore exciting places around you.",
            isOpen: false,
          },
        ],
        slides:2,
        windowWidth: window.innerWidth,
      };
    },
    watch:{
      windowWidth(){
        if(this.windowWidth < 1000){
          this.slides = 1
        }else{
          this.slides = 2
        }
      }
    }, 
    methods: {
      toggleAnswer(index) {
        this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
      },
      scrollToElement(el) {
        this.$refs[el].scrollIntoView({ behavior: "smooth" });
      },
      updateWidth() {
        this.windowWidth = window.innerWidth;
      },
      redirectToDownload() {
        window.location.href = "https://pinq.yooud.org/download";
      },
    },
};
</script>
<style>
.question-block{
    position: relative;
  }
  .faq-container {
    width: 100%;
    padding: 30px 100px 50px 100px !important;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
  }
  
  .faq-title {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 2em;
    color: rgb(0, 0, 0);
  }
  
  .faq-item {
    width: 100%;
  }
  
  .faq-question {
    width: 100%;
    padding: 15px;
    text-align: left;
    background-color: #000000;
    color: white;
    font-size: 1.1em;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .question-block:hover .svgstr{
    color: #000000;
  }
  .question-block:hover .faq-question{
    background-color: #ffc965;
    color: #000000;
  }
  
  .faq-answer {
    padding: 10px;
    width: 100%;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
  
  .faq-answer p {
    margin: 0;
  }
  .svgstr{
    position: absolute;
    top: 40%;
    right: 10px;
    color: #fff;
    cursor: pointer;
  }
  .head{
    display: flex;
    justify-content: center;
    padding: 40px 0;
    
  }
  .head-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px 30px;
    border-radius: 30px;
    background-color: #000;
    color: #fff;
  }
  .head-logo{
    font-size: 50px;
    text-align: center;
    margin-bottom: 5px;
  }
  .head-sloggan{
    text-align: center;
    font-weight: 300;
    font-style: italic;
    margin-bottom: 25px;
  }
  .head-btn-wrapper{
    display: flex;
    justify-content: center;
  }
  .head-btn{
    padding: 10px 15px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    width: 40%;
  }
  .head-btn:hover {
    box-shadow: 0px 5px 10px rgba(211, 176, 22, 0.5);
    color: #967418;
    animation: shadow-pulse 1s infinite;
  }
  .about{
    background-color: #000;
    padding: 40px 0;
  }
  .about-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .about-text{
    width: 48%;
    color: #fff;
    padding: 0px 15px;
  }
  .about-img-wrapper{
    width: 48%;
  }
  .about-img{
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
  }
  .about-text-head{
    font-size: 40px;
    margin-bottom: 15px;
  }

  .feature-slider {
    max-width: 800px;
    margin: auto;
  }
  .feature-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mySwiper {
    padding: 20px;
  }
  .features-wrapper{
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .features-head{
    text-align: center;
    font-size: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    width: 30%;
    margin-bottom: 20px;
  }
  .features-img-block{
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 100%;
    border: 1px solid black;
  }
  .features-img-block img{
    object-fit: cover;
    object-position: center;
  }
  .feature-content img{
    width: 100%;
    height: 100%;
    object-position: center;
  }
  .feature-content h3{
    padding: 15px;
  }

  .head{
    z-index: 9999;
    background-color: #fff;
  }
  @media (max-width: 1296px) {
    .about-wrapper{
      flex-direction: column;
      text-align: center;
      gap: 30px
    }
    .about-text{
      width: 100%;
    }
    .about-img-wrapper{
      width: 90%;
    }
    .feature-slider{
      width: 90%;
    }
    .features-img-block{
      width: 200px;
      height: 200px;
    }
  }
  @media (max-width: 768px) {
    .lending-page{
      padding-top: 50px;
    }
    .faq-container{
      padding: 15px !important;
    }
    .faq-answer{
      text-align: center;
    }
    .features-img-block{
      width: 200px;
      height: 200px;
    }
  }
  @media (max-width: 480px) {
    .features-head{
      width: 50%;
    }
  }
</style>