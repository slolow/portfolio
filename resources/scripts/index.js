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
/* show fullname in banner when mouseover name */
const myNameIs = async () => {
  const nameSpan = document.getElementsByClassName("name")[0];
  nameSpan.style.animation = 'none';
  lyrics = ["What?", "Who?", "Chicka-chicka", "Laszlo Starost."];
  for (lyric of lyrics) {
    nameSpan.innerHTML = lyric;
    await delay(1000);
  }
};

/* window.addEventListener('scroll', myNameIs, {once: true}); */

const nameP = document.getElementsByClassName("name-paragraph")[0];
nameP.addEventListener("mouseover", myNameIs, { once: true });


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
const enabledButtonStyleProperties = {
  '--top': '0.1rem', 
  '--cursor': 'pointer', 
  '--box-shadow': '0.3rem 0.3rem 0.25rem #000'
};
const disabledButtonStyleProperties = {
  '--top': '0', 
  '--cursor': 'not-allowed', 
  '--box-shadow': 'none'
};

const setDisabledButtonStyle = button => {
  setStylePropertiesOnElement(button, disabledButtonStyleProperties);
  button.style.opacity = 0.3;
}

const setEnabledButtonStyle = button => {
  setStylePropertiesOnElement(button, enabledButtonStyleProperties);
  button.style.opacity = 1;
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
  /* hide current displayed project and show either next or previous */
  projects[currentShownProject].style.display = 'none';
  event.target.id === 'next-button' ? currentShownProject++ : currentShownProject--;
/*   projects[currentShownProject].scrollIntoView({inline: 'start'}); */
  projects[currentShownProject].style.display = 'grid';
  projects[currentShownProject].scrollIntoView({behavior: 'smooth'});

  /* disable buttons when limits reached (first and last project) enabled buttons otherwise */
  if (currentShownProject === 0) {
    previousButton.disabled = true;
  } else if (currentShownProject === totalNumberOfProjects-1) {
    nextButton.disabled = true;
  } else {
    previousButton.disabled = false;
    nextButton.disabled = false;
  }

  /* update button styles according to disabled property */
  setButtonStyle(previousButton);
  setButtonStyle(nextButton);
}

nextButton.addEventListener('click', showNextOrPreviousProject);
previousButton.addEventListener('click', showNextOrPreviousProject);


/* contact */

/* enable button when form ready to submit */

/* const contactSubmit = document.getElementById('contact-form-submit');
contactSubmit.addEventListener('click', ) */

/* show thank you message after submit */

/* const showThankYouMsg = () => document.getElementById('sending-msg').style.display = 'block';

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', showSendingMsg); */
