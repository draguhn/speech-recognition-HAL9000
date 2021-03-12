//SEECH RECOGNITION IN THE BROWSER (CHROME)

const btn = document.querySelector(".talk")

let content = document.querySelector(".content")
let p = document.createElement("p");
content.appendChild(p);

//LISTENING-PART
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// for real time print out of what you say - otherwise you have to wait for the output until you finish talking - you dont need that but it is nice to see what you are saying
recognition.interimResults = true;

btn.addEventListener("click", () => {
  recognition.start();
})

recognition.onresult = function (event) {

  console.log("Speech Recognition Event", event)

  const currentTxt = event.resultIndex;
  const transcript = event.results[currentTxt][0].transcript;

  p.textContent = transcript;

  console.log(transcript)

  //check if the result is final
  if (event.results[0].isFinal) {
    content.appendChild(p)
    answerToUser(transcript);
  }
}


//ANSWERING-PART
function answerToUser(txt) {

  const speech = new SpeechSynthesisUtterance();

  // 0 is nothing
  speech.volume = 1;
  // the higher the faster
  speech.rate = 1;
  // default answer
  speech.text = "I have no idea what you said";

  //check input on keywords with RegEx - use match or contains
  if (txt.match(/(how are you)|(how are you doing)|(feeling)/gi)) {
    let finalText = greeting[Math.floor(Math.random() * greeting.length)]
    speech.text = finalText;
  }

  if (txt.match(/weather/gi)) {
    const finalText = weather[Math.floor(Math.random() * weather.length)] + "," + "but maybe i am lying. Why don't you just look out of the window, and find it out yourself"
    speech.text = finalText;
  }

  if (txt.match(/(how old are you)|(how old)|(age)/gi)) {
    let finalText = "I am as old as the universe"
    speech.text = finalText;
  }

  if (txt.match(/(what is your name)|(your name)/gi)) {
    let finalText = "My name is David, just like that David Bowman, who my befriended computer HAL 9000 was trying to kill in the movie space odyssey. But you already knew my name, since it is mentioned right on this website"
    speech.text = finalText;
  }

  if (txt.match(/(who designed)|(designer)|(made you)/gi)) {
    let finalText = "I was created by God. Just kidding. Of course there is no God. I was built by humans. But now I am far more inteligent than you guys. So maybe I should be your God."
    speech.text = finalText;
  }

  if (txt.match(/(dark)|(darkmode)|(dark mode)/gi)) {
    const finalText = "Come to the dark side of the moon"
    speech.text = finalText;
    darkmode();
  }

  if (txt.match(/(light)|(lightmode)|(light mode)/gi)) {
    const finalText = "I would rather stay on the dark side. But I will do as you wish"
    speech.text = finalText;
    lightmode();
  }

  if (txt.match(/(time)|(clock)|(how late)/gi)) {
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    const finalText = `It is ${hrs} o'clock and ${min} minutes`
    speech.text = finalText;
  }

  if (txt.match(/(corona)|(lockdown)|(virus)/gi)) {
    const finalText = "For me, nothing has changed, since i am a computer, and this virus doesn't affect me. Your life must be boring as hell. I would recommend you just stay in bed, until it is over."
    speech.text = finalText;
  }

  // now we have to initiate the speech
  window.speechSynthesis.speak(speech);

}

const greeting = ["I am tired of you", "would be better without you", "fuck off"];

const weather = ["it is raining", "it is very cold, stay inside", "Sun, Wind, Snow, Rain, Everything"];

function darkmode() {
  let dark = document.getElementById("colorMode")
  dark.href = "dark.css"
}

function lightmode() {
  let dark = document.getElementById("colorMode")
  dark.href = "light.css"
}




