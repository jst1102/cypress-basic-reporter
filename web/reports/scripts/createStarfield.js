export function createStarfield(numberOfStars = 100) {
	const starfield = document.getElementById('starfield');

	for (let i = 0; i < numberOfStars; i++) {
		const star = document.createElement('div');
		star.className = 'star';
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 100}%`;
		star.style.animationDuration = `${Math.random() * 5 + 1}s`; // Twinkle duration between 1 and 6 seconds
		starfield.appendChild(star);
	}
}
