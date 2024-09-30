// 儲存兩個主題的圖片名稱，背面為 cat1~cat8 或 ghost1~ghost8
const themes = {
    cat: [
        'cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 
        'cat5.png', 'cat6.png', 'cat7.png', 'cat8.png'
    ],
    ghost: [
        'ghost1.png', 'ghost2.png', 'ghost3.png', 'ghost4.png', 
        'ghost5.png', 'ghost6.png', 'ghost7.png', 'ghost8.png'
    ]
};

let selectedTheme = 'cat'; // 預設主題

// 更新選擇的主題
document.getElementById('themeSelect').addEventListener('change', (event) => {
    selectedTheme = event.target.value;
});

// 渲染卡片到畫面上
function renderCards(theme) {
    const shuffledImages = [...themes[theme], ...themes[theme]]
        .sort(() => Math.random() - 0.5); // 隨機打亂順序

    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // 清空卡片容器

    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // 正面圖片為 theme0.png（例如 cat0.png 或 ghost0.png）
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImage = document.createElement('img');
        frontImage.src = `${theme}0.png`; // 正面圖片
        frontImage.alt = `${theme} 0`;
        cardFront.appendChild(frontImage);

        // 背面圖片為隨機選擇的圖片（例如 cat1~cat8.png 或 ghost1~ghost8.png）
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImage = document.createElement('img');
        backImage.src = image; // 背面圖片
        backImage.alt = `${theme} ${index + 1}`;
        cardBack.appendChild(backImage);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        container.appendChild(card);

        // 添加點擊事件以翻轉卡牌
        card.addEventListener('click', () => {
            cardInner.classList.toggle('flipped');
        });
    });
}

// 開始遊戲邏輯
document.getElementById('startGame').addEventListener('click', () => {
    // 隱藏開始遊戲按鈕和下拉選單
    document.querySelector('.game-start').style.display = 'none';

    // 顯示卡片容器和翻轉按鈕
    document.querySelector('.controls').style.display = 'block';
    document.getElementById('cardContainer').style.display = 'flex';

    // 渲染選擇的主題卡片
    renderCards(selectedTheme);

    // 先將所有卡片翻轉到背面
    const allCards = document.querySelectorAll('.card-inner');
    setTimeout(() => {
        allCards.forEach((card) => {
            card.classList.add('flipped');
        });
    }, 500); // 小延遲讓卡片先顯示正面再翻轉

    // 10秒後將所有卡片翻回正面
    setTimeout(() => {
        allCards.forEach((card) => {
            card.classList.remove('flipped');
        });
    }, 10500); // 10秒後翻回正面
});

// 全部翻轉到正面
document.getElementById('flipFront').addEventListener('click', () => {
    const allCards = document.querySelectorAll('.card-inner');
    allCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('flipped');
        }, index * 100); // 每張卡片延遲 100 毫秒翻轉
    });
});

// 全部翻轉到背面
document.getElementById('flipBack').addEventListener('click', () => {
    const allCards = document.querySelectorAll('.card-inner');
    allCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, index * 100); // 每張卡片延遲 100 毫秒翻轉
    });
});
