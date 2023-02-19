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

/* set scroll-padding-top to scroll everything to the bottom of the header */
const headerHeight = document.getElementsByTagName('Header')[0].getBoundingClientRect().bottom;
document.documentElement.style.setProperty('scroll-padding-top', headerHeight + 'px');


/* banner */

/* show fullname in banner when in view field */
const myNameIs = async () => {
  const nameSpan = document.getElementById("full-name");
  
  /* start animation when full-name span (nameSpan) is completly in view field  */
  if (innerHeight + scrollY >= nameSpan.getBoundingClientRect().bottom) {

    /* remove event listener during execution of animation */
    window.removeEventListener('scroll', myNameIs);

    /* animation */
    lyrics = ["What?", "Who?", "Chicka-chicka", "Laszlo."];
    for (lyric of lyrics) {
      nameSpan.innerHTML = lyric;
      await delay(1000);
    }

    /* reactive event listener after animation execution */
    window.addEventListener('scroll', myNameIs);
  }
};

window.addEventListener('scroll', myNameIs);


/* about-me */

/*  show more-about-me or hide it */
/* const showMoreOrLessAboutMe = event => {
  if (event.target.innerHTML === 'Show more') {
    const moreAboutMe = document.getElementById('more-about-me');
    moreAboutMe.style.display = 'block';
    event.target.innerHTML = 'Show less';
    moreAboutMe.scrollIntoView();
  } 
  else {
    document.getElementById('more-about-me').style.display = 'none';
    event.target.innerHTML = 'Show more';
    document.getElementById('about-me').scrollIntoView();
  }
}

const moreAboutMeBtn = document.getElementById('more-about-me-button');
moreAboutMeBtn.addEventListener('click', showMoreOrLessAboutMe); */


/* projects */

const projects = document.getElementsByClassName('project-container');
const totalNumberOfProjects = 5; 

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
  button.id === 'next-button' ? setStylePropertiesOnElement(button, enabledNextButtonStyleProperties) : setStylePropertiesOnElement(button, enabledPreviousButtonStyleProperties);
}

const setButtonStyle = button => {
  if (button.disabled) {
    setDisabledButtonStyle(button);
  } else {
    setEnabledButtonStyle(button);
  }
}

const disableOrEnableButtons = () => {

  /* disable buttons when limits reached (first and last project) enabled buttons otherwise */
  if (currentShownProject === 0) {
    previousButton.disabled = true;
    nextButton.disabled = false;
  } else if (currentShownProject === totalNumberOfProjects-1) {
    console.log('currenShownProject: 4');
    nextButton.disabled = true;
    previousButton.disabled = false;
  } else {
    previousButton.disabled = false;
    nextButton.disabled = false;
  }

  /* update button styles according to disabled property */
  setButtonStyle(previousButton);
  setButtonStyle(nextButton);
}

/* set default styles. On page loading next-button is enabled and previous disabled by default */
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
setButtonStyle(nextButton);
setButtonStyle(previousButton);

/*  show next or previous project */
let currentShownProject = 0;

const showNextOrPreviousProject = event => {

  /* color current project point to white */
  const projectPoints = document.getElementsByClassName('project-point');
  projectPoints[currentShownProject].style.backgroundColor = '#FFF';

  /* hide current displayed project */
  projects[currentShownProject].style.display = 'none';

  /* show dahsboard project if event fired by first-link-project (in about-me section), next project if fired by next-button, previous button if fired by previous-button */
  if (event.target.id === 'first-project-link') {
    currentShownProject = 2;
  } else if (event.target.id === 'next-button')  {
    currentShownProject++;
  } else {
    currentShownProject--;
  }

  /* show new project */
  projects[currentShownProject].style.display = 'grid';
  document.getElementById('projects').scrollIntoView();

  disableOrEnableButtons();
  projectPoints[currentShownProject].style.backgroundColor = '#FF1F25';
}

const firstProjectLink = document.getElementById('first-project-link');
nextButton.addEventListener('click', showNextOrPreviousProject);
previousButton.addEventListener('click', showNextOrPreviousProject);
firstProjectLink.addEventListener('click', showNextOrPreviousProject);


const showClickedProject = event => {
  projectPoints[currentShownProject].style.backgroundColor = '#FFF';
  /* hide current displayed project */
  projects[currentShownProject].style.display = 'none';

  /* show clicked project */
  currentShownProject =  Number(event.target.id.slice(-1));
  projects[currentShownProject].style.display = 'grid';
  document.getElementById('projects').scrollIntoView();

  disableOrEnableButtons();
  projectPoints[currentShownProject].style.backgroundColor = '#FF1F25';
}


const projectPoints = document.getElementsByClassName('project-point');
const projectPointsArr = Array.from(projectPoints);
projectPointsArr.forEach(projectPoint => projectPoint.addEventListener('click', showClickedProject));



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
const formInputsArr = Array.from(formInputs);
formInputsArr.forEach(formInput => formInput.addEventListener('input', validateInput))
