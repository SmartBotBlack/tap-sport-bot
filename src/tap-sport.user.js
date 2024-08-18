// ==UserScript==
// @name         Tap Sport Bot [SmartBot]
// @namespace    https://smartbot.black/
// @version      1.0.1
// @description  Bot for playing tap-sport in telegram
// @author       Smartbot Team
// @match        https://app.tapsport.io/*
// @icon         https://pbs.twimg.com/profile_images/1805418455060934656/JT6cnCmy_400x400.jpg
// @grant        none
// ==/UserScript==

(async () => {
	const getEnergy = () =>
		document
			.querySelector('img[src="images/common/lightning-01.svg"]')
			.parentElement.innerText.split("/");

	const getRandomInt = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	const createTouch = (target, x, y) =>
		new Touch({
			identifier: Date.now(),
			target: target,
			clientX: x,
			clientY: y,
			radiusX: 2.5,
			radiusY: 2.5,
			rotationAngle: 0,
			force: 0.5,
		});

	const emulateMobileTapOnImage = async (image) => {
		const rect = image.getBoundingClientRect();

		const x = Math.floor(Math.random() * rect.width) + rect.left;
		const y = Math.floor(Math.random() * rect.height) + rect.top;

		const touchstartEvent = new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [createTouch(image, x, y)],
			targetTouches: [createTouch(image, x, y)],
			changedTouches: [createTouch(image, x, y)],
		});

		const touchmoveEvent = new TouchEvent("touchmove", {
			bubbles: true,
			cancelable: true,
			touches: [createTouch(image, x, y)],
			targetTouches: [createTouch(image, x, y)],
			changedTouches: [createTouch(image, x, y)],
		});

		const touchendEvent = new TouchEvent("touchend", {
			bubbles: true,
			cancelable: true,
			touches: [],
			targetTouches: [],
			changedTouches: [createTouch(image, x, y)],
		});

		image.dispatchEvent(touchstartEvent);
		await new Promise((res) => setTimeout(res, getRandomInt(10, 100)));
		image.dispatchEvent(touchmoveEvent);
		image.dispatchEvent(touchendEvent);
		await new Promise((res) => setTimeout(res, getRandomInt(1, 20)));
	};

	while (true) {
		try {
			[...document.querySelectorAll("button")]
				.find((button) => button.innerText.includes("Got it"))
				?.click();

			const [currentEnergy, maxEnergy] = getEnergy();

			if (currentEnergy > getRandomInt(10, 200)) {
				await emulateMobileTapOnImage(
					document.querySelector(
						'img[src*="images/common/levels/football/Level"]',
					),
				);
			} else {
				await new Promise((res) =>
					setTimeout(res, getRandomInt(1, 20) * 60 * 1e3),
				);
			}
		} catch (error) {
			console.error(error);
			await new Promise((res) => setTimeout(res, 1e4));
		}
	}
})();
