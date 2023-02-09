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
const showMoreOrLessAboutMe = event => {
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
moreAboutMeBtn.addEventListener('click', showMoreOrLessAboutMe);


/* projects */
const projects = document.getElementsByClassName('project-container');
const totalNumberOfProjects = 5; 

/* set default hover properties and styles for enabled and disabled buttons*/
const enabledNextButtonStyleProperties = {
/*   '--top': '0.1rem',  */
  '--cursor': 'pointer', 
  '--box-shadow': '0.3rem 0.3rem #FF1F25'
};

const enabledPreviousButtonStyleProperties = {
/*     '--top': '0.1rem',  */
    '--cursor': 'pointer', 
    '--box-shadow': '-0.3rem 0.3rem #FF1F25'
};

const disabledButtonStyleProperties = {
  '--top': '0', 
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

/* set default styles. On page loading next-button is enabled and previous disabled by default */
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
setButtonStyle(nextButton);
setButtonStyle(previousButton);

/*  show next or previous project */
let currentShownProject = 0;

const showNextOrPreviousProject = event => {

  /* get project marker points (blue and red dots under project) */
  const buttonContainerChildrens = document.getElementsByClassName('button-container')[0].children;
  const buttonContainerChildrensArr = Array.from(buttonContainerChildrens);
  const projectPoints = buttonContainerChildrensArr.filter(children => children.className === 'project-point');

  /* color current project point to blue */
  projectPoints[currentShownProject].style.backgroundColor = 'blue';

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
  projects[currentShownProject].scrollIntoView({behavior: 'smooth'});


  /* disable buttons when limits reached (first and last project) enabled buttons otherwise and round the corner of project-container*/
  if (currentShownProject === 0) {
    projects[currentShownProject].style['border-radius'] = '1.25rem 1.25rem 0 1.25rem';
    previousButton.disabled = true;
  } else if (currentShownProject === totalNumberOfProjects-1) {
    projects[currentShownProject].style['border-radius'] = '1.25rem 1.25rem 1.25rem 0';
    nextButton.disabled = true;
  } else {
    projects[currentShownProject].style['border-radius'] = '1.25rem 1.25rem 0 0';
    previousButton.disabled = false;
    nextButton.disabled = false;
  }

  /* update button styles according to disabled property */
  setButtonStyle(previousButton);
  setButtonStyle(nextButton);

  /* update project point (marker) to red */
  projectPoints[currentShownProject].style.backgroundColor = 'red';
}

const firstProjectLink = document.getElementById('first-project-link');
nextButton.addEventListener('click', showNextOrPreviousProject);
previousButton.addEventListener('click', showNextOrPreviousProject);
firstProjectLink.addEventListener('click', showNextOrPreviousProject);


/* contact */

/* enable button when form ready to submit */

/* const contactSubmit = document.getElementById('contact-form-submit');
contactSubmit.addEventListener('click', ) */

/* show thank you message after submit */

/* const showThankYouMsg = () => document.getElementById('sending-msg').style.display = 'block';

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', showSendingMsg); */
