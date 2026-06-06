// ====== hanzi.js — 汉字识字模块 ======

const HanziModule = {
  currentLevel: 'all',
  searchQuery: '',
  filterStatus: 'all',
  writer: null,       // HanziWriter 实例
  currentStroke: 0,   // 当前笔画
  totalStrokes: 0,    // 总笔画数
  isStrokeAnimating: false,

  init() {
    this.bindTabs();
    this.bindSearch();
    this.bindFilter();
    this.bindDialog();
  },

  bindTabs() {
    const tabs = document.querySelectorAll('#hanzi-tabs .level-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentLevel = tab.dataset.level;
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

  bindFilter() {
    // 筛选按钮
    document.querySelectorAll('#hanzi-filter .filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#hanzi-filter .filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterStatus = btn.dataset.filter;
        this.render();
      });
    });
    // 一键重置
    document.getElementById('btn-reset-all').addEventListener('click', () => {
      App.resetAllLearned();
      // 切回"全部"筛选
      this.filterStatus = 'all';
      document.querySelectorAll('#hanzi-filter .filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('#hanzi-filter .filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      this.render();
    });
  },

  bindDialog() {
    const closeDialog = () => {
      document.getElementById('hanzi-dialog').classList.remove('active');
      document.getElementById('dialog-overlay').classList.remove('active');
      // 清理笔画状态
      if (this.writer) {
        try { this.writer.cancelAnimation(); } catch(e) {}
        this.writer = null;
        this._strokeData = null;
        this.isStrokeAnimating = false;
      }
      const writerTarget = document.getElementById('dialog-writer-target');
      if (writerTarget) writerTarget.innerHTML = '';
      this.refreshView();
    };
    document.getElementById('dialog-close').addEventListener('click', closeDialog);
    document.getElementById('dialog-overlay').addEventListener('click', closeDialog);
  },

  getChars() {
    if (this.currentLevel === 'all' || this.searchQuery) {
      return App.getAllUniqueChars();
    }
    switch(this.currentLevel) {
      case 'preschool': return preschoolChars;
      case 'elementary': return elementaryChars;
      case 'advanced': return advancedChars;
      default: return App.getAllUniqueChars();
    }
  },

  render() {
    const grid = document.getElementById('hanzi-grid');
    let chars = this.getChars();

    // 搜索过滤（跨级别）
    if (this.searchQuery) {
      const q = this.searchQuery;
      chars = chars.filter(c =>
        c.char.includes(q) ||
        c.pinyin.toLowerCase().includes(q)
      );
    }

    // 筛选已学/未学
    if (this.filterStatus === 'learned') {
      chars = chars.filter(c => App.learnedChars.has(c.char));
    } else if (this.filterStatus === 'unlearned') {
      chars = chars.filter(c => !App.learnedChars.has(c.char));
    }

    if (chars.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;font-size:18px;">😕 没有找到匹配的汉字</div>`;
      return;
    }

    let html = '';
    chars.forEach(c => {
      const isLearned = App.learnedChars.has(c.char);
      const learnedClass = isLearned ? ' learned' : '';
      html += `<div class="hanzi-card${learnedClass}" data-char="${c.char}" data-pinyin="${c.pinyin}" data-radical="${c.radical}" data-strokes="${c.strokes}">
        <div class="hanzi-char">${c.char}</div>
        <div class="hanzi-pinyin">${c.pinyin}</div>
        <div class="hanzi-radical">部首：${c.radical} | ${c.strokes}画</div>
        ${isLearned ? '<div class="hanzi-check">✅</div>' : ''}
      </div>`;
    });

    grid.innerHTML = html;

    // 绑定点击 → 弹出田字格对话框
    grid.querySelectorAll('.hanzi-card').forEach(card => {
      card.addEventListener('click', function() {
        const char = this.dataset.char;
        const pinyin = this.dataset.pinyin;
        const radical = this.dataset.radical;
        const strokes = this.dataset.strokes;
        // 动画
        this.classList.add('playing');
        setTimeout(() => this.classList.remove('playing'), 500);
        // 默认标记已学
        App.markLearned(char);
        // 弹出对话框
        HanziModule.showDialog(char, pinyin, radical, strokes);
      });
    });
  },

  // 刷新当前视图（用于对话框操作后更新卡片样式）
  refreshView() {
    this.render();
  },

  // 田字格对话框
  showDialog(char, pinyin, radical, strokes) {
    console.log('=== showDialog 被调用 ===', char);

    // 清理上一次的笔画状态，防止多层 SVG 叠加导致闪退
    if (this.writer) {
      try { this.writer.cancelAnimation(); } catch(e) {}
      this.writer = null;
      this._strokeData = null;
    }
    this.isStrokeAnimating = false;
    const oldTarget = document.getElementById('dialog-writer-target');
    if (oldTarget) oldTarget.innerHTML = '';
    // 隐藏笔画控制面板，恢复按钮状态
    const oldControls = document.getElementById('dialog-stroke-controls');
    if (oldControls) oldControls.style.visibility = 'hidden';
    const oldStrokeBtn = document.getElementById('dialog-stroke');
    if (oldStrokeBtn) oldStrokeBtn.textContent = '✏️ 学笔画';

    const isLearned = App.isLearned(char);
    document.getElementById('dialog-char').textContent = char;
    document.getElementById('dialog-pinyin').textContent = pinyin;
    document.getElementById('dialog-radical').textContent = radical;
    document.getElementById('dialog-strokes').textContent = `${strokes} 画`;

    const badge = document.getElementById('dialog-learned-badge');
    badge.textContent = isLearned ? '✅ 已学习' : '📝 未学习';
    badge.className = 'dialog-learned ' + (isLearned ? 'learned' : 'unlearned');

    // 切换学习状态按钮
    const toggleBtn = document.getElementById('dialog-toggle-learned');
    toggleBtn.textContent = isLearned ? '↩ 取消学习' : '✅ 标记已学';
    toggleBtn.className = isLearned ? 'btn-dialog-toggle unlearn' : 'btn-dialog-toggle learn';
    toggleBtn.onclick = () => {
      const nowLearned = App.toggleLearned(char);
      badge.textContent = nowLearned ? '✅ 已学习' : '📝 未学习';
      badge.className = 'dialog-learned ' + (nowLearned ? 'learned' : 'unlearned');
      toggleBtn.textContent = nowLearned ? '↩ 取消学习' : '✅ 标记已学';
      toggleBtn.className = nowLearned ? 'btn-dialog-toggle unlearn' : 'btn-dialog-toggle learn';
      // 重画田字格底色
      this.drawTianZiGe(document.getElementById('dialog-tianzige'), char, nowLearned);
      // 刷新卡片列表
      this.refreshView();
    };

    // 画田字格
    const gridCanvas = document.getElementById('dialog-tianzige');
    this.drawTianZiGe(gridCanvas, char, isLearned);

    // 播放按钮
    const playBtn = document.getElementById('dialog-play');
    playBtn.onclick = () => TTS.speak(char, 0.85);

    // 学笔画按钮
    const strokeBtn = document.getElementById('dialog-stroke');
    const strokeControls = document.getElementById('dialog-stroke-controls');
    console.log('strokeBtn 元素:', strokeBtn, 'strokeControls:', strokeControls);
    if (!strokeBtn) {
      console.error('❌ dialog-stroke 按钮未找到！');
      return;
    }
    strokeBtn.onclick = () => {
      console.log('学笔画按钮点击, char:', char);
      const isVisible = strokeControls.style.visibility !== 'hidden';
      if (isVisible) {
        strokeControls.style.visibility = 'hidden';
        strokeBtn.textContent = '✏️ 学笔画';
        this.resetTianZiGe(char, isLearned);
      } else {
        strokeControls.style.visibility = 'visible';
        strokeBtn.textContent = '✏️ 关闭笔画';
        // 隐藏田字格中的字，只留空白格子
        this.drawTianZiGe(gridCanvas, char, isLearned, false);
        console.log('调用 initStrokeLearning, char:', char);
        this.initStrokeLearning(char);
      }
    };

    // 笔画导航
    document.getElementById('stroke-prev').onclick = () => this.prevStroke();
    document.getElementById('stroke-next').onclick = () => this.nextStroke();
    document.getElementById('stroke-auto').onclick = () => this.autoPlayStrokes();

    // 初始状态：隐藏笔画控制
    strokeControls.style.visibility = 'hidden';
    strokeBtn.textContent = '✏️ 学笔画';

    document.getElementById('hanzi-dialog').classList.add('active');
    document.getElementById('dialog-overlay').classList.add('active');
  },

  // ====== 笔画学习 ======
  _strokeData: null,

  initStrokeLearning(char) {
    console.log('initStrokeLearning 开始, char:', char);
    const canvas = document.getElementById('dialog-tianzige');
    const writerTarget = document.getElementById('dialog-writer-target');
    const ctx = canvas.getContext('2d');
    const self = this;

    const xhr = new XMLHttpRequest();
    const url = `data/strokes/${char}.json`;
    console.log('XHR 请求 URL:', url);
    xhr.open('GET', url, true);
    xhr.onload = () => {
      console.log('XHR 响应状态:', xhr.status);
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log('笔画数据加载成功, strokes:', data.strokes ? data.strokes.length : 0);
          self._strokeData = data;
          self.totalStrokes = data.strokes ? data.strokes.length : 0;
          document.getElementById('stroke-total').textContent = self.totalStrokes;
          self.currentStroke = 0;
          document.getElementById('stroke-current').textContent = '0';
          self._createWriter(writerTarget, char, data);
        } catch(e) {
          console.error('笔画数据解析失败:', e);
          self._showStrokeError(ctx);
        }
      } else {
        console.error('笔画数据加载 HTTP', xhr.status, url);
        self._showStrokeError(ctx);
      }
    };
    xhr.onerror = () => {
      console.error('笔画数据加载网络错误:', url);
      self._showStrokeError(ctx);
    };
    xhr.send();
    console.log('XHR 已发送');
  },

  _createWriter(target, char, data) {
    console.log('_createWriter 开始, char:', char, 'target:', target.id);
    const self = this;
    try {
      this.writer = HanziWriter.create(target, char, {
        width: 200,
        height: 200,
        padding: 8,
        showCharacter: false,
        showOutline: true,
        strokeAnimationSpeed: 1.5,
        charDataLoader: (c, onComplete, onError) => {
          console.log('charDataLoader 被调用, char:', c);
          onComplete(data);
        }
      });
      console.log('HanziWriter 创建成功');
    } catch(e) {
      console.error('HanziWriter 创建失败:', e);
    }
  },

  _showStrokeError(ctx) {
    ctx.clearRect(0, 0, 200, 200);
    ctx.fillStyle = '#FFFEF9';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#999';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('暂无笔画数据', 100, 75);
    ctx.fillText('请尝试常用汉字', 100, 100);
    ctx.fillText('或联系开发者检查数据包', 100, 125);
  },

  prevStroke() {
    if (!this.writer || this.currentStroke <= 0) return;
    this.currentStroke--;
    document.getElementById('stroke-current').textContent = this.currentStroke;
  },

  nextStroke() {
    if (!this.writer || this.currentStroke >= this.totalStrokes) return;
    const idx = this.currentStroke;
    this.currentStroke++;
    document.getElementById('stroke-current').textContent = this.currentStroke;
    try {
      this.writer.animateStroke(idx);
    } catch(e) {
      console.error('笔画动画失败:', e);
    }
  },

  autoPlayStrokes() {
    if (!this.writer || this.isStrokeAnimating) return;
    this.isStrokeAnimating = true;
    const btn = document.getElementById('stroke-auto');
    btn.textContent = '⏸ 停止';
    btn.onclick = () => {
      this.isStrokeAnimating = false;
      btn.textContent = '▶ 自动播放';
      btn.onclick = () => this.autoPlayStrokes();
      try { this.writer.pauseAnimation(); } catch(e) {}
    };
    this.currentStroke = 0;
    document.getElementById('stroke-current').textContent = '0';
    try {
      this.writer.animateCharacter({
        onComplete: () => {
          this.isStrokeAnimating = false;
          btn.textContent = '▶ 自动播放';
          btn.onclick = () => this.autoPlayStrokes();
          document.getElementById('stroke-current').textContent = this.totalStrokes;
        }
      });
    } catch(e) {
      console.error('自动播放失败:', e);
      this.isStrokeAnimating = false;
    }
  },

  resetTianZiGe(char, isLearned) {
    if (this.writer) {
      try { this.writer.cancelAnimation(); } catch(e) {}
      this.writer = null;
      this._strokeData = null;
    }
    this.isStrokeAnimating = false;
    const canvas = document.getElementById('dialog-tianzige');
    const writerTarget = document.getElementById('dialog-writer-target');
    writerTarget.innerHTML = '';
    this.drawTianZiGe(canvas, char, isLearned);
  },

  drawTianZiGe(canvas, char, isLearned, showChar = true) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 底色
    ctx.fillStyle = isLearned ? '#E8F5E9' : '#FFFEF9';
    ctx.fillRect(0, 0, w, h);

    // 外框
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // 十字虚线
    ctx.strokeStyle = '#D32F2F';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // 写汉字（笔画学习模式下隐藏）
    if (showChar) {
      ctx.fillStyle = '#1A1A1A';
      ctx.font = `bold ${w * 0.55}px "KaiTi", "STKaiti", "Noto Serif SC", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, w / 2, h / 2);
    }
  },
};
