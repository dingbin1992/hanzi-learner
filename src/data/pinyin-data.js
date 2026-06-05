// 拼音数据库 — 分三级难度
const pinyinData = {
  // 幼儿级别：单韵母 + 基础声母 + 简单拼读
  preschool: {
    title: '幼儿拼音',
    description: '单韵母 + 声母 + 基础拼读',
    groups: [
      {
        name: '单韵母',
        items: [
          { pinyin: 'ā', char: 'ā', tone: 1 },
          { pinyin: 'á', char: 'á', tone: 2 },
          { pinyin: 'ǎ', char: 'ǎ', tone: 3 },
          { pinyin: 'à', char: 'à', tone: 4 },
          { pinyin: 'ō', char: 'ō', tone: 1 },
          { pinyin: 'ó', char: 'ó', tone: 2 },
          { pinyin: 'ǒ', char: 'ǒ', tone: 3 },
          { pinyin: 'ò', char: 'ò', tone: 4 },
          { pinyin: 'ē', char: 'ē', tone: 1 },
          { pinyin: 'é', char: 'é', tone: 2 },
          { pinyin: 'ě', char: 'ě', tone: 3 },
          { pinyin: 'è', char: 'è', tone: 4 },
          { pinyin: 'ī', char: 'ī', tone: 1 },
          { pinyin: 'í', char: 'í', tone: 2 },
          { pinyin: 'ǐ', char: 'ǐ', tone: 3 },
          { pinyin: 'ì', char: 'ì', tone: 4 },
          { pinyin: 'ū', char: 'ū', tone: 1 },
          { pinyin: 'ú', char: 'ú', tone: 2 },
          { pinyin: 'ǔ', char: 'ǔ', tone: 3 },
          { pinyin: 'ù', char: 'ù', tone: 4 },
          { pinyin: 'ǖ', char: 'ǖ', tone: 1 },
          { pinyin: 'ǘ', char: 'ǘ', tone: 2 },
          { pinyin: 'ǚ', char: 'ǚ', tone: 3 },
          { pinyin: 'ǜ', char: 'ǜ', tone: 4 }
        ]
      },
      {
        name: '声母（上）',
        items: [
          { pinyin: 'b', char: 'b', tone: 0 },
          { pinyin: 'p', char: 'p', tone: 0 },
          { pinyin: 'm', char: 'm', tone: 0 },
          { pinyin: 'f', char: 'f', tone: 0 },
          { pinyin: 'd', char: 'd', tone: 0 },
          { pinyin: 't', char: 't', tone: 0 },
          { pinyin: 'n', char: 'n', tone: 0 },
          { pinyin: 'l', char: 'l', tone: 0 }
        ]
      },
      {
        name: '声母（下）',
        items: [
          { pinyin: 'g', char: 'g', tone: 0 },
          { pinyin: 'k', char: 'k', tone: 0 },
          { pinyin: 'h', char: 'h', tone: 0 },
          { pinyin: 'j', char: 'j', tone: 0 },
          { pinyin: 'q', char: 'q', tone: 0 },
          { pinyin: 'x', char: 'x', tone: 0 },
          { pinyin: 'zh', char: 'zh', tone: 0 },
          { pinyin: 'ch', char: 'ch', tone: 0 },
          { pinyin: 'sh', char: 'sh', tone: 0 },
          { pinyin: 'r', char: 'r', tone: 0 },
          { pinyin: 'z', char: 'z', tone: 0 },
          { pinyin: 'c', char: 'c', tone: 0 },
          { pinyin: 's', char: 's', tone: 0 },
          { pinyin: 'y', char: 'y', tone: 0 },
          { pinyin: 'w', char: 'w', tone: 0 }
        ]
      },
      {
        name: '基础拼读',
        items: [
          { pinyin: 'bā', char: 'bā', tone: 1 },
          { pinyin: 'bá', char: 'bá', tone: 2 },
          { pinyin: 'bǎ', char: 'bǎ', tone: 3 },
          { pinyin: 'bà', char: 'bà', tone: 4 },
          { pinyin: 'mā', char: 'mā', tone: 1 },
          { pinyin: 'má', char: 'má', tone: 2 },
          { pinyin: 'mǎ', char: 'mǎ', tone: 3 },
          { pinyin: 'mà', char: 'mà', tone: 4 },
          { pinyin: 'dà', char: 'dà', tone: 4 },
          { pinyin: 'tā', char: 'tā', tone: 1 },
          { pinyin: 'nǐ', char: 'nǐ', tone: 3 },
          { pinyin: 'hǎo', char: 'hǎo', tone: 3 },
          { pinyin: 'wǒ', char: 'wǒ', tone: 3 },
          { pinyin: 'lè', char: 'lè', tone: 4 },
          { pinyin: 'kū', char: 'kū', tone: 1 }
        ]
      }
    ]
  },

  // 小学级别：复韵母 + 鼻韵母 + 常用拼读
  elementary: {
    title: '小学拼音',
    description: '复韵母 + 鼻韵母 + 常用拼读',
    groups: [
      {
        name: '复韵母',
        items: [
          { pinyin: 'āi', char: 'āi', tone: 1 },
          { pinyin: 'ái', char: 'ái', tone: 2 },
          { pinyin: 'ǎi', char: 'ǎi', tone: 3 },
          { pinyin: 'ài', char: 'ài', tone: 4 },
          { pinyin: 'ēi', char: 'ēi', tone: 1 },
          { pinyin: 'éi', char: 'éi', tone: 2 },
          { pinyin: 'ěi', char: 'ěi', tone: 3 },
          { pinyin: 'èi', char: 'èi', tone: 4 },
          { pinyin: 'uī', char: 'uī', tone: 1 },
          { pinyin: 'uí', char: 'uí', tone: 2 },
          { pinyin: 'uǐ', char: 'uǐ', tone: 3 },
          { pinyin: 'uì', char: 'uì', tone: 4 },
          { pinyin: 'āo', char: 'āo', tone: 1 },
          { pinyin: 'áo', char: 'áo', tone: 2 },
          { pinyin: 'ǎo', char: 'ǎo', tone: 3 },
          { pinyin: 'ào', char: 'ào', tone: 4 },
          { pinyin: 'ōu', char: 'ōu', tone: 1 },
          { pinyin: 'óu', char: 'óu', tone: 2 },
          { pinyin: 'ǒu', char: 'ǒu', tone: 3 },
          { pinyin: 'òu', char: 'òu', tone: 4 },
          { pinyin: 'iē', char: 'iē', tone: 1 },
          { pinyin: 'ié', char: 'ié', tone: 2 },
          { pinyin: 'iě', char: 'iě', tone: 3 },
          { pinyin: 'iè', char: 'iè', tone: 4 },
          { pinyin: 'üē', char: 'üē', tone: 1 },
          { pinyin: 'üé', char: 'üé', tone: 2 },
          { pinyin: 'üě', char: 'üě', tone: 3 },
          { pinyin: 'üè', char: 'üè', tone: 4 }
        ]
      },
      {
        name: '鼻韵母',
        items: [
          { pinyin: 'ān', char: 'ān', tone: 1 },
          { pinyin: 'án', char: 'án', tone: 2 },
          { pinyin: 'ǎn', char: 'ǎn', tone: 3 },
          { pinyin: 'àn', char: 'àn', tone: 4 },
          { pinyin: 'ēn', char: 'ēn', tone: 1 },
          { pinyin: 'én', char: 'én', tone: 2 },
          { pinyin: 'ěn', char: 'ěn', tone: 3 },
          { pinyin: 'èn', char: 'èn', tone: 4 },
          { pinyin: 'īn', char: 'īn', tone: 1 },
          { pinyin: 'ín', char: 'ín', tone: 2 },
          { pinyin: 'ǐn', char: 'ǐn', tone: 3 },
          { pinyin: 'ìn', char: 'ìn', tone: 4 },
          { pinyin: 'ūn', char: 'ūn', tone: 1 },
          { pinyin: 'ún', char: 'ún', tone: 2 },
          { pinyin: 'ǔn', char: 'ǔn', tone: 3 },
          { pinyin: 'ùn', char: 'ùn', tone: 4 },
          { pinyin: 'ǖn', char: 'ǖn', tone: 1 },
          { pinyin: 'ǘn', char: 'ǘn', tone: 2 },
          { pinyin: 'ǚn', char: 'ǚn', tone: 3 },
          { pinyin: 'ǜn', char: 'ǜn', tone: 4 },
          { pinyin: 'āng', char: 'āng', tone: 1 },
          { pinyin: 'áng', char: 'áng', tone: 2 },
          { pinyin: 'ǎng', char: 'ǎng', tone: 3 },
          { pinyin: 'àng', char: 'àng', tone: 4 },
          { pinyin: 'ēng', char: 'ēng', tone: 1 },
          { pinyin: 'éng', char: 'éng', tone: 2 },
          { pinyin: 'ěng', char: 'ěng', tone: 3 },
          { pinyin: 'èng', char: 'èng', tone: 4 },
          { pinyin: 'īng', char: 'īng', tone: 1 },
          { pinyin: 'íng', char: 'íng', tone: 2 },
          { pinyin: 'ǐng', char: 'ǐng', tone: 3 },
          { pinyin: 'ìng', char: 'ìng', tone: 4 },
          { pinyin: 'ōng', char: 'ōng', tone: 1 },
          { pinyin: 'óng', char: 'óng', tone: 2 },
          { pinyin: 'ǒng', char: 'ǒng', tone: 3 },
          { pinyin: 'òng', char: 'òng', tone: 4 }
        ]
      },
      {
        name: '常用拼读',
        items: [
          { pinyin: 'huā', char: 'huā', tone: 1 },
          { pinyin: 'cǎo', char: 'cǎo', tone: 3 },
          { pinyin: 'tiān', char: 'tiān', tone: 1 },
          { pinyin: 'shuǐ', char: 'shuǐ', tone: 3 },
          { pinyin: 'fēng', char: 'fēng', tone: 1 },
          { pinyin: 'yún', char: 'yún', tone: 2 },
          { pinyin: 'xué', char: 'xué', tone: 2 },
          { pinyin: 'míng', char: 'míng', tone: 2 },
          { pinyin: 'guāng', char: 'guāng', tone: 1 },
          { pinyin: 'chūn', char: 'chūn', tone: 1 },
          { pinyin: 'qiū', char: 'qiū', tone: 1 },
          { pinyin: 'dōng', char: 'dōng', tone: 1 },
          { pinyin: 'xià', char: 'xià', tone: 4 },
          { pinyin: 'shān', char: 'shān', tone: 1 },
          { pinyin: 'hé', char: 'hé', tone: 2 },
          { pinyin: 'hǎi', char: 'hǎi', tone: 3 },
          { pinyin: 'tián', char: 'tián', tone: 2 },
          { pinyin: 'yuè', char: 'yuè', tone: 4 },
          { pinyin: 'xīng', char: 'xīng', tone: 1 },
          { pinyin: 'lóng', char: 'lóng', tone: 2 }
        ]
      }
    ]
  },

  // 小学以上级别：整体认读音节 + 复杂拼读
  advanced: {
    title: '进阶拼音',
    description: '整体认读音节 + 复杂拼读',
    groups: [
      {
        name: '整体认读音节',
        items: [
          { pinyin: 'zhi', char: 'zhi', tone: 0 },
          { pinyin: 'chi', char: 'chi', tone: 0 },
          { pinyin: 'shi', char: 'shi', tone: 0 },
          { pinyin: 'ri', char: 'ri', tone: 0 },
          { pinyin: 'zi', char: 'zi', tone: 0 },
          { pinyin: 'ci', char: 'ci', tone: 0 },
          { pinyin: 'si', char: 'si', tone: 0 },
          { pinyin: 'yi', char: 'yi', tone: 0 },
          { pinyin: 'wu', char: 'wu', tone: 0 },
          { pinyin: 'yu', char: 'yu', tone: 0 },
          { pinyin: 'ye', char: 'ye', tone: 0 },
          { pinyin: 'yue', char: 'yue', tone: 0 },
          { pinyin: 'yuan', char: 'yuan', tone: 0 },
          { pinyin: 'yin', char: 'yin', tone: 0 },
          { pinyin: 'yun', char: 'yun', tone: 0 },
          { pinyin: 'ying', char: 'ying', tone: 0 }
        ]
      },
      {
        name: '三拼音节',
        items: [
          { pinyin: 'guā', char: 'guā', tone: 1 },
          { pinyin: 'kuā', char: 'kuā', tone: 1 },
          { pinyin: 'huā', char: 'huā', tone: 1 },
          { pinyin: 'zhuā', char: 'zhuā', tone: 1 },
          { pinyin: 'chuāi', char: 'chuāi', tone: 1 },
          { pinyin: 'shuāi', char: 'shuāi', tone: 1 },
          { pinyin: 'guāi', char: 'guāi', tone: 1 },
          { pinyin: 'kuài', char: 'kuài', tone: 4 },
          { pinyin: 'huài', char: 'huài', tone: 4 },
          { pinyin: 'zhuān', char: 'zhuān', tone: 1 },
          { pinyin: 'chuán', char: 'chuán', tone: 2 },
          { pinyin: 'shuāng', char: 'shuāng', tone: 1 },
          { pinyin: 'xióng', char: 'xióng', tone: 2 },
          { pinyin: 'jiāng', char: 'jiāng', tone: 1 },
          { pinyin: 'qiáng', char: 'qiáng', tone: 2 },
          { pinyin: 'xiǎng', char: 'xiǎng', tone: 3 },
          { pinyin: 'niáng', char: 'niáng', tone: 2 },
          { pinyin: 'liàng', char: 'liàng', tone: 4 }
        ]
      },
      {
        name: '特殊拼读规则',
        items: [
          { pinyin: 'nǚ', char: 'nǚ', tone: 3 },
          { pinyin: 'lǜ', char: 'lǜ', tone: 4 },
          { pinyin: 'jú', char: 'jú', tone: 2 },
          { pinyin: 'qǔ', char: 'qǔ', tone: 3 },
          { pinyin: 'xū', char: 'xū', tone: 1 },
          { pinyin: 'ér', char: 'ér', tone: 2 },
          { pinyin: 'wēng', char: 'wēng', tone: 1 },
          { pinyin: 'yōng', char: 'yōng', tone: 1 },
          { pinyin: 'zhuō', char: 'zhuō', tone: 1 },
          { pinyin: 'chuò', char: 'chuò', tone: 4 },
          { pinyin: 'ruì', char: 'ruì', tone: 4 },
          { pinyin: 'zūn', char: 'zūn', tone: 1 },
          { pinyin: 'sǔn', char: 'sǔn', tone: 3 },
          { pinyin: 'cōng', char: 'cōng', tone: 1 },
          { pinyin: 'sōng', char: 'sōng', tone: 1 }
        ]
      }
    ]
  }
};
