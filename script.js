document.addEventListener('DOMContentLoaded', () => {

    // --- Table of Contents (ToC) Logic ---
    const tocLinks = document.querySelectorAll('.toc-link');
    const contentSections = document.querySelectorAll('.content-section');

    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');
            tocLinks.forEach(lnk => lnk.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('content-active'));
            link.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('content-active');
            } else {
                console.error('Target content section not found:', targetId);
            }
        });
    });

    // --- Card Logic (Applies to cards in ANY visible section) ---
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player');

        card.addEventListener('click', (event) => {
            if (playButton && (event.target === playButton || playButton.contains(event.target))) {
                return;
            }
            card.classList.toggle('show-details');
        });

        if (playButton) {
             playButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (audioPlayer && audioPlayer.src) {
                    document.querySelectorAll('audio').forEach(audio => {
                        if(audio !== audioPlayer) audio.pause();
                    });
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

    // --- Sentence Logic (CN -> RU) ---
    const cnToRuSentences = document.querySelectorAll('.sentence-container .sentence-item');

    cnToRuSentences.forEach(item => {
        const russianSentence = item.querySelector('.russian-sentence');
        if (russianSentence) {
            russianSentence.style.display = 'none';
        }
        item.addEventListener('click', () => {
            if (russianSentence) {
                if (russianSentence.style.display === 'none' || russianSentence.style.display === '') {
                    russianSentence.style.display = 'inline';
                } else {
                    russianSentence.style.display = 'none';
                }
            }
        });
    });

    // --- Sentence Logic (RU -> CN) - NEW ---
    const ruToCnSentences = document.querySelectorAll('.sentence-container-ru-cn .sentence-item-ru-cn');

    ruToCnSentences.forEach(item => {
        const chineseTranslation = item.querySelector('.chinese-translation-target');
        if (chineseTranslation) {
            chineseTranslation.style.display = 'none'; // Ensure hidden initially
        }
        item.addEventListener('click', () => {
            if (chineseTranslation) {
                if (chineseTranslation.style.display === 'none' || chineseTranslation.style.display === '') {
                    chineseTranslation.style.display = 'inline';
                } else {
                    chineseTranslation.style.display = 'none';
                }
            }
        });
    });

    // Vocabulary List Page Logic has been removed as per instruction.

});
