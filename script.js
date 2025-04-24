document.addEventListener('DOMContentLoaded', () => {

    // --- Tab/Page Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const pages = document.querySelectorAll('.page');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPageId = button.getAttribute('data-page');

            // Update button active state
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update page visibility
            pages.forEach(page => {
                if (page.id === targetPageId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // --- Page 1: Card Logic ---
    const page1Cards = document.querySelectorAll('#page-1 .card');

    page1Cards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');

        card.addEventListener('click', (event) => {
            if (playButton && (event.target === playButton || playButton.contains(event.target))) {
                return; // Do nothing if play button clicked
            }
            card.classList.toggle('show-details');
        });

        if (playButton) {
             playButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card toggle
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

    // --- Page 1: Sentence Logic ---
    const page1Sentences = document.querySelectorAll('#page-1 .sentence-item');

    page1Sentences.forEach(item => {
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

    // --- Page 2: Vocabulary List Logic ---
    const page2VocabItems = document.querySelectorAll('#page-2 .vocab-item');

    page2VocabItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.vocab-details');
            if (details) {
                 // Toggle display: if currently hidden or unset, show block; otherwise, hide.
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block'; // Use block for multi-line details
                } else {
                    details.style.display = 'none';
                }
            }
        });
    });

});
