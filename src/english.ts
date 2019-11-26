import {
  LitElement,
  html,
  css,
  customElement
} from "lit-element";
import ConfettiGenerator from "confetti-js";
import { writeUserData} from "./util";
import { ProfileCard } from "./profile-card";
import {
  levels, Levels, Level, Forms, Word
} from "./data";
import { showLog } from "./log-screen";
declare global {
  interface Window {
    firebase: any;
  }
}

interface IUser {
  email: string;
  uid: number;
  name: string;
}


type PointCollection = { [key: string]: number };

export class EnglishVerbsGame extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return [
      css`
        :host {
          background: white;;
          width: 100vw;
          height: 100vh;
         
          --global-font: "Cabin", sans-serif;
          --global-color: #7fb2ff;
          --mobile-background-color: #ccd4e0;
          --mobile-top: linear-gradient(to bottom, #a57fff, #63bda2);
          --mobile-bottom: linear-gradient(to top, #a57fff, #63bda2);
          --mobile-global: #87c0c0;
          --desktop-color: #a57fff;
          --warn-color: #fff27f;
          --bad-color: #ffb27f;
          --good-color: #7dffaf;
          overflow: hidden;
        }
        
        #title {
          font-family: var(--global-font);
          font-size: 2rem;
        }
        #menubutton:hover{
          transform: scale(1.2);
          cursor: pointer;
        }
        #container {
          display: flex;
          width: 100%;
          justify-content: center;
          text-align: center;
          height: 100%;
        }
        input {
          outline: 1px solid white;
          border: none;
          animation: borderFlicker 0.4s infinite alternate-reverse;
        }

        @keyframes borderFlicker {
          100% {
            outline: 1px var(--global-color) solid;
          }
        }
        @keyframes wrong {
          to {
            background-color: var(--bad-color);
            color: white;
            outline: 1px solid var(--bad-color);
          }
        }

        input,
        .theword {
          width: 20vw;
          height: 30vh;
          font-size: 200%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: var(--global-font);
         
        }
        input{
          background-color:  transparent;
          color: var(--global-color);
          outline: 1px solid transparent;
        }
 
        @keyframes stop {
          to {
            outline: 1px solid var(--global-color);
          }
        }
        .theword {
          cursor: pointer;
          border: 1px solid var(--global-color);
          background-color:  var(--global-color);
          color: white;
        }
        select {
          justify-self: flex-start;
          padding: 0.6rem;
          width: max-content;
          background-color: white;
          font-family: var(--global-font);
          color: black;
          border: 1px solid black;
          margin-top: .6rem;
        }

        option {
          padding: 0.4rem;
          font-family: var(--global-font);
          font-size: 120%;
          background-color: white;
          color: black;
          border: 1px solid black;
        }

        #below {
          display: flex;
          margin-top: 6vh;
          width: 100%;
          height: 2.4rem;
          font-size: 140%;
          justify-content: center;
          color: black;
          font-family: var(--global-font);
        }
       

        .icon {
          object-fit: contain;
          background-color: transparent;
          width: 4.2rem;
          height: 1.8rem;
          margin-left: 1rem;
        }

        .flip-card {
          background-color: transparent;
          width: 20vw;
          height: 30vh;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        #points {
            border: none;
            background: transparent;
            color: white;
          width: max-content;
          height: max-content;
          font-size: 1rem;
        
          font-family: var(--global-font);
        }

        .flip-card-back {
          cursor: pointer;
          background-color: var(--global-color);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: var(--global-font);
          font-size: 200%;
          transform: rotateY(180deg);
          outline: 1px solid var(--global-color);
        }
        #translationbox {
          width: 100%;
          text-align: center;
          height: max-content;
          background-color: transparent;
          color: black;
          padding: 0.2rem;
          font-size: 130%;
          margin-top: 20vh;
          margin-bottom: 4vh;
          z-index: 997;
          font-family: var(--global-font);
        }

        #speaker {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 80%;
          margin-left: 0.7rem;
          width: 1.6rem;
          height: 1.6rem;
        }

        .hoverable {
          cursor: pointer;
          transform: scale(1.1);
        }

        #buttons {
          display:flex;
            background: var(--desktop-color);
            justify-content: space-between;
            height: 10vh;
            align-items: center;
            padding-left: 2%;
            padding-right: 2%;
            width: 96%;
            color: white;
          }
        
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 999;
        }
        
        
        @keyframes accepted {
          to {
            background-color: var(--global-color);
            color: white;
            outline: 1px solid var(--global-color);
          }
        }

        .box {
          font-size: 2rem;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: black;
          width: 60%;
          padding: 1rem;
          box-shadow: 3px 3px 6px gray;
          font-family: var(--global-font);
          text-align: center;
        }

        @media only screen and (max-width: 600px) {
          :host {
            background-image: none;
           
          }
          .flip-card,
          input,
          .theword {
            width: 30vw;
            height: 20vh;
            font-size: 80%;
            padding-left: 0.1rem;
            padding-right: 0.1rem;
          }
          .flip-card-back {
            font-size: 90%;
          }
          #below {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            margin-bottom: 0;
            background: var(--desktop-color);
            height: 8vh;
            align-items: center;
            color: black;
            width: 100%;
            justify-content: center;
            color: white;

          }
          #points {
            border: none;
            background: transparent;
            color: white;
          }
          #buttons {

            background: var(--desktop-color);
         
          }
          
        #title{
          font-size: 1rem;
        }
        #wrapper {
           display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          justify-content: center;
          justify-items: center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
        }
          #translationbox  {
            margin-top: 22vh;
            height: max-content;
            width: 80vw;
            text-align: center;
          }
         
          #buttons > svg {
            fill: white;
          }
          #speaker {
            margin-left: 0.3rem;
            font-size: 100%;
            width: 1rem;
            height: 1rem;
          }
          
          #box {
            font-size: 1.4rem;
            width: 90%;
            box-shadow: 3px 3px 3px gray;
          }
        }
      `
    ];
  }
  points: number = 0;
  greetingMessage: string;
  container: HTMLDivElement;
  data: Level;
  levels: Levels = levels;
  pointCollection: PointCollection;
  i: number = 0;
  n: number = 0;
  l: number = 0;
  correctWord: Forms;
  ref: boolean = false;
  speech = window.speechSynthesis;
  translationBox: HTMLDivElement;
  congratulations: HTMLDivElement;
  user!: IUser;
  menubutton: HTMLImageElement;
  translation: string;
  profileCard: ProfileCard;
  oldValue: string = "A2";
  firstUpdated(a: any) {
    super.firstUpdated(a);
    this.profileCard = this.shadowRoot.querySelector("#settings");
    this.points = this.pointCollection.A2;
    this.container = this.shadowRoot!.querySelector("#container");
    this.congratulations = this.shadowRoot!.querySelector("#congratulations");
    this.congratulations.style.display = "none";
    this.data = this.levels.A2;
    this.l = Object.entries(this.data).length;
    this.i = Math.floor(Math.random() * this.l);
    this.n = Math.floor(Math.random() * 3);
    let word: Word = Object.entries(this.data)[this.i];
    if (word[0].includes(" ")) {
      this.translation = Object.values(word)[0].toString();
    } else {
      this.translation = word[0];
    }
    let therest = word.slice(0) as Word;
    this.correctWord = Array.from(therest[1]);
    this.greet();
    this.requestUpdate();
  }

  greet() {
    setTimeout(() => {
      this.shadowRoot.querySelector<HTMLElement>("#greeting").style.display = "none";
      this.wordsAnimation();
    }, 2400);
  }
  
  wordsAnimation(){
   requestAnimationFrame(()=>{ 
     let boxes = Array.from(this.shadowRoot.querySelectorAll(".theword, input"));
    boxes.forEach((box, i)=>{
        box.animate([{transform: "translateY(-20px)"},{transform: "translateY(0px)"}],
        {duration: 600,
        delay: i*100})
      })});
    
  }

  selectionChoice(newValue: string){
      if(newValue === "All"){
        Object.values(this.levels).map(level=>{
          return this.data = {...level}
        })
         }
      else{
          this.data = this.levels[`${newValue}`];        }
      this.points = this.pointCollection[`${newValue}`];
      requestAnimationFrame(()=>{
      this.wordsAnimation();
     
      })
      this.refreshNumber();

  }

  menuFunctionality(){
      this.profileCard.style.transform = "translateX(0vw)";
    requestAnimationFrame(()=>{
      this.shadowRoot.querySelector<HTMLDivElement>("#wrapper").onclick = ()=>{
        this.profileCard.style.transform = "translateX(-80vw)";
        requestAnimationFrame(()=>{
        this.shadowRoot.querySelector<HTMLDivElement>("#wrapper").onclick = null;}
    )}});
}

