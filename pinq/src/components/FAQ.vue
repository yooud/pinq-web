<template>
        <div class="faq-container">
        <h1 class="faq-title">Frequently asked questions (FAQ)</h1>
    
        <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
            <div class="question-block">
                <button class="faq-question" @click="toggleAnswer(index)">    
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

  </template>
  
  <script>
  export default {
    data() {
      return {
        faqItems: [
          {
            question: "Що таке FAQ?",
            answer:
              "FAQ — це абревіатура від 'Frequently Asked Questions' (Часто задавані питання), що містить список найпоширеніших запитань і відповідей на них.",
            isOpen: false,
          },
          {
            question: "Що таке FAQ?",
            answer:
              "FAQ — це абревіатура від 'Frequently Asked Questions' (Часто задавані питання), що містить список найпоширеніших запитань і відповідей на них.",
            isOpen: false,
          },
          {
            question: "Що таке FAQ?",
            answer:
              "FAQ — це абревіатура від 'Frequently Asked Questions' (Часто задавані питання), що містить список найпоширеніших запитань і відповідей на них.",
            isOpen: false,
          },
          {
            question: "Що таке FAQ?",
            answer:
              "FAQ — це абревіатура від 'Frequently Asked Questions' (Часто задавані питання), що містить список найпоширеніших запитань і відповідей на них.",
            isOpen: false,
          },
          {
            question: "Що таке FAQ?",
            answer:
              "FAQ — це абревіатура від 'Frequently Asked Questions' (Часто задавані питання), що містить список найпоширеніших запитань і відповідей на них.",
            isOpen: false,
          },
        ],
      };
    },
    methods: {
      toggleAnswer(index) {
        this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .question-block{
    position: relative;
  }
  .faq-container {
    width: 100%;
    max-width: 1200px;
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
  </style>
  