// ====== practice.js — 回顾练习模块 ======

const PracticeModule = {
  mode: 'hanzi',      // 'pinyin' | 'hanzi'
  currentQuestion: null,
  correctAnswer: null,
  scoreCorrect: 0,
  scoreTotal: 0,
  scoreBest: { pinyin: 0, hanzi: 0 },
  answered: false,
  questionsPerRound: 10,
  questionIndex: 0,

  init() {
    this.bindTabs();
    this.bindButtons();
    this.loadBestScores();
  },

  bindTabs() {
    const tabs = document.querySelectorAll('#practice-tabs .level-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.mode = tab.dataset.mode;
        this.resetRound();
        this.render();
      });
    });
  },

  bindButtons() {
    document.getElementById('btn-next').addEventListener('click', () => {
      if (this.questionIndex >= this.questionsPerRound) {
        this.resetRound();
        this.render();
      } else {
        this.nextQuestion();
      }
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      this.resetRound();
      this.render();
    });
  },

  resetRound() {
    this.scoreCorrect = 0;
    this.scoreTotal = 0;
    this.questionIndex = 0;
    this.answered = false;
    this.currentQuestion = null;
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('quiz-feedback').textContent = '';
  },

  // —— 生成题目 ——
  generateQuestion() {
    // 混用所有级别的字库
    const allChars = [...preschoolChars, ...elementaryChars, ...advancedChars];
    // 去重
    const seen = new Set();
    const unique = allChars.filter(c => {
      if (seen.has(c.char)) return false;
      seen.add(c.char);
      return true;
    });

    if (this.mode === 'hanzi') {
      // 汉字练习：看拼音选汉字
      const correct = unique[Math.floor(Math.random() * unique.length)];
      // 选3个干扰项
      const others = unique.filter(c => c.char !== correct.char);
      const shuffledOthers = others.sort(() => Math.random() - 0.5);
      const options = [correct, ...shuffledOthers.slice(0, 3)].sort(() => Math.random() - 0.5);

      return {
        type: 'hanzi',
        question: correct.pinyin,
        questionLabel: '选出下面拼音对应的汉字：',
        correct: correct.char,
        correctPinyin: correct.pinyin,
        options: options.map(o => ({ label: o.char, value: o.char }))
      };
    } else {
      // 拼音练习：看汉字选拼音
      const correct = unique[Math.floor(Math.random() * unique.length)];
      const others = unique.filter(c => c.char !== correct.char);
      const shuffledOthers = others.sort(() => Math.random() - 0.5);
      const options = [correct, ...shuffledOthers.slice(0, 3)].sort(() => Math.random() - 0.5);

      return {
        type: 'pinyin',
        question: correct.char,
        questionLabel: '选出下面汉字的正确拼音：',
        correct: correct.pinyin,
        correctChar: correct.char,
        options: options.map(o => ({ label: o.pinyin, value: o.pinyin }))
      };
    }
  },

  nextQuestion() {
    this.answered = false;
    this.currentQuestion = this.generateQuestion();
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-feedback').className = 'quiz-feedback';
    this.renderQuestion();
  },

  // —— 渲染 ——
  render() {
    this.nextQuestion();
    this.updateScoreDisplay();
  },

  renderQuestion() {
    const q = this.currentQuestion;
    if (!q) return;

    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');

    questionEl.textContent = q.question;
    if (q.type === 'pinyin') {
      questionEl.className = 'quiz-question';
    } else {
      questionEl.className = 'quiz-question pinyin-q';
    }

    let html = '';
    q.options.forEach((opt, idx) => {
      html += `<button class="quiz-option" data-value="${opt.value}" data-idx="${idx}">${opt.label}</button>`;
    });
    optionsEl.innerHTML = html;

    // 绑定选项点击
    optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.answered) return;
        this.answered = true;
        const selected = btn.dataset.value;
        const isCorrect = (selected === q.correct);

        this.scoreTotal++;

        if (isCorrect) {
          this.scoreCorrect++;
          btn.classList.add('correct');
          document.getElementById('quiz-feedback').textContent = '🎉 太棒了！回答正确！';
          document.getElementById('quiz-feedback').style.color = '#4CAF50';
          // 发音
          if (q.type === 'hanzi') {
            TTS.speak(q.correct, 0.7);
          } else {
            TTS.speak(q.correctChar, 0.7);
          }
          // 标记已学
          const learnedChar = q.type === 'hanzi' ? q.correct : q.correctChar;
          App.markLearned(learnedChar);
        } else {
          btn.classList.add('wrong');
          document.getElementById('quiz-feedback').textContent = `❌ 不对哦～正确答案是：${q.correct}`;
          document.getElementById('quiz-feedback').style.color = '#F44336';
          // 高亮正确答案
          optionsEl.querySelectorAll('.quiz-option').forEach(b => {
            if (b.dataset.value === q.correct) b.classList.add('correct');
          });
        }

        // 禁用所有按钮
        optionsEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

        this.questionIndex++;
        this.updateScoreDisplay();
        this.saveBestScore();

        // 显示下一题或结束
        if (this.questionIndex >= this.questionsPerRound) {
          document.getElementById('btn-next').textContent = '🏆 再来一轮';
          document.getElementById('btn-next').style.display = 'inline-block';
          const fb = document.getElementById('quiz-feedback');
          fb.textContent = `🎊 本轮结束！得分：${this.scoreCorrect} / ${this.questionsPerRound}`;
          fb.style.color = this.scoreCorrect >= 8 ? '#4CAF50' : '#FF9800';
        } else {
          document.getElementById('btn-next').textContent = '下一题 ▶';
          document.getElementById('btn-next').style.display = 'inline-block';
        }
      });
    });
  },

  updateScoreDisplay() {
    document.getElementById('score-correct').textContent = this.scoreCorrect;
    document.getElementById('score-total').textContent = this.scoreTotal;
    const best = this.mode === 'pinyin' ? this.scoreBest.pinyin : this.scoreBest.hanzi;
    document.getElementById('score-best').textContent = best;
  },

  // —— 最高分 ——
  loadBestScores() {
    try {
      const raw = localStorage.getItem('hanzi-best-scores');
      if (raw) this.scoreBest = JSON.parse(raw);
    } catch(e) {}
  },

  saveBestScore() {
    const key = this.mode === 'pinyin' ? 'pinyin' : 'hanzi';
    if (this.scoreCorrect > this.scoreBest[key]) {
      this.scoreBest[key] = this.scoreCorrect;
      try {
        localStorage.setItem('hanzi-best-scores', JSON.stringify(this.scoreBest));
      } catch(e) {}
    }
    this.updateScoreDisplay();
  }
};
