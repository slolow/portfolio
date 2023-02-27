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

/* function calls */

/* set scroll-padding-top to scroll everything to the bottom of the header */
const headerHeight = document.getElementsByTagName('Header')[0].getBoundingClientRect().bottom;
const scrollPaddingTop = headerHeight - 0.01*headerHeight; /* needed to work in chrome */
document.documentElement.style.setProperty('scroll-padding-top', scrollPaddingTop + 'px');


/* 2. BANNER */

/* functions */

/* show fullname in banner when in view field */
const myNameIs = async () => {
  const nameSpan = document.getElementById("full-name");
  
  /* start animation when full-name span (nameSpan) is completly in view field  */
  if (innerHeight + scrollY >= nameSpan.getBoundingClientRect().bottom) {

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

const showNewCarouselItem = (className, carouselItems, index) => {
  if (className.includes('project')) {
    carouselItems[index].style.display = 'grid';
    document.getElementById('projects').scrollIntoView();
    currentShownIndices['projects'] = index;
  } else {
    carouselItems[index].style.display = 'block';
    document.getElementById('about-me').scrollIntoView();
    currentShownIndices['about-me-section'] = index;
  }
}

const showNextOrPreviousCarouselItem = event => {
  let [carouselIndicatorClassName, 
       carouselIndicatorInactiveBackgroundColor,
       currentShownIndex,
       carouselItems] = setCarouselStyles(event.target.className);

  /* show dahsboard project if event fired by first-link-project (in about-me section), next carousel item if fired by next-button, previous carousel item if fired by previous-button */
  if (event.target.id === 'first-project-link') {
    newIndex = 2;
  } else if (event.target.classList.contains('next-button'))  {
    newIndex = currentShownIndex + 1;
  } else {
    newIndex = currentShownIndex - 1;
  }

  setCarouselIndicatorStyles(carouselIndicatorClassName, carouselIndicatorInactiveBackgroundColor, currentShownIndex, newIndex);
  carouselItems[currentShownIndex].style.display = 'none';
  showNewCarouselItem(event.target.className, carouselItems, newIndex);
  disableOrEnableButtons(event.target, newIndex);
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
    carouselItems[currentShownIndex].style.display = 'none';
    showNewCarouselItem(event.target.className, carouselItems, newIndex);
    
    /* simulate a carousel-button to update disabled propertie of real carousel-buttons */
    const classList = [];
    event.target.classList.contains('project-indicator') ? classList.push('project-button') : classList.push('about-me-button');
    newIndex > currentShownIndex ? classList.push('next-button') : classList.push('previous-button');

    /* get carouselButton to coresponding cliked carouselIndicator. callsList e.g. : ['project-button next-button]  */
    const carouselButton = document.getElementsByClassName(classList.join(' '))[0];
    disableOrEnableButtons(carouselButton, newIndex);
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

console.log(document.referrer);
