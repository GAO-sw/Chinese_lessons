document.addEventListener('DOMContentLoaded', () => {
    // --- Card Logic ---
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');

        // 1. Simplified click listener for the entire card for toggling views
        card.addEventListener('click', (event) => {
            // Check if the click was on the play button or its children
            if (playButton && (event.target === playButton || playButton.contains(event.target))) {
                // If yes, do nothing in this listener. The button's own listener will handle it.
                return;
            }

            // Otherwise, toggle the 'show-details' class on the card.
            // This will now correctly show details if hidden, and hide them if shown.
            card.classList.toggle('show-details');
        });

        // 2. Add click listener specifically to the play button
        if (playButton) { // Check if button exists
             playButton.addEventListener('click', (event) => {
                // IMPORTANT: Stop this click from bubbling up to the card's listener.
                // This prevents the card from toggling when only the sound should play.
                event.stopPropagation();

                if (audioPlayer && audioPlayer.src) {
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                    audioPlayer.play().catch(error => {
                        console.error("无法播放音频:", error, audioPlayer.src);
                        const originalColor = playButton.style.backgroundColor;
                        playButton.style.backgroundColor = '#d9534f';
                        setTimeout(() => { playButton.style.backgroundColor = originalColor; }, 1000);
                    });
                } else {
                    console.warn("未找到音频播放器或音频源:", card);
                }
            });
        }
    });

    // --- Sentence Logic (Unchanged) ---
    const sentenceItems = document.querySelectorAll('.sentence-item');

    sentenceItems.forEach(item => {
        item.addEventListener('click', () => {
            const russianSentence = item.querySelector('.russian-sentence');
            if (russianSentence) {
                if (russianSentence.style.display === 'none' || russianSentence.style.display === '') {
                    russianSentence.style.display = 'inline';
                } else {
                    russianSentence.style.display = 'none';
                }
            }
        });
    });

});