pointsAddition() {
  this.points = this.points + 1;
  this.pointCollection[`${this.oldValue}`] = this.points;
  writeUserData(this.user.uid, this.pointCollection, this.user.name);
  this.requestUpdate();
  this.profileCard.requestUpdate();
}

  showTheAnswer() {
    this.shadowRoot.querySelector<HTMLElement>(".flip-card-inner").style.transform =
      "rotateY(180deg)";
    this.requestUpdate();
  }
  congratulate() {
    let pointbox: HTMLElement = this.shadowRoot!.querySelector("#points");
    if (this.points % 5 === 0) {
      document.querySelector<HTMLElement>("#canvas").style.display = "block";
      pointbox.animate(
        [
          { transform: "scale(1.2) rotate(5deg) translateX(-10px)" },
          { transform: "scale(1.3) rotate(-5deg) translateX(-10px)" },
          { transform: "scale(1) rotate(0deg) translateX(0px)" }
        ],
        { duration: 1000 }
      );
      if (this.points % 10 === 0) {
        let confettiSettings = { target: "canvas" };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        if (this.points % 60 === 0) {
          this.congratulations.style.display = "flex";
        }
      }
    }
  }
logingOut(){
    window.firebase.auth().signOut().then(()=> {
      this.user = null;
      localStorage.removeItem('user-info'); 
      localStorage.removeItem('points'); 
      showLog("Zostałeś wylogowany", "Wracaj szybciutko, już tęsknimy!", true, false)
   
  });}
 

  hoverable(e: Event) {
    e.preventDefault();
    (<HTMLElement>e.target).classList.add("hoverable");
    (<HTMLElement>e.target).addEventListener("mouseout", e => {
      (<HTMLElement>e.target).classList.remove("hoverable");
    });
  }

  flicker() {
    if (this.points === 1) {
      let currentWords: Array<HTMLElement> = Array.from(
        this.shadowRoot.querySelectorAll<HTMLDivElement>(".theword")
      );
      currentWords.forEach(word => {
        word.style.opacity = "0";
        word.style.transition = ".3s";
      });
    }
  }

  refreshNumber() {
    requestAnimationFrame(() => {
      if (this.congratulations.style.display === "none") {
        setTimeout(function() {
          document.querySelector<HTMLCanvasElement>("#canvas").style.display = "none";
        }, 1000);
      }
      let currentWords: Array<HTMLDivElement> = Array.from(
        this.shadowRoot.querySelectorAll(".theword")
      );
      currentWords.forEach(word => {
        word.style.opacity = "1";
      });
      this.n = Math.floor(Math.random() * 3);
      this.l = Object.entries(this.data).length;
      this.i = Math.floor(Math.random() * this.l);
      let word: [string, (string | string[])[]] = Object.entries(this.data)[this.i];
      if (word[0].includes(" ")) {
        this.translation = Object.values(word)[0].toString();
      } else {
        this.translation = word[0];
      }
      let therest = word.slice(0) as [string, (string | string[])[]];
      this.correctWord = Array.from(therest[1]);
      this.shadowRoot.querySelector<HTMLInputElement>("#input").value = "";
      this.shadowRoot.querySelector<HTMLInputElement>("#input").style.animation =
        "borderFlicker .6s infinite alternate-reverse";
      this.ref = false;
      this.shadowRoot.querySelector<HTMLDivElement>(".flip-card-inner").style.transform =
        "rotateY(0deg)";
      this.requestUpdate();
    });
  }

  readTheWord(form: any) {
    let msg = new SpeechSynthesisUtterance(form);
    msg.rate = 0.7;
    let voices = this.speech.getVoices();
    msg.voice = voices[10];
    msg.lang = "en-US";
    this.speech.speak(msg);
  }

  updated(a: any) {
    super.updated(a);
    requestAnimationFrame(() => {
      this.shadowRoot.querySelector<HTMLInputElement>("#input").focus();
    });
  }

  render() {
    return html`
   <profile-card @logout="${this.logingOut}" @previousValue="${(e: CustomEvent)=> {this.oldValue = e.detail.oldValue()}}" @valueSelected="${(e: CustomEvent)=> {this.selectionChoice(e.detail.newValue())}}" id="settings" .userName="${this.user.name}" .userEmail="${this.user.email}" .userid="${this.user.uid}" .pointCollection="${this.pointCollection}"></profile-card>
 <div class="modal" id="greeting"> 
           <div class="box"> <p> ${this.greetingMessage}, ${this.user.name}!</p></div>
        </div>
    <div class="modal" id="congratulations" @click="${() => {
      this.congratulations.style.display = "none";
      setTimeout(function() {
        document.querySelector<HTMLCanvasElement>("#canvas").style.display = "none";
      }, 1000);
    }}"> 
        <div class="box">
            <p>Świetnie Ci idzie, ${this.user.name.split(" ")}!</p>
            <p>Może pora przenieść się na wyższy poziom?</p></div>
          
        </div></div>
 <div id="wrapper">
    <div id="buttons">
    <img id="menubutton" src="./img/burger.svg" @click="${this.menuFunctionality}">
      <p id="title">English Verbs Game</p>
<div id="points">${this.oldValue !=="All" ? `Poziom ${this.oldValue}:` : `Wymieszane poziomy:`} ${this.points}</div>
</div>
<div id="translationbox">Tłumaczenie: ${this.translation}</div>
    <div id="container">
    
    ${this.correctWord === undefined ? undefined : this.correctWord.map((form, index) => {
      if (!(index === this.n)) {
        return html`
          <div
            class="theword"
            @click="${() => {
              this.readTheWord(form);
            }}"
            @mouseover="${(e: Event) => {
              this.hoverable(e);
            }}"
          >
            <span class="word"
              >${Array.isArray(form) ? form.join(" ") : form}</span
            ><span id="speaker"><img src="./img/soundwhite.svg"/></span>
          </div>
        `;
      } else {
        return html`
            <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    <input id="input" data-value="${form}" type="text" @keydown="${(e: KeyboardEvent) => {
      this.profileCard.style.transform = "translateX(-80vw)";
          if (!((<HTMLInputElement>e.target).value.length === 0)) {
            (<HTMLElement>e.target).style.animation = "stop .3s forwards";
          }
          if (e.keyCode === 13) {
            if (Array.isArray(form)) {
              let full: string = form.join();
              if (
                full
                  .toLowerCase()
                  .includes((<HTMLInputElement>e.target).value.toString().toLowerCase())
              ) {
                this.pointsAddition();
                this.flicker();
                this.congratulate();
                if (this.points === 1) {
                  (<HTMLInputElement>e.target).style.animation = "accepted .3s forwards .1s";
                  setTimeout(() => {
                    this.refreshNumber();
                  }, 1200);
                } else {
                  (<HTMLInputElement>e.target).style.animation = "accepted .3s forwards";
                  setTimeout(() => {
                    this.refreshNumber();
                  }, 400);
                }
              } else {
                (<HTMLInputElement>e.target).style.animation = "wrong .3s forwards";
                this.ref = true;
                this.requestUpdate();
              }
            } else {
              if ((<HTMLInputElement>e.target).value.toLowerCase() === form) {
                this.pointsAddition();
                this.flicker();
                this.congratulate();
                if (this.points === 1) {
                  (<HTMLInputElement>e.target).style.animation = "accepted .3s forwards .1s";
                  setTimeout(() => {
                    this.refreshNumber();
                  }, 1200);
                } else {
                  (<HTMLInputElement>e.target).style.animation = "accepted .3s forwards";
                  setTimeout(() => {
                    this.refreshNumber();
                  }, 400);
                }
              } else {
                (<HTMLInputElement>e.target).style.animation = "wrong .3s forwards .1s";
                this.ref = true;
                this.requestUpdate();
              }
            }
          }
        }}">
    </div>
    <div  @click="${() => {
      this.readTheWord(form);
    }}" class="flip-card-back">
      <span class="word">${
        Array.isArray(form) ? form.join(" ") : form
      }</span><span id="speaker"><img src="./img/soundwhite.svg"></span></span>
    </div>
  </div>
