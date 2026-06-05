// ====== pinyin.js — 拼音学习模块 ======

const PinyinModule = {
  currentLevel: 'preschool',

  init() {
    this.bindTabs();
  },

  bindTabs() {
    const tabs = document.querySelectorAll('#pinyin-tabs .level-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentLevel = tab.dataset.level;
        this.render();
      });
    });
  },

  render() {
    const container = document.getElementById('pinyin-content');
    const data = pinyinData[this.currentLevel];
    if (!data) return;

    let html = '';
    data.groups.forEach(group => {
      html += `<div class="pinyin-group">
        <h3>📌 ${group.name}</h3>
        <div class="pinyin-grid">`;
      group.items.forEach(item => {
        html += `<div class="pinyin-card" data-speak="${item.char}">
          ${item.char}
        </div>`;
      });
      html += `</div></div>`;
    });

    container.innerHTML = html;

    // 绑定点击发音
    container.querySelectorAll('.pinyin-card').forEach(card => {
      card.addEventListener('click', function() {
        const text = this.dataset.speak;
        // 动画
        this.classList.add('playing');
        setTimeout(() => this.classList.remove('playing'), 600);
        // 发音
        TTS.speak(text, 0.7);
      });
    });
  }
};
