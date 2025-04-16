document.addEventListener('DOMContentLoaded', () => {
    // --- Card Logic ---
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');
        const fullDetails = card.querySelector('.full-details'); // Needed for the check below

        // 1. Add click listener to the entire card for toggling views
        card.addEventListener('click', (event) => {
            // If the click happened ON the play button OR inside the full-details area
            // AND the details are currently shown, do nothing here, *except* for the button itself.
            if (card.classList.contains('show-details') && fullDetails.contains(event.target)) {
                // If the click is exactly on the play button or its children, let the button's handler manage it.
                if (event.target === playButton || playButton.contains(event.target)) {
                    // Do nothing here, let the button listener below handle the click and propagation stop.
                } else {
                    // If click is inside details but *not* on the button, prevent the card from toggling off.
                    return;
                }
            }
            // If the click is on the play button when the card is *closed*, prevent toggle.
            // The button listener will handle playing the sound.
            else if (!card.classList.contains('show-details') && (event.target === playButton || playButton.contains(event.target))) {
                 return;
            }
             else {
                // Otherwise (click on chinese-display area, or outside details when open), toggle the 'show-details' class.
                card.classList.toggle('show-details');
            }
        });

        // 2. Add click listener specifically to the play button
        if (playButton) { // Check if button exists
             playButton.addEventListener('click', (event) => {
                // IMPORTANT: Stop this click from bubbling up to the card's listener
                // This prevents the card from toggling when the button is clicked.
                event.stopPropagation();

                if (audioPlayer && audioPlayer.src) {
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                    audioPlayer.play().catch(error => {
                        console.error("无法播放音频:", error, audioPlayer.src);
                        // Indicate error visually on the button briefly
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

    // --- Sentence Logic ---
    const sentenceItems = document.querySelectorAll('.sentence-item');

    sentenceItems.forEach(item => {
        item.addEventListener('click', () => {
            const russianSentence = item.querySelector('.russian-sentence');
            if (russianSentence) {
                // Toggle display: if currently hidden or unset, show inline; otherwise, hide.
                if (russianSentence.style.display === 'none' || russianSentence.style.display === '') {
                    russianSentence.style.display = 'inline'; // Show it inline next to the Chinese
                } else {
                    russianSentence.style.display = 'none'; // Hide it
                }
            }
        });
    });

});
