document.addEventListener('DOMContentLoaded', () => {

    // --- Table of Contents (ToC) Logic ---
    const tocLinks = document.querySelectorAll('.toc-link');
    const contentSections = document.querySelectorAll('.content-section');

    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');

            // Remove active class from all links and hide all sections
            tocLinks.forEach(lnk => lnk.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('content-active'));

            // Add active class to the clicked link
            link.classList.add('active');

            // Show the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('content-active');
                // Scroll smoothly to the top of the content section if needed
                // targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error('Target content section not found:', targetId);
            }
        });
    });

    // --- Card Logic (Applies to cards in ANY visible section) ---
    const allCards = document.querySelectorAll('.card'); // Select ALL cards in the document

    allCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');

        card.addEventListener('click', (event) => {
            // Prevent toggle if play button is clicked
            if (playButton && (event.target === playButton || playButton.contains(event.target))) {
                return;
            }
            card.classList.toggle('show-details');
        });

        if (playButton) {
             playButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card toggle when playing sound
                if (audioPlayer && audioPlayer.src) {
                    // Stop any other playing audio first (optional but good practice)
                    document.querySelectorAll('audio').forEach(audio => audio.pause());
                    audioPlayer.currentTime = 0;
                    audioPlayer.play().catch(error => {
                        console.error("无法播放音频:", error, audioPlayer.src);
                        const originalColor = playButton.style.backgroundColor;
                        playButton.style.backgroundColor = '#d9534f'; // Indicate error briefly
                        setTimeout(() => { playButton.style.backgroundColor = originalColor; }, 1000);
                    });
                } else {
                    console.warn("未找到音频播放器或音频源:", card);
                }
            });
        }
    });

    // --- Sentence Logic (Applies to sentences in ANY visible section) ---
    const allSentences = document.querySelectorAll('.sentence-item'); // Select ALL sentence items

    allSentences.forEach(item => {
        const russianSentence = item.querySelector('.russian-sentence');
        // Hide Russian sentence initially via JS (backup if CSS fails or for clarity)
        if (russianSentence) {
            russianSentence.style.display = 'none';
        }

        item.addEventListener('click', () => {
            if (russianSentence) {
                // Toggle display
                if (russianSentence.style.display === 'none' || russianSentence.style.display === '') {
                    russianSentence.style.display = 'inline';
                } else {
                    russianSentence.style.display = 'none';
                }
            }
        });
    });

    // --- Vocabulary List Page Logic (Page 2 Vocab Items) ---
    const page2VocabItems = document.querySelectorAll('#vocab-list-page .vocab-item');

    page2VocabItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.vocab-details');
            if (details) {
                 // Toggle display
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block';
                } else {
                    details.style.display = 'none';
                }
            }
        });
    });

});
