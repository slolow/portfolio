/* delay function
source: https://alvarotrigo.com/blog/wait-1-second-javascript/  */
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

/* show fullname when mouseover name */
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
