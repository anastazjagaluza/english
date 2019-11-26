import { LitElement, html, css, customElement } from 'lit-element';
import { reportBugToServer } from './util';

declare global {
	interface Window {
		firebase: any;
	}
}

export class ReportBug extends LitElement {
	userid: number;
	static get styles() {
		return [
			css`
				:host {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100vh;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					z-index: 999;
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
					width: 100%;
				}
				.info {
					resize: none;
					font-size: 1rem;
					height: 20vh;
					text-align: left;
					margin-bottom: 1rem;
					text-overflow: scroll;
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
				#close {
					cursor: pointer;
					margin-top: -1rem;
					align-self: flex-end;
					font-family: 'Montserrat', sans-serif;
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
						width: 80vw;
						background: white;
						box-shadow: 1px 3px 6px gray;
						margin: 0;
						padding-bottom: 2rem;
					}
				}
			`
		];
	}
	sendInfo(e: Event) {
		e.preventDefault();
		let message = this.shadowRoot.querySelector<HTMLInputElement>('.info').value;
		reportBugToServer(this.userid, message);
		this.shadowRoot.querySelector('#witaj').textContent = 'Dziękujemy za zgłoszenie';
		this.shadowRoot.querySelector<HTMLElement>('.info').style.display = 'none';
		this.shadowRoot.querySelector<HTMLElement>('.logowanie').style.display = 'none';
		this.shadowRoot.querySelector<HTMLElement>('#close').style.display = 'none';
		setTimeout(function() {
			document.body.removeChild(document.querySelector('#reportbug'));
		}, 3000);
	}

	render() {
		return html` 
		<form @submit="${(e: Event) => {
			this.sendInfo(e);
		}}">
		<div class="wiadomoscoff">
		<span @click="${(e: Event) => {
			this.addEventListener('click', () => {
				document.body.removeChild(document.querySelector('#reportbug'));
			});
		}}" id="close">X</span>
		<p id="witaj">Opisz swój problem w okienku poniżej:</p>
		<textarea class="info"></textarea>
		<button type="submit" class="logowanie">Wyślij</button>
		
	</div>
	</form>
	  `;
	}
}
customElements.define('report-bug', ReportBug);

export async function reportBug(uid: number) {
	const $reportbug = await new ReportBug();
	$reportbug.userid = uid;
	$reportbug.id = 'reportbug';
	document.body.appendChild($reportbug);
	return $reportbug;
}
