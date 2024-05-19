// Selecting DOM elements
let logo = document.querySelector("div.wrapper > img");
let loading = document.querySelector("div.wrapper > div.loading");
let content_1 = document.querySelector("div.wrapper > div.content_1");
let content_2 = document.querySelector("div.wrapper > div.content_2");
let win = document.querySelector("div.wrapper > div.win");
let draw = document.querySelector("div.wrapper > div.draw");
let lose = document.querySelector("div.wrapper > div.lose");
let hand = document.querySelectorAll(
	"div.wrapper > div.content_2 > div.hand > div[class*='player']"
);
let btn = document.querySelectorAll(
	"div.wrapper > div.content_2 > div.button > div[class*='btn']"
);
let score = document.querySelectorAll(
	"div.wrapper > div.content_2 > div.score > div > span"
);

// Initial animation to fade out the logo and show loading screen
setTimeout(() => {
	// Fading out the logo
	logo.classList.replace("opacity-100", "opacity-0");
	logo.classList.replace("z-50", "-z-10");
	// Showing loading screen
	loading.classList.replace("opacity-0", "opacity-100");
	setTimeout(() => {
		// Fading out the loading screen
		loading.classList.replace("opacity-100", "opacity-0");
		loading.classList.replace("z-50", "-z-10");
		// Showing content_1 (game intro)
		content_1.classList.replace("opacity-0", "opacity-100");
		setTimeout(() => {
			// Showing the start button
			content_1.children[1].classList.replace("opacity-0", "opacity-100");
		}, 400);
	}, 3000);
}, 4300);

// Event listener for clicking the start button
content_1.children[2].addEventListener("click", () => {
	// Fading out content_1 (game intro)
	content_1.classList.replace("opacity-100", "opacity-0");
	content_1.classList.replace("z-40", "-z-10");
	// Showing loading screen
	loading.classList.replace("opacity-0", "opacity-100");
	setTimeout(() => {
		// Fading out the loading screen
		loading.classList.replace("opacity-100", "opacity-0");
		// Showing content_2 (gameplay)
		content_2.classList.replace("opacity-0", "opacity-100");
	}, 900);
});

// Event listeners for button clicks (rock, paper, scissors)
btn.forEach((elem, index) => {
	elem.addEventListener("click", () => {
		// Adding bounce animation to hand elements
		hand.forEach((elem2, i) => {
			elem2.classList.add("animate-bounce");
			// Setting appropriate hand images based on index
			if (i === 0) {
				elem2.children[0].src = "./img/rock_left.png";
			} else {
				elem2.children[0].src = "./img/rock.png";
			}
		});
		setTimeout(() => {
			// Removing bounce animation from hand elements
			hand.forEach((elem3) => {
				elem3.classList.remove("animate-bounce");
			});
			// Updating hand images based on button clicked
			if (index === 0) {
				hand[0].children[0].src = "./img/rock_left.png";
				hand[0].children[0].alt = "rock_left";
				state(); // Determine game state after player's choice
			} else if (index === 1) {
				hand[0].children[0].src = "./img/scissors_left.png";
				hand[0].children[0].alt = "scissors_left";
				state(); // Determine game state after player's choice
			} else {
				hand[0].children[0].src = "./img/paper_left.png";
				hand[0].children[0].alt = "paper_left";
				state(); // Determine game state after player's choice
			}
			// Checking if any player reached 3 points
			score.forEach((elem, index) => {
				if (Number(elem.innerText) === 3) {
					// Updating result screens based on winner
					content_2.classList.replace("opacity-100", "opacity-0");
					content_2.classList.replace("z-30", "-z-10");
					if (index === 0) {
						win.classList.replace("opacity-0", "opacity-100");
						win.classList.replace("-z-10", "z-20");
						draw.classList.replace("z-20", "-z-10");
						lose.classList.replace("z-20", "-z-10");
					} else if (index === 1) {
						draw.classList.replace("opacity-0", "opacity-100");
						draw.classList.replace("-z-10", "z-20");
						win.classList.replace("z-20", "-z-10");
						lose.classList.replace("z-20", "-z-10");
					} else {
						lose.classList.replace("opacity-0", "opacity-100");
						lose.classList.replace("-z-10", "z-20");
						win.classList.replace("z-20", "-z-10");
						draw.classList.replace("z-20", "-z-10");
					}
				}
			});
		}, 2500); // Delay to allow animations to complete
	});
});

// Function to determine game state
function state() {
	let state = Math.floor(Math.random() * 3); // Randomly generate opponent's choice
	if (state === 0) {
		hand[1].children[0].src = "./img/paper.png"; // Show opponent's choice
		hand[1].children[0].alt = "paper";
		// Update scores based on player's and opponent's choices
		if (hand[0].children[0].alt === "rock_left") {
			score[2].innerText = String(Number(score[2].innerText) + 1);
		} else if (hand[0].children[0].alt === "scissors_left") {
			score[0].innerText = String(Number(score[0].innerText) + 1);
		} else {
			score[1].innerText = String(Number(score[1].innerText) + 1);
		}
	} else if (state === 1) {
		hand[1].children[0].src = "./img/scissors.png"; // Show opponent's choice
		hand[1].children[0].alt = "scissors";
		// Update scores based on player's and opponent's choices
		if (hand[0].children[0].alt === "rock_left") {
			score[0].innerText = String(Number(score[0].innerText) + 1);
		} else if (hand[0].children[0].alt === "scissors_left") {
			score[1].innerText = String(Number(score[1].innerText) + 1);
		} else {
			score[2].innerText = String(Number(score[2].innerText) + 1);
		}
	} else {
		hand[1].children[0].src = "./img/rock.png"; // Show opponent's choice
		hand[1].children[0].alt = "rock";
		// Update scores based on player's and opponent's choices
		if (hand[0].children[0].alt === "rock_left") {
			score[1].innerText = String(Number(score[1].innerText) + 1);
		} else if (hand[0].children[0].alt === "scissors_left") {
			score[2].innerText = String(Number(score[2].innerText) + 1);
		} else {
			score[0].innerText = String(Number(score[0].innerText) + 1);
		}
	}
}

// Event listeners for result screens
win.children[2].addEventListener("click", () => {
	// Resetting the game after win
	win.classList.replace("opacity-100", "opacity-0");
	win.classList.replace("z-20", "-z-10");
	content_2.classList.replace("opacity-0", "opacity-100");
	content_2.classList.replace("-z-10", "z-30");
	score.forEach((elem) => {
		elem.innerText = "0";
	});
	reset();
});

draw.children[2].addEventListener("click", () => {
	// Resetting the game after draw
	draw.classList.replace("opacity-100", "opacity-0");
	draw.classList.replace("z-20", "-z-10");
	content_2.classList.replace("opacity-0", "opacity-100");
	content_2.classList.replace("-z-10", "z-30");
	score.forEach((elem) => {
		elem.innerText = "0";
	});
	reset();
});

lose.children[2].addEventListener("click", () => {
	// Resetting the game after loss
	lose.classList.replace("opacity-100", "opacity-0");
	lose.classList.replace("z-20", "-z-10");
	content_2.classList.replace("opacity-0", "opacity-100");
	content_2.classList.replace("-z-10", "z-30");
	score.forEach((elem) => {
		elem.innerText = "0";
	});
	reset();
});

function reset() {
	hand.forEach((elem2, i) => {
		// Setting appropriate hand images based on index
		if (i === 0) {
			elem2.children[0].src = "./img/rock_left.png";
		} else {
			elem2.children[0].src = "./img/rock.png";
		}
	});
}
