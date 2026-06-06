// ====== pinyin.js — 拼音学习（字母表 + 四声调）======

const PinyinModule = {
  currentType: 'zimubiao',
  types: ['zimubiao', 'sisheng'],

  init() {
    this.bindTabs();
  },

  bindTabs() {
    const container = document.getElementById('pinyin-tabs');
    const labels = { zimubiao: '📋 汉语拼音字母表', sisheng: '🎵 四声调' };
    container.innerHTML = this.types.map(t =>
      `<button class="level-tab${t === this.currentType ? ' active' : ''}" data-type="${t}">${labels[t]}</button>`
    ).join('');

    container.querySelectorAll('.level-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentType = tab.dataset.type;
        this.render();
      });
    });
  },

  render() {
    const container = document.getElementById('pinyin-content');
    const data = pinyinData[this.currentType];
    if (!data) return;

    let html = `<h2 style="text-align:center;color:#3D3D3D;margin-bottom:8px;">${data.title}</h2>`;
    if (data.description) {
      html += `<p style="text-align:center;color:#888;margin-bottom:20px;">${data.description}</p>`;
    }

    data.groups.forEach(group => {
      // 四声说明卡片
      if (group.intro) {
        html += `<div class="pinyin-group"><h3>${group.name}</h3><div class="tone-intro-grid">`;
        group.items.forEach(item => {
          const toneColors = ['', '#4CAF50', '#FF9800', '#2196F3', '#F44336'];
          const speakText = item.speak || item.hanzi || item.char;
          html += `<div class="tone-intro-card" style="border-left:5px solid ${toneColors[item.tone]||toneColors[1]}">
            <div class="tone-intro-char">${item.char}</div>
            <div class="tone-intro-name">${item.name || item.pinyin || ''}</div>
            <div class="tone-intro-desc">${item.desc || ''}</div>`;
          if (item.hanzi) html += `<div class="tone-intro-hanzi">📝 ${item.hanzi}</div>`;
          html += `<button class="tone-intro-play" data-speak="${speakText}">🔊 试听</button></div>`;
        });
        html += `</div></div>`;
        return;
      }

      // 拼音卡片（带汉字）
      html += `<div class="pinyin-group"><h3>📌 ${group.name}</h3><div class="pinyin-grid">`;
      group.items.forEach(item => {
        const speakText = item.hanzi || item.char;
        html += `<div class="pinyin-card" data-speak="${speakText}">
          <div class="pinyin-char">${item.char}</div>`;
        if (item.hanzi) html += `<div class="pinyin-hanzi">${item.hanzi}</div>`;
        html += `</div>`;
      });
      html += `</div></div>`;
    });

    container.innerHTML = html;

    // 绑定点击
    container.querySelectorAll('.pinyin-card, .tone-intro-play').forEach(el => {
      el.addEventListener('click', function() {
        const text = this.dataset.speak;
        this.classList.add('playing');
        setTimeout(() => this.classList.remove('playing'), 600);
        TTS.speak(text, 0.85);
      });
    });
  }
};
