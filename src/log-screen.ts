import { LitElement, html, css, customElement } from 'lit-element';
import { redirectingSignUp } from './util';

declare global {
	interface Window {
		firebase: any;
	}
}

export class LogScreen extends LitElement {
	title: string;
	message: string;
	logButton: Boolean;
	sadCat: Boolean;
	static get styles() {
		return [
			css`
				.welcome {
					width: 100%;
					height: 100vh;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					background-image: url("./img/wave1.svg");
					background-size: contain;
					background-repeat: repeat-x;
					background-position: bottom;
				}
				.wiadomosc {
					margin-right: 13rem;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 20vw;
					height: max-content;
				}
				.wiadomoscoff {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 30vw;
					height: max-content;
					background: white;
					box-shadow: 1px 4px 6px gray;
					padding: 2rem;
				}
				#witaj,
				.info {
					font-family: 'Montserrat', sans-serif;
					font-size: 1.3rem;
					text-align: center;
				}
				.logowanie {
					cursor: pointer;
					justify-self: flex-start;
					padding: .6rem;
					width: max-content;
					background-color: transparent;
					font-size: 1.2rem;
					border: 1px solid black;
					box-shadow: 1px 1px 3px gray;
				}

				.sadcat {
					width: 6rem;
					height: 6rem;
				}
				#nowekonto {
					cursor: pointer;
					border: none;
					background: none;
					font-size: 1rem;
					margin-top: .2rem;
				}

				.logowanie:hover {
					transition: 1s;
					color: white;
					border: 1px solid white;
					background: linear-gradient(to top, #a57fff, #63bda2);
				}
				@media screen and (max-width: 600px) {
					.wiadomosc,
					.wiadomoscoff {
						width: 68vw;
						background: white;
						box-shadow: 1px 3px 6px gray;
						margin: 0;
						padding-bottom: 2rem;
					}
				}
			`
		];
	}
	logOut() {
		this.dispatchEvent(new CustomEvent('logout', { bubbles: true, composed: true }));
		this.requestUpdate();
	}

	render() {
		return html`   
		<div class="welcome">
		<div class="wiadomoscoff">
		<img class="sadcat" src="./img/parrotcry.svg">
		
		<p id="witaj">${this.title}</p>
		<p class="info">${this.message}</p>
		${this.logButton
			? html`<button class="logowanie" @click="${redirectingSignUp}">Zaloguj się ponownie</button>`
			: undefined}
		
	</div></div>
	  `;
	}
}
customElements.define('log-screen', LogScreen);

export async function showLog(title: string, message: string, logButton: Boolean = false, sadCat: boolean = false) {
	const $logscreen = await new LogScreen();
	$logscreen.title = title;
	$logscreen.message = message;
	$logscreen.sadCat = sadCat;
	$logscreen.logButton = logButton;
	$logscreen.id = 'log';
	document.body.removeChild(document.body.lastChild);
	document.body.appendChild($logscreen);
	return $logscreen;
}
