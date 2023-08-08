 // Function to fetch language data
  async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }
  
  // Function to set the language preference
  function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
  // Function to update content based on selected language
  function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData[key];
    });
  }
  
  // Function to change language
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);

    //
    toggleArabicStylesheet(lang);// Toggle Arabic stylesheet
  }

// Function to toggle Arabic stylesheet based on language selection
function toggleArabicStylesheet(lang) {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');
  
    if (link) {
      head.removeChild(link); // Remove the old stylesheet link
    }
    else if (lang === 'ar') {
        const newLink = document.createElement('link');
        newLink.id = 'styles-link';
        newLink.rel = 'stylesheet';
        newLink.href = './assets/css/style-ar.css'; // Path to Arabic stylesheet
        head.appendChild(newLink);
      }
  }
  
  
  // Call updateContent() on page load
  window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    toggleArabicStylesheet(userPreferredLanguage);
  });
  

// let enData, arData; // Define variables to hold language data

// // Load language data based on user preference or default to English
// const userPreferredLanguage = localStorage.getItem('language') || 'en';

// // Load English data
// fetch('languages/en.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     enData = data;
//     if (userPreferredLanguage === 'en') {
//       updateContent();
//     }
//   });

// // Load Arabic data
// fetch('languages/ar.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     arData = data;
//     if (userPreferredLanguage === 'ar') {
//       updateContent();
//     }
//   });
//   function updateContent() {
//     const langToUse = userPreferredLanguage === 'ar' ? arData : enData;
    
//     document.querySelectorAll('[data-i18n]').forEach(element => {
//       const key = element.getAttribute('data-i18n');
//       element.textContent = langToUse[key];
//     });
//   }

//   // Function to change language
//   function changeLanguage(lang) {
//     localStorage.setItem('language', lang);
//     location.reload();
//   }
  
//   // Call updateContent() on page load
//   window.addEventListener('DOMContentLoaded', () => {
//     updateContent();
//   });
  