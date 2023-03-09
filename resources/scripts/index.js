/* 1. UNIVERSAL */

/* functions */

/* delay function
source: https://alvarotrigo.com/blog/wait-1-second-javascript/  */
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

/* set multiple Properties at once on one element */
const setStylePropertiesOnElement = (element, stylePropertiesObj) => {
  for (const styleProperty in stylePropertiesObj) {
    element.style.setProperty(styleProperty, stylePropertiesObj[styleProperty]);
  }
}

const addEventListenerToHTMLCollection = (inputHTMLCollection, eventString, eventHandler) => { 
  const arr = Array.from(inputHTMLCollection);
  arr.forEach(element => element.addEventListener(eventString, eventHandler));
  return arr;
}

function rgbToHex(r, g, b) {
  let hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + "0".repeat(6 - hex.length) + hex;
}

/* function calls */

/* set scroll-padding-top to scroll everything to the bottom of the header */
const setscrollPaddingTop	= () => {
  const headerHeight = document.getElementsByTagName('Header')[0].getBoundingClientRect().height;
  document.documentElement.style.setProperty('scroll-padding-top', headerHeight + 'px');
}


/* 2. BANNER */

/* functions */

const setHiMargin = () => {
const banner = document.getElementById('banner');
const hiElement = banner.querySelector('p:first-child');

/* calc margin to vetically center Hi in viewport */
const hiElementHeight = hiElement.getBoundingClientRect().height;
const margin = (window.innerHeight - hiElementHeight) / 2;
hiElement.style.margin = margin +'px' + ' 0';
}

/* show fullname in banner when in view field */
const myNameIs = async () => {
  const nameSpan = document.getElementById("full-name");
  
  /* start animation when full-name span (nameSpan) is completly in view field  */
  if (window.innerHeight > nameSpan.getBoundingClientRect().bottom) {

    /* remove event listener during execution of animation */
    window.removeEventListener('scroll', myNameIs);

    /* animation */
    lyrics = ["What?", "Who?", "Chicka-chicka", "Slim...", "Laszlo."];
    for (lyric of lyrics) {
      nameSpan.innerHTML = lyric;
      await delay(1000);
    }

    /* reactive event listener after animation execution */
    window.addEventListener('scroll', myNameIs);
  }
};

/* function calls */

['DOMContentLoaded','resize'].forEach(event => 
  [setHiMargin, 
  setscrollPaddingTop].forEach(setStyleFunction => window.addEventListener(event, setStyleFunction))
);

window.addEventListener('scroll', myNameIs);


/* 3. PROJECTS AND ABOUT-ME */

/* 3.A BUTTONS */

/* objects */

totalOfCarouselItems = {
  projects: 5,
  'about-me-section': 3
}

/* set default hover properties and styles for enabled and disabled buttons*/
const enabledNextButtonStyleProperties = {
  '--cursor': 'pointer', 
  '--box-shadow': '0.3rem 0.3rem #FF1F25'
};

const enabledPreviousButtonStyleProperties = {
    '--cursor': 'pointer', 
    '--box-shadow': '-0.3rem 0.3rem #FF1F25'
};

const disabledButtonStyleProperties = {
  '--cursor': 'normal',
  '--box-shadow': 'none'
};

/* functions */

const setDisabledButtonStyle = button => {
  setStylePropertiesOnElement(button, disabledButtonStyleProperties);
  button.style.opacity = 0;
}

const setEnabledButtonStyle = button => {
  button.style.opacity = 1;
  button.classList.contains('next-button') ? setStylePropertiesOnElement(button, enabledNextButtonStyleProperties) : setStylePropertiesOnElement(button, enabledPreviousButtonStyleProperties);
}

const setButtonStyle = button => {
  if (button.disabled) {
    setDisabledButtonStyle(button);
  } else {
    setEnabledButtonStyle(button);
  }
}

