export type Forms = (string | string[])[];
export type Word = [string, Forms];
export type Level = { [key: string]: Forms};
export type Levels = { [key: string]: Level };

export const levels: Levels = {
	A2: {
		'śnić, marzyć': [ 'dream', [ 'dreamed', 'dreamt' ], [ 'dreamed', 'dreamt' ] ],
		być: [ 'be', 'was', 'been' ],
		robić: [ 'do', 'did', 'done' ],
		'stawać się': [ 'become', 'became', 'become' ],
		'łamać, pękać, rozbić, tłuc': [ 'break', 'broke', 'broken' ],
		'przynosić, przyprowadzić': [ 'bring', 'brought', 'brought' ],
		budować: [ 'build', 'built', 'built' ],
		kupować: [ 'buy', 'bought', 'bought' ],
		łapać: [ 'catch', 'caught', 'caught' ],
		wybierać: [ 'choose', 'chose', 'chosen' ],
		'przyjść, przyjechać': [ 'come', 'came', 'come' ],
		kosztować: [ 'cost', 'cost', 'cost' ],
		'ciąć, kroić, skaleczyć': [ 'cut', 'cut', 'cut' ],
		'rysować, pociągnąć, remisować': [ 'draw', 'drew', 'drawn' ],
		'prowadzić, kierować się czymś': [ 'drive', 'drove', 'driven' ],
		pić: [ 'drink', 'drank', 'drunk' ],
		jeść: [ 'eat', 'ate', 'eaten' ],
		'padać, upadać, spadać': [ 'fall', 'fell', 'fallen' ],
		czuć: [ 'feel', 'felt', 'felt' ],
		znaleźć: [ 'find', 'found', 'found' ],
		latać: [ 'fly', 'flew', 'flown' ],
		dostawać: [ 'get', 'got', 'got' ],
		dawać: [ 'give', 'gave', 'given' ],
		iść: [ 'go', 'went', 'gone' ],
		rosnąć: [ 'grow', 'grew', 'grown' ],
		mieć: [ 'have', 'had', 'had' ],
		słyszeć: [ 'hear', 'heard', 'heard' ],
		uderzać: [ 'hit', 'hit', 'hit' ],
		'trzymać, utrzymywać, podtrzymywać': [ 'hold', 'held', 'held' ],
		'ranić, boleć': [ 'hurt', 'hurt', 'hurt' ],
		trzymać: [ 'keep', 'kept', 'kept' ],
		'znać, wiedzieć': [ 'know', 'knew', 'known' ],
		'uczyć się': [ 'learn', [ 'learnt', 'learned' ], [ 'learnt', 'learned' ] ],
		'opuszczać, wyjeżdżać, zostawiać': [ 'leave', 'left', 'left' ],
		'pożyczać (komuś)': [ 'lend', 'lent', 'lent' ],
		'tracić, zgubić': [ 'lose', 'lost', 'lost' ],
		'robić, wykonywać': [ 'make', 'made', 'made' ],
		'znaczyć, oznaczać, mieć na myśli': [ 'mean', 'meant', 'meant' ],
		'spotykać, poznać': [ 'meet', 'met', 'met' ],
		płacić: [ 'pay', 'paid', 'paid' ],
		kłaść: [ 'put', 'put', 'put' ],
		czytać: [ 'read', 'read', 'read' ],
		jeździć: [ 'ride', 'rode', 'ridden' ],
		dzwonić: [ 'ring', 'rang', 'rung' ],
		biec: [ 'run', 'ran', 'run' ],
		mowić: [ 'say', 'said', 'said' ],
		widzieć: [ 'see', 'saw', 'seen' ],
		sprzedawać: [ 'sell', 'sold', 'sold' ],
		'wysyłać, słać': [ 'send', 'sent', 'sent' ],
		pokazywać: [ 'show', 'showed', 'shown' ],
		zamykać: [ 'shut', 'shut', 'shut' ],
		śpiewać: [ 'sing', 'sang', 'sung' ],
		'siedzieć, siadać': [ 'sit', 'sat', 'sat' ],
		spać: [ 'sleep', 'slept', 'slept' ],
		'mówić, rozmawiać': [ 'speak', 'spoke', 'spoken' ],
		'spędzać, wydawać': [ 'spend', 'spent', 'spent' ],
		stać: [ 'stand', 'stood', 'stood' ],
		kraść: [ 'steal', 'stole', 'stolen' ],
		pływać: [ 'swim', 'swam', 'swum' ],
		brać: [ 'take', 'took', 'taken' ],
		'uczyć (kogoś)': [ 'teach', 'taught', 'taught' ],
		'powiedzieć, opowiedzieć': [ 'tell', 'told', 'told' ],
		'myśleć, sądzić, uważać': [ 'think', 'thought', 'thought' ],
		rzucać: [ 'throw', 'threw', 'thrown' ],
		budzić: [ 'wake', 'woke', 'woken' ],
		'nosić, zakładać': [ 'wear', 'wore', 'worn' ],
		rozumieć: [ 'understand', 'understood', 'understood' ],
		wygrywać: [ 'win', 'won', 'won' ],
		pisać: [ 'write', 'wrote', 'written' ]
	},
	B1: {
		obudzić: [ 'awake', 'awoke', 'awoken' ],
		bić: [ 'beat', 'beat', 'beaten' ],
		ugryźc: [ 'bite', 'bit', 'bitten' ],
		krwawić: [ 'bleed', 'bled', 'bled' ],
		'wiać, dmuchać': [ 'blow', 'blew', 'blown' ],
		'palić, parzyć, płonąć': [ 'burn', [ 'burned', 'burnt' ], [ 'burned', 'burnt' ] ],
		'kopać (np ziemię)': [ 'dig', 'dug', 'dug' ],
		'karmić, żywić': [ 'feed', 'fed', 'fed' ],
		'walczyć, bić się': [ 'fight', 'fought', 'fought' ],
		zapominać: [ 'forget', 'forgot', 'forgotten' ],
		wybaczać: [ 'forgive', 'forgave', 'forgiven' ],
		zamarzać: [ 'freeze', 'froze', 'frozen' ],
		'zawieszać (coś, np obraz)': [ 'hang', 'hung', 'hung' ],
		'chować, ukrywać': [ 'hide', 'hid', 'hidden' ],
		pozwalać: [ 'let', 'let', 'let' ],
		'leżeć, kłaść się': [ 'lie', 'lay', 'lain' ],
		'zapalać, rozpalać, oświetlać': [ 'light', [ 'lighted', 'lit' ], [ 'ligthed', 'lit' ] ],
		'rzucać, opuszczać': [ 'quit', 'quit', 'quit' ],
		'podnosić, wzrastać': [ 'rise', 'rose', 'risen' ],
		'trząść, potrząsać': [ 'shake', 'shook', 'shaken' ],
		'świecić, błyszczeć': [ 'shine', 'shone', 'shone' ],
		strzelać: [ 'shoot', 'shot', 'shot' ],
		'tonąć (o statku), zapadać się': [ 'sink', 'sank', 'sunk' ],
		'wbijać, wtykać, przyklejać, wystawić': [ 'stick', 'stuck', 'stuck' ],
		'uderzyć, wybijać': [ 'strike', 'struck', 'struck' ],
		'drzeć, rozdzierać': [ 'tear', 'tore', 'torn' ]
	},
	B2: {
		'znosić, udźwignąć coś, żywić urazę': [ 'bear', 'bore', 'borne' ],
		'zginać, nachylać': [ 'bend', 'bent', 'bent' ],
		'hodować, wychować, rozmażać się': [ 'breed', 'bred', 'bread' ],
		'rzucić, zrzucić': [ 'cast', 'cast', 'cast' ],
		'rozdawać, postępować, mieć do czynienia, radzić sobie': [ 'deal', 'dealt', 'dealt' ],
		zabraniać: [ 'forbid', 'forbade', 'forbidden' ],
		'klęczeć, klękać': [ 'kneel', [ 'kneeled', 'knelt' ], [ 'kneeled', 'knelt' ] ],
		'robić na drutach': [ 'knit', [ 'knit', 'knitted' ], [ 'knit', 'knitted' ] ],
		prowadzić: [ 'lead', 'led', 'led' ],
		'szukać, poszukiwać': [ 'seek', 'sought', 'sought' ],
		'umieszczać, ustawiać, zachodzić (o słońcu), osadzić, nastawić, wyznaczyć': [ 'set', 'set', 'set' ],
		'kurczyć się, zbiegać': [ 'shrink', 'shrank', 'shrunk' ],
		'ślizgać się, zjeżdżać': [ 'slide', 'slid', 'slid' ],
		'dzielić, rozdzielać': [ 'split', 'split', 'split' ],
		'rozchodzić się, rozprzestrzeniać, rozkładać, rozpościerać, rozsmarować': [ 'spread', 'spread', 'spread' ],
		'przysięgać, przeklinać': [ 'swear', 'swore', 'sworn' ],
		'zamiatać, zmiatać': [ 'sweep', 'swept', 'swept' ],
		'machnąć, zakołysać': [ 'swing', 'swung', 'swung' ]
	},
	C1: {
		'pojawić się': [ 'arise', 'arose', 'arisen' ],
		'zakładać, obstawiać': [ 'bet', 'bet', 'bet' ],
		'umykać, uciekać, opuścić': [ 'flee', 'fled', 'fled' ],
		'położyć, kłaść': [ 'lay', 'laid', 'laid' ],
		'kręcić, zakręcić czymś/się, obrócić': [ 'spin', 'spun', 'spun' ],
		'śmierdzieć, cuchnąć': [ 'stink', 'stank', 'stunk' ]
	},
	C2: {
		'wiązać, złączyć, oprawić (książkę)': [ 'bind', 'bound', 'bound' ],
		'przywrzeć, uczepić się, trzymać się kurczowo': [ 'cling', 'clung', 'clung' ],
		'skradać się, zakradać, piąć się, podchodzić': [ 'creep', 'crept', 'crept' ],
		'rzucić, cisnąć': [ 'fling', 'flung', 'flung' ],
		'porzucać, zaniechać, opuścić': [ 'forsake', 'forsook', 'forsaken' ],
		'przepowiadać, przewidywać': [ 'foretell', 'foretold', 'foretold' ],
		'zemleć, rozkruszyć, zgrzytać, ostrzyć, trzeć': [ 'grind', 'ground', 'ground' ],
		skakać: [ 'leap', [ 'leaped', 'lept' ], [ 'leaped', 'lept' ] ],
		piłować: [ 'saw', 'sawed', 'sawn' ],
		'zrzucać, pozbywać się': [ 'shed', 'shed', 'shed' ],
		zabijać: [ 'slay', 'slew', 'slain' ],
		'cisnąć, miotać': [ 'sling', 'slung', 'slung' ],
		'przeskakiwać, wyskakiwać': [ 'spring', 'sprang', 'sprung' ],
		żądlić: [ 'sting', 'stung', 'stung' ],
		'zmagać się z czymś, dążyć, starać się, podejmować wysiłek': [ 'strive', 'strove', 'striven' ],
		'kroczyć, stąpać, deptać': [ 'tread', 'trod', 'trodden' ],
		'płakać, szlochać': [ 'weep', 'wept', 'wept' ],
		'nawijać, nakręcać, wić się': [ 'wind', 'wound', 'wound' ],
		'wykręcić, wyżąć coś, wycisnąć': [ 'wring', 'wrung', 'wrung' ]
	}
};
