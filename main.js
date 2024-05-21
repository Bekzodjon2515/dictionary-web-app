// "use strict";


const bodyEl = document.querySelector('body');
const checkBox = document.querySelector('.switch input');
const selectOptions = document.querySelector('.content select ');

const searchBtn = document.querySelector(".search");
const inputEl = document.querySelector("form input");

const disContainer = document.querySelector(".disctonary_content");
const partofSeech = document.querySelector(".partofSeachNoun");

const ulEl = document.querySelector('.meanings');
const SysEl = document.querySelector(".syn");
const verbEl = document.querySelector(".verb");
const form = document.querySelector("form");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchBtn.addEventListener("click", () => {
    if (inputEl.value !== "") {
        searching(inputEl.value);
        // console.log("working");
        inputEl.style.border = "";
        inputEl.value = "";

    } else {
        inputEl.style.border = "1px solid red";
    }
});

async function searching(data) {
    try {
        const api_data = await fetch(API_URL + data);
        const result = await api_data.json();

        const html = ` <div class="section">
                        <h2>${result[0].word}</h2>
                        <p>${result[0].phonetic}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" 
                    class = "playBtn"
                    fill="none">
                        <circle opacity="0.25" cx="37.5" cy="37.5" r="37.5" fill="#A445ED" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M29 27V48L50 37.5L29 27Z" fill="#A445ED" />
                    </svg>
                </div>`;

        disContainer.innerHTML = html;
        partofSeech.textContent = result[0].meanings[0].partOfSpeech;

        const li = ` <li>
                     ${result[0].meanings[0].definitions[0].definition}
                    </li>
                    <li>
                     ${result[0].meanings[0].definitions[1].definition}
                   </li>
                   <li>
                    ${result[0].meanings[0].definitions[2].definition}
                    </li>
                    `;


        ulEl.innerHTML = li;

        const sys = result[0].meanings[0].synonyms;
        SysEl.textContent = "";
        for (let i = 0; i < sys.length; i++) {
            SysEl.textContent += sys[i] + " ";

        }

        let partofSpeech2 = `  <div class="verbContent">
                        <h3>${result[0].meanings[1].partOfSpeech}</h3>
                        <p>Meaning</p>
                        <ul class="meanings">
                            <li>${result[0].meanings[1].definitions[0].definition}</li>
                           
                        </ul>
                    </div>`;
        
            
        verbEl.innerHTML = partofSpeech2;

        const playBtn = document.querySelector(".playBtn");

        playBtn.addEventListener('click',() => {
            // console.log("working");
            const speechWord = result[0].word;
            sppechText(speechWord);
        })

        console.log(result);
    }   catch (error) {
        console.log(error);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searching(inputEl.value);
    inputEl.value = "";
});


selectOptions.addEventListener("change", (e) => {
    let fonts = e.target.value;
    bodyEl.style.fontFamily = fonts;
});

checkBox.addEventListener("click", () => {
    bodyEl.classList.toggle("dark");
});

function sppechText (textSpeech){
    let speechText = new SpeechSynthesisUtterance();
    speechText.text = textSpeech
    speechText.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(speechText);
}