</div>
            `;
      }
    })}
               
    </div>
    
    
   <div id="below"><a id="skip" @mouseover="${(e: Event) => {
     this.hoverable(e);
   }}" @click="${this.refreshNumber}">Inne słowo</a> ${
      this.ref
        ? html`
            <a @click="${this.showTheAnswer}"
              ><img
                @mouseover="${(e: Event) => {
                  this.hoverable(e);
                }}"
                class="icon"
                src="./img/eye.svg"
            /></a>
          `
        : undefined
    }</div></div>
  
    `;
  }
}

customElements.define("english-verbs", EnglishVerbsGame);

export async function showTheGame(name: string, email: string, uid: number, points: PointCollection, greeting: string ="Witaj") {
  document.body.classList.add('ready');
  	localStorage.removeItem('isRedirecting');
  const $game = await new EnglishVerbsGame();
  
  $game.greetingMessage = greeting;
  $game.user = {
    email,
    uid,
    name
  };
  $game.pointCollection = points;
  if(document.querySelector(".welcome")===null){
    document.body.removeChild(document.querySelector("#log"));
  }
  else{
    if(!(document.querySelector("#log")===null)){
    document.body.removeChild(document.querySelector("#log"));
  }
    document.body.removeChild(document.querySelector(".welcome"));
  }
  document.body.appendChild($game);
  return $game;
}
