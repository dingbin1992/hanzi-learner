// ====== hanzi.js — 汉字识字模块 ======

const HanziModule = {
  currentLevel: 'preschool',
  searchQuery: '',

  init() {
    this.bindTabs();
    this.bindSearch();
  },

  bindTabs() {
    const tabs = document.querySelectorAll('#hanzi-tabs .level-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentLevel = tab.dataset.level;
        this.searchQuery = '';
        document.getElementById('hanzi-search').value = '';
        this.render();
      });
    });
  },

  bindSearch() {
    const input = document.getElementById('hanzi-search');
    input.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.render();
    });
  },

  getChars() {
    switch(this.currentLevel) {
      case 'preschool': return preschoolChars;
      case 'elementary': return elementaryChars;
      case 'advanced': return advancedChars;
      default: return preschoolChars;
    }
  },

  render() {
    const grid = document.getElementById('hanzi-grid');
    let chars = this.getChars();

    // 搜索过滤
    if (this.searchQuery) {
      const q = this.searchQuery;
      chars = chars.filter(c =>
        c.char.includes(q) ||
        c.pinyin.toLowerCase().includes(q)
      );
    }

    if (chars.length === 0) {
      grid.innerHTML = `<div style="text-align:center;padding:40px;color:#888;font-size:18px;">😕 没有找到匹配的汉字</div>`;
      return;
    }

    let html = '';
    chars.forEach(c => {
      html += `<div class="hanzi-card" data-char="${c.char}" data-pinyin="${c.pinyin}">
        <div class="hanzi-char">${c.char}</div>
        <div class="hanzi-pinyin">${c.pinyin}</div>
        <div class="hanzi-radical">部首：${c.radical} | ${c.strokes}画</div>
      </div>`;
    });

    grid.innerHTML = html;

    // 绑定点击
    grid.querySelectorAll('.hanzi-card').forEach(card => {
      card.addEventListener('click', function() {
        const char = this.dataset.char;
        // 动画
        this.classList.add('playing');
        setTimeout(() => this.classList.remove('playing'), 500);
        // 发音 — 先说字，再拼读
        TTS.speak(char, 0.7);
        // 标记已学
        App.markLearned(char);
      });
    });
  }
};
