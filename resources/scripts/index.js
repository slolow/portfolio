/* universal */

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

/* set scroll-padding-top to scroll everything to the bottom of the header */
const headerHeight = document.getElementsByTagName('Header')[0].getBoundingClientRect().bottom;
const scrollPaddingTop = headerHeight - 0.01*headerHeight; /* needed to work in chrome */
document.documentElement.style.setProperty('scroll-padding-top', scrollPaddingTop + 'px');


/* banner */

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

window.addEventListener('scroll', myNameIs);

/* projects and about-me */

/* const projects = document.getElementsByClassName('project-container'); */
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

/*  show next or previous project */
const currentShownIndices = {
  projects: 0,
  'about-me-section': 0
}

const showNextOrPreviousCarouselItem = event => {

  /* find carousel items to update and set stylings for carousel indicator*/
  let carouselIndicatorClassName,
      carouselIndicatorInactiveBackgroundColor,
      currentShownIndex, 
      carouselItems;  
  if (event.target.classList.contains('project-button')) {
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

  /* find corresponding carousel indicators to carousel items and style them  */
  const carouselIndicator = document.getElementsByClassName(carouselIndicatorClassName);
  carouselIndicator[currentShownIndex].style.backgroundColor = carouselIndicatorInactiveBackgroundColor;

  /* hide current displayed carousel item */
  carouselItems[currentShownIndex].style.display = 'none';

  /* show dahsboard project if event fired by first-link-project (in about-me section), next carousel item if fired by next-button, previous carousel item if fired by previous-button */
  if (event.target.id === 'first-project-link') {
    currentShownIndex = 2;
  } else if (event.target.classList.contains('next-button'))  {
    currentShownIndex++;
  } else {
    currentShownIndex--;
  }

  /* show new crousel item */
  if (event.target.classList.contains('project-button')) {
    carouselItems[currentShownIndex].style.display = 'grid';
    document.getElementById('projects').scrollIntoView();
    currentShownIndices['projects'] = currentShownIndex;
  } else {
    carouselItems[currentShownIndex].style.display = 'block';
    document.getElementById('about-me').scrollIntoView();
    currentShownIndices['about-me-section'] = currentShownIndex;
  }

  disableOrEnableButtons(event.target, currentShownIndex);
  carouselIndicator[currentShownIndex].style.backgroundColor = '#FF1F25';
}

const firstProjectLink = document.getElementById('first-project-link');
firstProjectLink.addEventListener('click', showNextOrPreviousCarouselItem);
const carouselButtons = document.getElementsByClassName('carousel-button');
const carouselButtonsArr = addEventListenerToHTMLCollection(carouselButtons, 'click', showNextOrPreviousCarouselItem);
carouselButtonsArr.forEach(carouselButton => setButtonStyle(carouselButton));


const showClickedCarouselItem = event => {

  /* find carousel items to update and set stylings for carousel indicator */
  let carouselIndicatorClassName,
      carouselIndicatorInactiveBackgroundColor,
      currentShownIndex,
      newShownIndex,
      carouselItems;
  if (event.target.classList.contains('project-indicator')) {
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

  /* get new index of clicked carousel item */
  newShownIndex =  Number(event.target.id.slice(-1));

  /*  do nothing when clicked carousel item is already shown */
  if (newShownIndex !== currentShownIndex) {
    const carouselIndicators = document.getElementsByClassName(carouselIndicatorClassName);
    carouselIndicators[currentShownIndex].style.backgroundColor = carouselIndicatorInactiveBackgroundColor;
  
    /* hide current displayed project */
    carouselItems[currentShownIndex].style.display = 'none';
  
    const classList = [];
    if (event.target.classList.contains('project-indicator')) {
      carouselItems[newShownIndex].style.display = 'grid';
      document.getElementById('projects').scrollIntoView();
      currentShownIndices['projects'] = newShownIndex;
      classList.push('project-button');
    } else {
      carouselItems[newShownIndex].style.display = 'block';
      document.getElementById('about-me').scrollIntoView();
      currentShownIndices['about-me-section'] = newShownIndex;
      classList.push('about-me-button');
    }
    
    carouselIndicators[newShownIndex].style.backgroundColor = '#FF1F25';
    
    newShownIndex > currentShownIndex ? classList.push('next-button') : classList.push('previous-button');

    /* get carouselButton to coresponding cliked carouselIndicator. callsList e.g. : ['project-button next-button]  */
    const carouselButton = document.getElementsByClassName(classList.join(' '))[0];
    disableOrEnableButtons(carouselButton, newShownIndex);
  }
  
}


const carouselIndicators = document.getElementsByClassName('carousel-indicator');
addEventListenerToHTMLCollection(carouselIndicators, 'click', showClickedCarouselItem);


/* contact */

/* needed for styling of auto fill input. Can't be done only with css. pattern needed in html input
minlength is not working for auto fill input
see: https://stackoverflow.com/questions/60456590/css-autofill-and-validation */

const validateInput = event => {

  /* color text blue when valid otherwise red */
  if (event.target.validity.valid) {
    const colorProperty = {'--webkit-text-fill-color': '#005cef'};
    setStylePropertiesOnElement(event.target, colorProperty);
  } else {
    const colorProperty = {'--webkit-text-fill-color': '#FF1F25'};
    setStylePropertiesOnElement(event.target, colorProperty);
  }
}

const formInputs = document.getElementsByClassName('form-input');
addEventListenerToHTMLCollection(formInputs, 'input', validateInput);
