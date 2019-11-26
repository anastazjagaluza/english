import { showTheGame } from './english';
import { showLog } from './log-screen';
declare global {
	interface Window {
		firebase: any;
	}
}
type PointCollection = { [key: string]: number };
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyC4PKlVTVWpQbN4459w9QfO-q3Ta3SzoZs',
	authDomain: 'english-verbs-game.firebaseapp.com',
	databaseURL: 'https://english-verbs-game.firebaseio.com',
	projectId: 'english-verbs-game',
	storageBucket: 'english-verbs-game.appspot.com',
	messagingSenderId: '878642607039',
	appId: '1:878642607039:web:e1d0c5a1c6d78c20e8670a',
	measurementId: 'G-NZ5V5BZDXH'
};
// Initialize Firebase
window.firebase.initializeApp(firebaseConfig);
var provider = new window.firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});
window.firebase.auth().languageCode = 'pl';
window.firebase
	.auth()
	.getRedirectResult()
	.then(function(result: any) {
		if (result.credential) {
			console.log('logged');git 
			let user = result.user;
			let points: PointCollection;
			window.firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot: any) {
				if (!(snapshot.val() === null)) {
					points = snapshot.val().points;

					let game = showTheGame(user.displayName, user.email, user.uid, points, 'Witaj ponownie');
				} else {
					points = {
						A2: 0,
						B1: 0,
						B2: 0,
						C1: 0,
						C2: 0,
						All: 0
					};
					writeUserData(user.uid, points, user.displayName);
					let game = showTheGame(
						user.displayName,
						user.email,
						user.uid,
						points,
						'Dziękujemy za rejestrację w grze'
					);
				}
				localStorage.setItem('user-info', JSON.stringify({ user }));
				localStorage.setItem('points', JSON.stringify({ points }));
			});
		}

		// Remove isRedirecting from localstorage
	})
	.catch(function(error: Error) {
		var errorMessage = error.message;
		console.log(errorMessage);
		let showlog = showLog('Coś poszło nie tak', 'Spróbuj ponownie za kilka minut', false, true);
	});

export function writeUserData(userId: number, pointcollection: PointCollection, name: string) {
	window.firebase.database().ref('users/' + userId).set({
		points: pointcollection,
		name: name
	});
}
export function reportBugToServer(userId: number, bugMessage: string) {
	console.log(bugMessage);
	window.firebase.database().ref('users/' + userId).push(bugMessage);
}

export function redirectingSignUp() {
	localStorage.setItem('isRedirecting', '');
	window.firebase.auth().signInWithRedirect(provider);
}

document.querySelector('#nowekonto').addEventListener('click', redirectingSignUp);
document.querySelector('#zaloguj').addEventListener('click', redirectingSignUp);

// Check whether we are redirecting. If we are, we already now mark the page as ready.
if (localStorage.getItem('isRedirecting') == null) {
	document.body.classList.add('ready');
}