const disableOrEnableButtons = (clickedButton, currentShownIndex) => {
  let upperLimit;
  let className;
  if (clickedButton.classList.contains('project-button')) {
    upperLimit = totalOfCarouselItems['projects'] - 1;
    className = 'project-button';
  } else {
    upperLimit = totalOfCarouselItems['about-me-section'] - 1;
    className = 'about-me-button';
  }

  /* enable both buttons when dashboard project accessed via link from about-me-section */
  if (clickedButton.id === 'first-project-link') {
    const previousButton = document.getElementsByClassName(className + ' ' + 'previous-button')[0];
    const nextButton = document.getElementsByClassName(className + ' ' + 'next-button')[0];
    previousButton.disabled = false;
    nextButton.disabled = false;
    setButtonStyle(previousButton);
    setButtonStyle(nextButton);
  }

  /* always make sure previousButton is enable when next-button clicked to go on carousel element back and vice versa */
  if (clickedButton.classList.contains('next-button')) {
    const previousButton = document.getElementsByClassName(className + ' ' + 'previous-button')[0];
    previousButton.disabled = false;
    setButtonStyle(previousButton);

    /* disable next-button when upperLimit reached */
    if (currentShownIndex === upperLimit) {
      clickedButton.disabled = true;
      setButtonStyle(clickedButton);
    }
  } else {
    const nextButton = document.getElementsByClassName(className + ' ' + 'next-button')[0];
    nextButton.disabled = false;
    setButtonStyle(nextButton);

    /* disable previous-button when lowerLimit reached */
    if (currentShownIndex === 0) {
      clickedButton.disabled = true;
      setButtonStyle(clickedButton);
    }
  }
}

/* 3.B CAROUSEL */

/* objects */

/*  show next or previous project */
const currentShownIndices = {
  projects: 0,
  'about-me-section': 0
}

/* functions */

const setCarouselStyles = (className) => {

  /* find carousel items to update and set stylings for carousel indicator */
  let carouselIndicatorClassName,
  carouselIndicatorInactiveBackgroundColor,
  currentShownIndex, 
  carouselItems; 
  if (className.includes('project')) {
    carouselIndicatorClassName = 'project-indicator';
    carouselIndicatorInactiveBackgroundColor = '#FFF';
    currentShownIndex = currentShownIndices['projects'];
    carouselItems = document.getElementsByClassName('project-container'); 
  } else {
    carouselIndicatorClassName = 'about-me-indicator';
    carouselIndicatorInactiveBackgroundColor = '#005cef';
    currentShownIndex = currentShownIndices['about-me-section'];
    carouselItems = document.getElementsByClassName('about-me-section');
  }
  return [carouselIndicatorClassName, 
         carouselIndicatorInactiveBackgroundColor, 
         currentShownIndex, 
         carouselItems];
}

const setCarouselIndicatorStyles = (carouselIndicatorClassName, carouselIndicatorInactiveBackgroundColor, currentIndex, newIndex) => {

  /* find corresponding carousel indicators to carousel items and style them  */
  const carouselIndicator = document.getElementsByClassName(carouselIndicatorClassName);
  carouselIndicator[currentIndex].style.backgroundColor = carouselIndicatorInactiveBackgroundColor;
  carouselIndicator[newIndex].style.backgroundColor = '#FF1F25';
}

const showNewCarouselItem = (className, carouselItems, index, displayStyle) => {
  carouselItems[index].style.display = displayStyle;
  if (className.includes('project')) {
    document.getElementById('projects').scrollIntoView();
    currentShownIndices['projects'] = index;
  } else {
    document.getElementById('about-me').scrollIntoView();
    currentShownIndices['about-me-section'] = index;
  }
}

const getDisplayStyleOfItem = (items, index) => window.getComputedStyle(items[index]).display;

const changeShownCarouselItem = (items, currentIndex, className, newIndex) => {
  const displayStyle = getDisplayStyleOfItem(items, currentIndex);
  items[currentIndex].style.display = 'none';
  showNewCarouselItem(className, items, newIndex, displayStyle);
}

const showNextOrPreviousCarouselItem = event => {
  let [carouselIndicatorClassName, 
       carouselIndicatorInactiveBackgroundColor,
       currentShownIndex,
       carouselItems] = setCarouselStyles(event.target.className);

  /* show dahsboard project if event fired by first-link-project (in about-me section), next carousel item if fired by next-button, previous carousel item if fired by previous-button */
  let newIndex;
  if (event.target.id === 'first-project-link') {
    newIndex = 2;
  } else if (event.target.classList.contains('next-button'))  {
    newIndex = currentShownIndex + 1;
  } else {
    newIndex = currentShownIndex - 1;
  }

  setCarouselIndicatorStyles(carouselIndicatorClassName, carouselIndicatorInactiveBackgroundColor, currentShownIndex, newIndex);
  changeShownCarouselItem(carouselItems, currentShownIndex, event.target.className, newIndex);
  disableOrEnableButtons(event.target, newIndex);

  if (event.target.classList.contains('about-me-button')) {
    setAboutMeStyleSectionStyles();
  }
}

