<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-wrapper">
            <div class="footer-logo">
              <h5 class="footer-name hover">pinq</h5>
              <p class="footer-name-text hover">
                © 2024 pinq
              </p>
            </div>
            <div class="footer-main">
              <p class="footer-main-el hover">
                Install
              </p>
              <p class="footer-main-el hover">About us</p>
              <p class="footer-main-el hover">
                <router-link class="header-nav-link" :to="{ name: 'faq' }">
                  FAQ
                </router-link> 
              </p>
            </div>
            
            <div class="footer-social">
              <div class="footer-social-block">
                <svg class="svg" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12.2488 15.7229" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
        </div>
      </div>
    </footer>
  </template>
  
    <script>
    export default {
    name: "FooterC",
    };
    </script>
  
  <style>
  .footer {
    padding: 10px 0;
    flex-grow: 0;
    background-color: #000;
  }
  .footer-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 18px;
  }
  .footer-logo{
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .footer-name{
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }
  .footer-name-text{
    padding: 10px;
    cursor: pointer;
  }
  .footer-main{
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .footer-main-el{
    padding: 10px;
    cursor: pointer;
  }
  .hover:hover{
    color: #e4b42f;
  }
  .footer-social-block{
    cursor: pointer;
    padding: 1px 4px 1px 3px;
    border: 1px solid #fff;
    border-radius: 100%;
  }
  </style>
  