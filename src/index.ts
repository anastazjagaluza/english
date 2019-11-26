export * from './english';
export * from './data';
export * from './util';
export * from './profile-card';
export * from './log-screen';
export * from './report-bug';
import { showTheGame } from './english';
if (!(location.hostname === 'localhost')) {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('sw.js');
		});
	}
}
declare global {
	interface Window {
		firebase: any;
	}
}

window.onload = (event: Event) => {
	checkUpdates();
};
async function checkUpdates() {
	if (!(localStorage.getItem('user-info') === null)) {
		let userId = JSON.parse(localStorage.getItem('user-info')).user.uid;
		await window.firebase.database().ref('/users/' + userId).once('value').then(function(snapshot: any) {
			let points = (snapshot.val() && snapshot.val().points) || { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0, All: 0 };
			localStorage.setItem('points', JSON.stringify({ points }));
		});
		let game = showTheGame(
			JSON.parse(localStorage.getItem('user-info')).user.displayName,
			JSON.parse(localStorage.getItem('user-info')).user.email,
			JSON.parse(localStorage.getItem('user-info')).user.uid,
			JSON.parse(localStorage.getItem('points')).points
		);
	}
}
