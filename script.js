document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // No need to find .chinese-display and .full-details here anymore
        // We will just toggle a class on the card itself
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');

        // 1. Add click listener to the entire card for toggling views
        card.addEventListener('click', (event) => {
            // If the click happened ON the play button, do nothing here.
            // Let the button's own listener handle it.
            if (event.target === playButton || playButton.contains(event.target)) {
                // event.target === playButton covers clicking the button itself
                // playButton.contains(event.target) covers if button has inner elements
                return;
            }

            // Otherwise, toggle the 'show-details' class on the card
            card.classList.toggle('show-details');
        });

        // 2. Add click listener specifically to the play button
        playButton.addEventListener('click', (event) => {
            // IMPORTANT: Stop this click from bubbling up to the card's listener
            event.stopPropagation();

            if (audioPlayer && audioPlayer.src) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                audioPlayer.play().catch(error => {
                    console.error("无法播放音频:", error, audioPlayer.src);
                    playButton.style.backgroundColor = '#d9534f'; // Indicate error
                    setTimeout(() => { playButton.style.backgroundColor = ''; }, 1000);
                });
            } else {
                console.warn("未找到音频播放器或音频源:", card);
            }
        });
    });
});
