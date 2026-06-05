// ====== app.js — 视图路由 + 全局管理 ======

const App = {
  currentView: 'home',
  learnedChars: new Set(),

  init() {
    this.loadProgress();
    this.bindNavigation();
    this.updateLearnedCount();
    // 初始化子模块
    PinyinModule.init();
    HanziModule.init();
    PracticeModule.init();
  },

  // —— 导航 ——
  bindNavigation() {
    // 首页卡片点击
    document.querySelectorAll('.home-card').forEach(card => {
      card.addEventListener('click', () => {
        const view = card.dataset.view;
        this.navigateTo(view);
      });
    });

    // 返回按钮
    document.getElementById('btn-back').addEventListener('click', () => {
      this.navigateTo('home');
    });
  },

  navigateTo(view) {
    this.currentView = view;
    // 切换视图
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + view);
    if (target) target.classList.add('active');

    // 顶部栏
    const backBtn = document.getElementById('btn-back');
    const title = document.getElementById('view-title');

    if (view === 'home') {
      backBtn.style.display = 'none';
      title.textContent = '📚 汉字学习';
      document.getElementById('top-bar').style.background = 'linear-gradient(135deg, #FF6B8A, #FFA94D)';
    } else if (view === 'pinyin') {
      backBtn.style.display = 'flex';
      title.textContent = '🔤 拼音学习';
      document.getElementById('top-bar').style.background = 'linear-gradient(135deg, #FF6B8A, #E91E63)';
      PinyinModule.render();
    } else if (view === 'hanzi') {
      backBtn.style.display = 'flex';
      title.textContent = '📖 汉字识字';
      document.getElementById('top-bar').style.background = 'linear-gradient(135deg, #4ECDC4, #2E86AB)';
      HanziModule.render();
    } else if (view === 'practice') {
      backBtn.style.display = 'flex';
      title.textContent = '✏️ 回顾练习';
      document.getElementById('top-bar').style.background = 'linear-gradient(135deg, #5B8DEF, #3B5998)';
      PracticeModule.render();
    }
  },

  // —— 进度追踪 ——
  markLearned(char) {
    if (!this.learnedChars.has(char)) {
      this.learnedChars.add(char);
      this.saveProgress();
      this.updateLearnedCount();
    }
  },

  updateLearnedCount() {
    document.getElementById('learned-count').textContent = this.learnedChars.size;
  },

  saveProgress() {
    try {
      localStorage.setItem('hanzi-learned', JSON.stringify([...this.learnedChars]));
    } catch(e) {}
  },

  loadProgress() {
    try {
      const raw = localStorage.getItem('hanzi-learned');
      if (raw) this.learnedChars = new Set(JSON.parse(raw));
    } catch(e) {}
  }
};

// —— TTS 发音工具 ——
const TTS = {
  speaking: false,

  speak(text, rate = 0.9) {
    window.speechSynthesis.cancel();
    this.speaking = true;
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'zh-CN';
    utt.rate = rate;
    utt.pitch = 1.1;
    utt.onend = () => { this.speaking = false; };
    utt.onerror = () => { this.speaking = false; };
    window.speechSynthesis.speak(utt);
  },

  stop() {
    window.speechSynthesis.cancel();
    this.speaking = false;
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => App.init());
