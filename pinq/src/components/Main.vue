<template>
  <div class="lending-page">
    <div class="head">
      <div class="container">
        <div class="head-wrapper">
          <h1 class="head-logo">
            pinq
          </h1>
          <h3 class="head-sloggan">
            Keep your friends closer, stay in touch in real time!
          </h3>
          <div class="head-btn-wrapper">
            <button class="head-btn">Install</button>
          </div>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="container">
        <div class="about-wrapper">
          <div class="about-text">
            <h2 class="about-text-head">
              About the App
            </h2>
            <p class="about-text-p">
              Pinq is a mobile social networking app designed to enhance real-time connections. With GPS tracking, users can see their friends' locations on a map, send and receive instant messages, and get notifications when friends are nearby. pinq also enables users to discover new people with shared interests and explore exciting places around them. Privacy controls allow users to manage visibility by choosing who can see their location or setting location-sharing preferences for specific times or friends. Ideal for spontaneous meet-ups and group events, pinq keeps friends connected and helps users stay safe and social in real time.
            </p>
          </div>
          <div class="about-img-wrapper">
            <img src="../assets/about.jpg" alt="" class="about-img">
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
              :slides-per-view="2"
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
                    <img src="../assets/nearby.png" alt="Feature image" />
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
  </div>
</template>
<script>
import {  SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name:'MainC',
  components: {
    SwiperSlide
  },
  data() {
    return {

    };
  },
};
</script>
<style>
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
  .feature-content img{
    width: 100%;
    height: 100%;
    object-position: center;
  }
  .feature-content h3{
    padding: 15px;
  }
</style>