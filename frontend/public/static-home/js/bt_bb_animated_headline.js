/* ANIMATED HEADLINE
---------------------------------------------------------- */
class TextScramble {

	constructor(el, chars) {
		this.el = el;
		this.chars = chars;
		this.update = this.update.bind( this );
	}

	setText( newText ) {
		const oldText = this.el.innerText;
		const length = Math.max( oldText.length, newText.length );
		const promise = new Promise(( resolve ) => ( this.resolve = resolve ));
		
		this.queue = [];
		
		for ( let i = 0; i < length; i++ ) {
			const from = oldText[i] || "";
			const to = newText[i] || "";
			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);
			this.queue.push({
				from,
				to,
				start,
				end,
			});
		}

		cancelAnimationFrame( this.frameRequest );
		
		this.frame = 0;
		this.update();
		return promise;
	}

	update() {
		let output = "";
		let complete = 0;
		for ( let i = 0, n = this.queue.length; i < n; i++ ) {
			let {
				from,
				to,
				start,
				end,
				char
			} = this.queue[i];
		
			if ( this.frame >= end ) {
				complete++;
				output += to;
			} else if ( this.frame >= start ) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="dud">${char}</span>`;
			} else {
				output += from;
			}
		}

		this.el.innerHTML = output;
		
		if ( complete === this.queue.length ) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame( this.update );
			this.frame++;
		}
	}

	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}


/* GET DATA
------------------------------------ */
function bt_bb_animated_headline_content_init() {
	const elements = document.querySelectorAll(".bt_bb_animated_headline_content");

	elements.forEach((element) => {
		const phrases = JSON.parse(element.dataset.content);

		/* Duration */
		const speed = element.dataset.duration;
		const loopTime = parseInt(element.dataset.loop) || 0;

		const chars = element.dataset.characters;
		const fx = new TextScramble(element, chars);

		let counter = 0;

		/* Stop animation or loop */
		let continueAnimation = true;

		const stopAnimation = () => {
			continueAnimation = false;
		};

		const next = () => {
			if (!continueAnimation) {
				return;
			}

			fx.setText(phrases[counter]).then(() => {
				if (loopTime > 0) {
					setTimeout(stopAnimation, loopTime);
				}
				setTimeout(next, speed);
			});
			counter = (counter + 1) % phrases.length;
		};

		next();
	});
}

bt_bb_animated_headline_content_init();
