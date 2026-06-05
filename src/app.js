// ====== app.js — 视图路由 + 全局管理 ======

const App = {
  currentView: 'home',
  learnedChars: new Set(),

  init() {
    this.loadProgress();
    this.bindNavigation();
    this.updateLearnedCount();
    // 初始化中文语音
    TTS.initVoice();
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

  unmarkLearned(char) {
    if (this.learnedChars.has(char)) {
      this.learnedChars.delete(char);
      this.saveProgress();
      this.updateLearnedCount();
    }
  },

  toggleLearned(char) {
    if (this.learnedChars.has(char)) {
      this.unmarkLearned(char);
      return false;
    } else {
      this.markLearned(char);
      return true;
    }
  },

  resetAllLearned() {
    this.learnedChars.clear();
    this.saveProgress();
    this.updateLearnedCount();
  },

  isLearned(char) {
    return this.learnedChars.has(char);
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

// —— 拼音 → 汉字发音映射（用真汉字让 TTS 发出标准中文读音）——
const PINYIN_TO_CHAR = {
  // 声母（教学汉字名）
  'b': '玻', 'p': '坡', 'm': '摸', 'f': '佛',
  'd': '得', 't': '特', 'n': '讷', 'l': '勒',
  'g': '哥', 'k': '科', 'h': '喝',
  'j': '鸡', 'q': '七', 'x': '西',
  'zh': '知', 'ch': '吃', 'sh': '诗', 'r': '日',
  'z': '资', 'c': '呲', 's': '丝',
  'y': '衣', 'w': '屋',
  // 单韵母 — 优先零声母，零声母无正确声调时用带声母字（确保声调准确）
  'ā':'啊','á':'拔','ǎ':'把','à':'爸',
  'ō':'喔','ó':'哦','ǒ':'我','ò':'握',
  'ē':'婀','é':'鹅','ě':'恶','è':'饿',
  'ī':'衣','í':'姨','ǐ':'以','ì':'意',
  'ū':'屋','ú':'无','ǔ':'五','ù':'物',
  'ǖ':'迂','ǘ':'鱼','ǚ':'雨','ǜ':'遇',
  // 基础拼读
  'bā':'八','bá':'拔','bǎ':'把','bà':'爸',
  'mā':'妈','má':'麻','mǎ':'马','mà':'骂',
  'dā':'搭','dá':'答','dǎ':'打','dà':'大',
  'tā':'他','tǎ':'塔','tà':'踏','nǐ':'你','hǎo':'好',
  'wǒ':'我','lè':'乐','kū':'哭',
  'yī':'一','yí':'姨','yǐ':'以','yì':'意',
  // 复韵母（优先零声母字，其次用带该韵母的常用字）
  'āi':'哀','ái':'癌','ǎi':'矮','ài':'爱',
  'ēi':'诶','éi':'谁','ěi':'给','èi':'妹',
  'uī':'威','uí':'围','uǐ':'委','uì':'胃',
  'āo':'凹','áo':'熬','ǎo':'袄','ào':'奥',
  'ōu':'欧','óu':'谋','ǒu':'某','òu':'肉',
  'iē':'耶','ié':'爷','iě':'也','iè':'夜',
  'üē':'约','üé':'决','üě':'雪','üè':'月',
  'iū':'丢','iú':'牛','iǔ':'九','iù':'六',
  'ēr':'儿','ér':'儿','ěr':'耳','èr':'二',
  // 鼻韵母（优先零声母字）
  'ān':'安','án':'蓝','ǎn':'俺','àn':'按',
  'ēn':'恩','én':'人','ěn':'很','èn':'恨',
  'īn':'音','ín':'民','ǐn':'品','ìn':'印',
  'ūn':'温','ún':'文','ǔn':'稳','ùn':'问',
  'ǖn':'晕','ǘn':'云','ǚn':'允','ǜn':'运',
  'āng':'钢','áng':'昂','ǎng':'绑','àng':'棒',
  'ēng':'风','éng':'朋','ěng':'冷','èng':'梦',
  'īng':'英','íng':'平','ǐng':'影','ìng':'硬',
  'ōng':'工','óng':'红','ǒng':'孔','òng':'送',
  // 常用拼读
  'huā':'花','cǎo':'草','tiān':'天','shuǐ':'水',
  'fēng':'风','yún':'云','xué':'学','míng':'明',
  'guāng':'光','chūn':'春','qiū':'秋','dōng':'冬',
  'xià':'夏','shān':'山','hé':'河','hǎi':'海',
  'tián':'田','yuè':'月','xīng':'星','lóng':'龙',
  // 整体认读音节
  'zhi':'知','chi':'吃','shi':'诗','ri':'日',
  'zi':'资','ci':'呲','si':'丝',
  'yi':'衣','wu':'屋','yu':'鱼',
  'ye':'耶','yue':'月','yuan':'圆',
  'yin':'音','yun':'云','ying':'英',
  // 三拼音节
  'guā':'瓜','kuā':'夸','zhuā':'抓',
  'chuāi':'揣','shuāi':'摔','guāi':'乖','kuài':'快','huài':'坏',
  'zhuān':'专','chuán':'船','shuāng':'双',
  'xióng':'熊','jiāng':'江','qiáng':'强','xiǎng':'想',
  'niáng':'娘','liàng':'亮',
  // 特殊拼读
  'nǚ':'女','lǜ':'绿','jú':'橘','qǔ':'取','xū':'需',
  'ér':'儿','wēng':'翁','yōng':'拥',
  'zhuō':'桌','chuò':'绰','ruì':'瑞',
  'zūn':'尊','sǔn':'笋','cōng':'聪','sōng':'松'
};

// —— TTS 发音工具 ——
const TTS = {
  speaking: false,
  chineseVoice: null,
  voicesReady: false,

  // 初始化：获取中文语音
  initVoice() {
    const pickChinese = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      console.log('✅ 系统可用语音:', voices.map(v => `${v.name} (${v.lang})`).join(', '));

      // 按优先级搜索中文语音
      this.chineseVoice =
        voices.find(v => v.lang === 'zh-CN' && v.name.includes('Microsoft')) ||
        voices.find(v => v.lang === 'zh-CN' && v.name.includes('Yaoyao')) ||   // Win10 中文女声
        voices.find(v => v.lang === 'zh-CN' && v.name.includes('Huihui')) ||   // Win10 中文女声
        voices.find(v => v.lang === 'zh-CN' && v.name.includes('Kangkang')) || // Win10 中文男声
        voices.find(v => v.lang === 'zh-CN') ||
        voices.find(v => v.lang === 'zh-HK') ||
        voices.find(v => v.lang === 'zh-TW') ||
        voices.find(v => v.lang.startsWith('zh')) ||
        null;

      this.voicesReady = true;
      console.log('🔊 选中中文语音:', this.chineseVoice ? this.chineseVoice.name : '❌ 未找到中文语音！');
    };

    pickChinese();
    window.speechSynthesis.onvoiceschanged = pickChinese;
  },

  // 将拼音文本转为汉字发音（关键：让 TTS 读汉字而非拼音字母）
  toSpoken(text) {
    // 先在映射表中查找
    if (PINYIN_TO_CHAR[text]) {
      return PINYIN_TO_CHAR[text];
    }
    // 未命中映射的，直接返回（汉字本身可直接读）
    return text;
  },

  speak(text, rate = 0.9) {
    window.speechSynthesis.cancel();
    this.speaking = true;

    const spokenText = this.toSpoken(text);
    console.log('🔊 TTS 朗读:', text, '→', spokenText, '| 语音:', this.chineseVoice ? this.chineseVoice.name : '默认');

    const utt = new SpeechSynthesisUtterance(spokenText);
    utt.lang = 'zh-CN';
    utt.rate = rate;
    utt.pitch = 1.2;
    // 强制使用中文语音
    if (this.chineseVoice) {
      utt.voice = this.chineseVoice;
    }
    utt.onend = () => { this.speaking = false; };
    utt.onerror = (e) => {
      console.error('TTS 错误:', e);
      this.speaking = false;
    };
    window.speechSynthesis.speak(utt);
  },

  stop() {
    window.speechSynthesis.cancel();
    this.speaking = false;
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => App.init());