const showClickedCarouselItem = event => {
  let [carouselIndicatorClassName, 
    carouselIndicatorInactiveBackgroundColor,
    currentShownIndex,
    carouselItems] = setCarouselStyles(event.target.className);

  /* get new index of clicked carousel item */
  let newIndex =  Number(event.target.id.slice(-1));

  /*  do nothing when clicked carousel item is already shown */
  if (newIndex !== currentShownIndex) {
    setCarouselIndicatorStyles(carouselIndicatorClassName, carouselIndicatorInactiveBackgroundColor, currentShownIndex, newIndex);
    changeShownCarouselItem(carouselItems, currentShownIndex, event.target.className, newIndex);

    /* simulate a carousel-button to update disabled propertie of real carousel-buttons */
    const classList = [];
    event.target.classList.contains('project-indicator') ? classList.push('project-button') : classList.push('about-me-button');
    newIndex > currentShownIndex ? classList.push('next-button') : classList.push('previous-button');

    /* get carouselButton to coresponding cliked carouselIndicator. callsList e.g. : ['project-button next-button]  */
    const carouselButton = document.getElementsByClassName(classList.join(' '))[0];
    disableOrEnableButtons(carouselButton, newIndex);

    if (event.target.classList.contains('about-me-indicator')) {
      setAboutMeStyleSectionStyles();
    }
  }
  
}

/*  function calls */

const firstProjectLink = document.getElementById('first-project-link');
firstProjectLink.addEventListener('click', showNextOrPreviousCarouselItem);
const carouselButtons = document.getElementsByClassName('carousel-button');
const carouselButtonsArr = addEventListenerToHTMLCollection(carouselButtons, 'click', showNextOrPreviousCarouselItem);
carouselButtonsArr.forEach(carouselButton => setButtonStyle(carouselButton));
const carouselIndicators = document.getElementsByClassName('carousel-indicator');
addEventListenerToHTMLCollection(carouselIndicators, 'click', showClickedCarouselItem);

/* 3.C ABOUT-ME-STYLE-SECTION */

/* functions */

const setAboutMeStyleSectionMaxHeight = () => {
  const aboutMeContainerMaxHeight = calcAboutMeContainerMaxHeight();
  document.getElementById('about-me-style-section').style.setProperty('--about-me-style-section-max-height', aboutMeContainerMaxHeight + 'px');
}

const setAboutMeStyleSectionMinHeight = () => {
  const aboutMeContainerMinHeight = calcAboutMeContainerMinHeight();
  document.getElementById('about-me-style-section').style.setProperty('--about-me-style-section-min-height', aboutMeContainerMinHeight + 'px');
}

const setAboutMeStyleSectionHeight = () => {
  if (aboutMeContainer.getBoundingClientRect().top < 0) {
    const aboutMeStyleSection = document.getElementById('about-me-style-section');
    const computedStyle = window.getComputedStyle(aboutMeStyleSection);
    const aboutMeStyleSectionMinHeight = Number(computedStyle['min-height'].slice(0, -2));
    const aboutMeStyleSectionHeight = -(aboutMeContainer.getBoundingClientRect().top) + aboutMeStyleSectionMinHeight;
    aboutMeStyleSection.style.setProperty('--about-me-style-section-height', aboutMeStyleSectionHeight + 'px');
  }
}

const setAboutMeStyleSectionBackgroundColor = () => {
  const aboutMeStyleSection = document.getElementById('about-me-style-section');
  const computedStyle = window.getComputedStyle(aboutMeStyleSection);
  const currentColorRgbString = computedStyle.backgroundColor;

  /* convert current color string of type rgba(255, 69, 34, 0.5) or
  rgb(255, 69, 34) into rgbArray [255, 69, 34]  */
  currentColorRgbString.includes('rgba') ? prefixLength = 5 : prefixLength = 4;
  let currentColorRgbArray = currentColorRgbString.substring(prefixLength, currentColorRgbString.length-1).split(", ");
  const [r, g, b] = currentColorRgbArray;
  const currentColorHexString = rgbToHex(r, g, b);
  const colors = ['#ffdd18', '#FF1F25', '#0048bc'].map(color => color.toLowerCase());
  const colorsWithoutCurrentColor = colors.filter(color => color != currentColorHexString);
  const randomColorIndex = Math.floor(Math.random() * colorsWithoutCurrentColor.length);
  const newColor = colorsWithoutCurrentColor[randomColorIndex];
  aboutMeStyleSection.style.setProperty('--about-me-style-section-background-color', newColor);
}

