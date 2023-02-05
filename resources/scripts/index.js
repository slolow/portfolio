/* universal */
/* delay function
source: https://alvarotrigo.com/blog/wait-1-second-javascript/  */
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));


/* banner */
/* show fullname in banner when mouseover name */
const myNameIs = async () => {
  const nameSpan = document.getElementsByClassName("name")[0];
  lyrics = ["What?", "Who?", "Chicka-chicka", "Laszlo Starost."];
  for (lyric of lyrics) {
    nameSpan.innerHTML = lyric;
    await delay(1000);
  }
};

const nameP = document.getElementsByClassName("name-paragraph")[0];
nameP.addEventListener("mouseover", myNameIs, { once: true });

/* about-me */
/*  show more-about-me or hide it */
const showMoreOrLessAboutMe = event => {
  if (event.target.innerHTML === 'Show more') {
    document.getElementById('more-about-me').style.display = 'block';
    event.target.innerHTML = 'Show less';
  } 
  else {
    document.getElementById('more-about-me').style.display = 'none';
    event.target.innerHTML = 'Show more';
    document.getElementById('about-me').scrollIntoView();

  }
}

const moreAboutMeBtn = document.getElementById('more-about-me-button');
moreAboutMeBtn.addEventListener('click', showMoreOrLessAboutMe)
