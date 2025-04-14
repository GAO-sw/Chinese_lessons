document.addEventListener('DOMContentLoaded', () => {
    // 获取所有卡片元素
    const cards = document.querySelectorAll('.card');
    // 获取用于播放音频的 audio 元素
    const audioPlayer = document.getElementById('audioPlayer');

    // 为每个卡片添加点击事件监听器
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 从卡片的 data-audio 属性获取音频文件路径
            const audioSrc = card.dataset.audio;

            // 检查音频路径是否存在
            if (audioSrc) {
                // 设置 audio 元素的音频源
                audioPlayer.src = audioSrc;
                // 尝试播放音频
                audioPlayer.play().catch(error => {
                    // 如果播放失败（例如文件不存在或浏览器限制），在控制台打印错误
                    console.error("无法播放音频:", error);
                    // 你可以在这里给用户一个视觉提示，比如卡片闪烁红色
                    card.style.animation = 'shake 0.5s';
                    setTimeout(() => card.style.animation = '', 500); // 移除动画
                });
            } else {
                console.warn("未找到音频文件路径:", card);
            }
        });
    });
});

// (可选) 添加一个简单的抖动动画效果的 CSS（可以加在 style.css 里）
/*
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
*/
// 如果要在 style.css 中使用上面的动画，请取消 script.js 中相关行的注释
// 以及在 style.css 文件末尾添加 @keyframes shake { ... } 代码块。
// 目前 script.js 中处理播放错误的代码是添加和移除这个动画。