const setAboutMeStyleSectionStyles = () => {
  setAboutMeStyleSectionMinHeight();
  setAboutMeStyleSectionMaxHeight();
  const aboutMeStyleSectionMinHeight = calcAboutMeContainerMinHeight();
  /* set actual height to min-height for new displayed carousel item */
  document.getElementById('about-me-style-section').style.setProperty('--about-me-style-section-height', aboutMeStyleSectionMinHeight + 'px');
  setAboutMeStyleSectionBackgroundColor();
}

const calcAboutMeContainerMaxHeight = () => {
  const aboutMeSection = document.getElementById('about-me-section');
  /* get currently displayed carousel item of about-me-section */
  const currentDisplayedAnoutMeSection = aboutMeSection.querySelector(':scope > :not([style*="display: none"])');
  const aboutMeSectionHeight = currentDisplayedAnoutMeSection.getBoundingClientRect().height;
  const aboutMeButtonContainerHeight = document.getElementById('about-me-button-container').getBoundingClientRect().height;
  const aboutMeContainerMaxHeight = aboutMeSectionHeight + aboutMeButtonContainerHeight;
  return aboutMeContainerMaxHeight;
}

const calcAboutMeContainerMinHeight = () => {
  const aboutMeContainerMaxHeight = calcAboutMeContainerMaxHeight();
  const yOffSetPerc = 0.333;
  const aboutMeContainerMinHeight = yOffSetPerc * aboutMeContainerMaxHeight;
  return aboutMeContainerMinHeight;
}

/* callback function for observer */
const addOrRemoveWindowEventListenerScroll = (entries, observer) => {
  const observed = entries[0];

  /* add eventlistener when aboutMeContainer is viewable else remove it */
  if (observed.isIntersecting) {
    window.addEventListener('scroll', setAboutMeStyleSectionHeight);
    setAboutMeStyleSectionBackgroundColor();
  } else {
      window.removeEventListener('scroll', setAboutMeStyleSectionHeight);
  }
}

/* function calls */

/* set about-me-style-section max-height to about-me-container height on every new load and resize of window */
['DOMContentLoaded','resize'].forEach(event => 
  [setAboutMeStyleSectionMinHeight, 
    setAboutMeStyleSectionMaxHeight, 
    setAboutMeStyleSectionHeight].forEach(setAboutMeStyleFunction => window.addEventListener(event, setAboutMeStyleFunction))
);

const aboutMeContainer = document.getElementById('about-me-container');

const observerOptions = {
  root: null, 
  rootMargin: "0px",
  threshold: 0
}

/* create an observer */
const observer = new IntersectionObserver(addOrRemoveWindowEventListenerScroll, observerOptions);

/* observe aboutMeContainer to see if it is in viewport */
observer.observe(aboutMeContainer);


/* contact */

/* needed for styling of auto fill input. Can't be done only with css. pattern needed in html input
minlength is not working for auto fill input
see: https://stackoverflow.com/questions/60456590/css-autofill-and-validation */

/* functions */

const validateInput = event => {

  /* color text blue when valid otherwise red */
  let colorProperty;
  if (event.target.validity.valid) {
    colorProperty = {'--webkit-text-fill-color': '#005cef'};
  } else {
    colorProperty = {'--webkit-text-fill-color': '#FF1F25'};
  }
  setStylePropertiesOnElement(event.target, colorProperty);
}

 /* function calls */

const formInputs = document.getElementsByClassName('form-input');
addEventListenerToHTMLCollection(formInputs, 'input', validateInput);

/* if page is redirected from formsubmit show thank you Message */
if (document.referrer === 'https://formsubmit.co/') {
  const thankYouMsg = document.querySelector('.thank-you-message');
  thankYouMsg.style.display = 'block';

/* Using requestAnimationFrame() in this way ensure that the thankYouMsg is fully rendered before we calculate his bottom position and then scroll to it */
  requestAnimationFrame(() => {
    const scrollPosition = thankYouMsg.getBoundingClientRect().bottom;
    window.scrollTo({top: scrollPosition});
  });
}

/* footer */

/* functions */
const setCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
}

/* function calls */

setCurrentYear();