document.addEventListener('DOMContentLoaded', () => {
    // 获取所有卡片元素
    const cards = document.querySelectorAll('.card');

    // 为每个卡片设置交互
    cards.forEach(card => {
        const visibleArea = card.querySelector('.visible-area');
        const hiddenDetails = card.querySelector('.hidden-details');
        const playButton = card.querySelector('.play-button');
        const audioPlayer = card.querySelector('.audio-player'); // 获取当前卡片的播放器

        // 1. 给卡片的可视区域（图片+按钮+俄语）添加点击事件，用于切换详情显示
        visibleArea.addEventListener('click', (event) => {
            // 如果点击的是播放按钮本身，则不执行切换操作
            // (因为播放按钮有自己的点击事件)
            if (event.target === playButton) {
                return;
            }
            // 切换 hidden-details 的显示/隐藏状态
            hiddenDetails.classList.toggle('visible');
        });

        // 2. 给播放按钮添加点击事件
        playButton.addEventListener('click', (event) => {
            // 阻止事件冒泡，防止点击按钮时触发 visibleArea 的点击事件
            event.stopPropagation();

            // 检查音频播放器是否存在
            if (audioPlayer && audioPlayer.src) {
                // 尝试暂停并重置播放时间，以便可以重复点击播放
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                // 播放音频
                audioPlayer.play().catch(error => {
                    console.error("无法播放音频:", error, audioPlayer.src);
                    // 可以在这里添加视觉反馈，比如按钮变红或抖动
                    playButton.style.backgroundColor = '#d9534f'; // 临时变红
                    setTimeout(() => { playButton.style.backgroundColor = ''; }, 1000); // 1秒后恢复
                });
            } else {
                console.warn("未找到音频播放器或音频源:", card);
            }
        });
    });
});
