import { LitElement, html, css, customElement } from 'lit-element';
import { reportBug } from './report-bug';

declare global {
	interface Window {
		firebase: any;
	}
}
type PointCollection = { [key: string]: number };
export class ProfileCard extends LitElement {
	static get properties() {
		return {
			userName: {
				type: String,
				reflect: true
			},
			userEmail: {
				type: String,
				reflect: true
			},
			pointCollection: {
				type: Object,
				attribute: 'pointcollection',
				reflect: true
			}
		};
	}
	userName: string;
	userid: number;
	userEmail: string;
	pointCollection: PointCollection;
	static get styles() {
		return [
			css`
				:host {
					transition: 1s;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					width: 20vw;
					background-color: gray;
					z-index: 998;
					transform: translateX(-80vw);
					display: flex;
					flex-direction: column;
					align-content: flex-start;
					font-family: var(--global-font);
					text-align: left;
					padding-left: 1vw;
					color: white;
				}
				#x {
					margin: 1rem 1rem 0 0;
					align-self: flex-end;
					color: white;
					cursor: pointer;
				}

				#signout,
				#bug {
					cursor: pointer;
				}
				p {
					margin-top: .8rem;
					margin-bottom: .8rem;
				}
				h1 {
					font-size: 1.4rem;
				}
				select {
					outline: 1px white solid;
					margin-top: .3rem;
					margin-left: none;
					padding: .3rem;
					border: none;
					background: white;
					color: black;
					width: 80%;
					-webkit-appearance: menulist;
					align-self: flex-start;
				}
				select > option {
					color: black;
				}
				label {
					align-self: flex-start;
				}
				#x:hover {
					transform: scale(1.2);
					cursor: pointer;
				}

				@media only screen and (max-width: 600px) {
					:host {
						width: 60vw;
					}
					p {
						margin-top: .8rem;
						margin-bottom: .8rem;
					}
					h1 {
						font-size: 1.4rem;
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
  <h1>${this.userName}</h1>
  <p>${this.userEmail}</p>
  <label for="select">Zmień poziom:</label>
    <select @click="${(e: InputEvent) => {
		this.dispatchEvent(
			new CustomEvent('previousValue', {
				bubbles: true,
				composed: true,
				detail: { oldValue: () => this.shadowRoot.querySelector<HTMLInputElement>('#select').value }
			})
		);
	}}" @change="${(e: InputEvent) => {
			this.dispatchEvent(
				new CustomEvent('valueSelected', {
					bubbles: true,
					composed: true,
					detail: { newValue: () => this.shadowRoot.querySelector<HTMLInputElement>('#select').value }
				})
			);
		}}" id="select">
    ${Object.entries(this.pointCollection).map(([ level, points ]) => {
		return html`
  <option value="${level}">${level != 'All' ? `Poziom ${level},` : `Wymieszane poziomy,`} punkty: ${points}</option>`;
	})}
</select>

<p @click="${(e: Event) => {
			let bug = reportBug(this.userid);
		}}" id="bug">Zgłoś błąd</p>
<p id="signout" @click="${this.logOut}">Wyloguj</p>

    `;
	}
}
customElements.define('profile-card', ProfileCard);
