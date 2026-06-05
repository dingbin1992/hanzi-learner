// 拼音数据库 — 汉语拼音字母表 + 四声调
const pinyinData = {

  // ====== 1. 汉语拼音字母表（基础形式，不带声调） ======
  zimubiao: {
    title: '汉语拼音字母表',
    description: '声母 · 韵母 · 整体认读音节',
    groups: [
      { name: '🔤 声母（23个）', items: [
        { char:'b'},{char:'p'},{char:'m'},{char:'f'},{char:'d'},{char:'t'},{char:'n'},{char:'l'},
        {char:'g'},{char:'k'},{char:'h'},{char:'j'},{char:'q'},{char:'x'},
        {char:'zh'},{char:'ch'},{char:'sh'},{char:'r'},{char:'z'},{char:'c'},{char:'s'},
        {char:'y'},{char:'w'}
      ]},
      { name: '🅰️ 单韵母（6个）', items: [
        {char:'a'},{char:'o'},{char:'e'},{char:'i'},{char:'u'},{char:'ü'}
      ]},
      { name: '🔗 复韵母（9个）', items: [
        {char:'ai'},{char:'ei'},{char:'ui'},{char:'ao'},{char:'ou'},{char:'iu'},{char:'ie'},{char:'üe'},{char:'er'}
      ]},
      { name: '👃 前鼻韵母（5个）', items: [
        {char:'an'},{char:'en'},{char:'in'},{char:'un'},{char:'ün'}
      ]},
      { name: '👃 后鼻韵母（4个）', items: [
        {char:'ang'},{char:'eng'},{char:'ing'},{char:'ong'}
      ]},
      { name: '📦 整体认读音节（16个）', items: [
        {char:'zhi'},{char:'chi'},{char:'shi'},{char:'ri'},{char:'zi'},{char:'ci'},{char:'si'},
        {char:'yi'},{char:'wu'},{char:'yu'},{char:'ye'},{char:'yue'},
        {char:'yuan'},{char:'yin'},{char:'yun'},{char:'ying'}
      ]}
    ]
  },

  // ====== 2. 四声调（说明 + 大量组合练习，配汉字） ======
  sisheng: {
    title: '四声调',
    description: '一声平¯  二声扬ˊ  三声拐弯ˇ  四声降ˋ',
    groups: [
      // 四声说明
      { name:'📖 四声口诀', intro:true, items:[
        {char:'¯', speak:'ā', name:'第一声·阴平', desc:'一声平，高而平，没有升降变化', hanzi:'妈'},
        {char:'ˊ', speak:'á', name:'第二声·阳平', desc:'二声扬，由中升高，往上走', hanzi:'麻'},
        {char:'ˇ', speak:'ǎ', name:'第三声·上声', desc:'三声拐弯，先降后升，拐个弯', hanzi:'马'},
        {char:'ˋ', speak:'à', name:'第四声·去声', desc:'四声降，从高到低，往下降', hanzi:'骂'}
      ]},
      // === b 声母拼读 ===
      { name:'b 拼读练习', items:[
        {char:'bā',hanzi:'八'},{char:'bá',hanzi:'拔'},{char:'bǎ',hanzi:'把'},{char:'bà',hanzi:'爸'},
        {char:'bō',hanzi:'波'},{char:'bó',hanzi:'博'},{char:'bǒ',hanzi:'跛'},{char:'bò',hanzi:'簸'},
        {char:'bī',hanzi:'逼'},{char:'bí',hanzi:'鼻'},{char:'bǐ',hanzi:'笔'},{char:'bì',hanzi:'必'},
        {char:'bū',hanzi:'逋'},{char:'bú',hanzi:'醭'},{char:'bǔ',hanzi:'补'},{char:'bù',hanzi:'不'}
      ]},
      // === p 声母拼读 ===
      { name:'p 拼读练习', items:[
        {char:'pā',hanzi:'趴'},{char:'pá',hanzi:'爬'},{char:'pà',hanzi:'怕'},
        {char:'pō',hanzi:'坡'},{char:'pó',hanzi:'婆'},{char:'pò',hanzi:'破'},
        {char:'pī',hanzi:'批'},{char:'pí',hanzi:'皮'},{char:'pǐ',hanzi:'匹'},{char:'pì',hanzi:'辟'},
        {char:'pū',hanzi:'扑'},{char:'pú',hanzi:'葡'},{char:'pǔ',hanzi:'普'},{char:'pù',hanzi:'瀑'}
      ]},
      // === m 声母拼读 ===
      { name:'m 拼读练习', items:[
        {char:'mā',hanzi:'妈'},{char:'má',hanzi:'麻'},{char:'mǎ',hanzi:'马'},{char:'mà',hanzi:'骂'},
        {char:'mō',hanzi:'摸'},{char:'mó',hanzi:'磨'},{char:'mǒ',hanzi:'抹'},{char:'mò',hanzi:'墨'},
        {char:'mī',hanzi:'眯'},{char:'mí',hanzi:'迷'},{char:'mǐ',hanzi:'米'},{char:'mì',hanzi:'密'}
      ]},
      // === f 声母拼读 ===
      { name:'f 拼读练习', items:[
        {char:'fā',hanzi:'发'},{char:'fá',hanzi:'罚'},{char:'fǎ',hanzi:'法'},{char:'fà',hanzi:'发'},
        {char:'fó',hanzi:'佛'},
        {char:'fū',hanzi:'夫'},{char:'fú',hanzi:'服'},{char:'fǔ',hanzi:'斧'},{char:'fù',hanzi:'父'}
      ]},
      // === d 声母拼读 ===
      { name:'d 拼读练习', items:[
        {char:'dā',hanzi:'搭'},{char:'dá',hanzi:'答'},{char:'dǎ',hanzi:'打'},{char:'dà',hanzi:'大'},
        {char:'dē',hanzi:'德'},{char:'dé',hanzi:'得'},
        {char:'dī',hanzi:'低'},{char:'dí',hanzi:'敌'},{char:'dǐ',hanzi:'底'},{char:'dì',hanzi:'地'},
        {char:'dū',hanzi:'都'},{char:'dú',hanzi:'读'},{char:'dǔ',hanzi:'赌'},{char:'dù',hanzi:'度'}
      ]},
      // === t 声母拼读 ===
      { name:'t 拼读练习', items:[
        {char:'tā',hanzi:'他'},{char:'tǎ',hanzi:'塔'},{char:'tà',hanzi:'踏'},
        {char:'tè',hanzi:'特'},
        {char:'tī',hanzi:'踢'},{char:'tí',hanzi:'提'},{char:'tǐ',hanzi:'体'},{char:'tì',hanzi:'替'},
        {char:'tū',hanzi:'突'},{char:'tú',hanzi:'图'},{char:'tǔ',hanzi:'土'},{char:'tù',hanzi:'兔'}
      ]},
      // === n 声母拼读 ===
      { name:'n 拼读练习', items:[
        {char:'nā',hanzi:'那'},{char:'ná',hanzi:'拿'},{char:'nǎ',hanzi:'哪'},{char:'nà',hanzi:'那'},
        {char:'nī',hanzi:'妮'},{char:'ní',hanzi:'泥'},{char:'nǐ',hanzi:'你'},{char:'nì',hanzi:'逆'},
        {char:'nú',hanzi:'奴'},{char:'nǔ',hanzi:'努'},{char:'nù',hanzi:'怒'},
        {char:'nǚ',hanzi:'女'},{char:'nǜ',hanzi:'衄'}
      ]},
      // === l 声母拼读 ===
      { name:'l 拼读练习', items:[
        {char:'lā',hanzi:'拉'},{char:'lá',hanzi:'喇'},{char:'lǎ',hanzi:'喇'},{char:'là',hanzi:'辣'},
        {char:'lè',hanzi:'乐'},
        {char:'lī',hanzi:'哩'},{char:'lí',hanzi:'离'},{char:'lǐ',hanzi:'里'},{char:'lì',hanzi:'力'},
        {char:'lū',hanzi:'噜'},{char:'lú',hanzi:'炉'},{char:'lǔ',hanzi:'鲁'},{char:'lù',hanzi:'路'},
        {char:'lǘ',hanzi:'驴'},{char:'lǚ',hanzi:'旅'},{char:'lǜ',hanzi:'绿'}
      ]},
      // === g 声母拼读 ===
      { name:'g 拼读练习', items:[
        {char:'gā',hanzi:'嘎'},{char:'gá',hanzi:'噶'},{char:'gǎ',hanzi:'嘎'},{char:'gà',hanzi:'尬'},
        {char:'gē',hanzi:'哥'},{char:'gé',hanzi:'格'},{char:'gě',hanzi:'葛'},{char:'gè',hanzi:'个'},
        {char:'gū',hanzi:'姑'},{char:'gú',hanzi:'骨'},{char:'gǔ',hanzi:'古'},{char:'gù',hanzi:'故'},
        {char:'guā',hanzi:'瓜'},{char:'guǎ',hanzi:'寡'},{char:'guà',hanzi:'挂'}
      ]},
      // === k 声母拼读 ===
      { name:'k 拼读练习', items:[
        {char:'kā',hanzi:'咖'},{char:'kǎ',hanzi:'卡'},
        {char:'kē',hanzi:'科'},{char:'ké',hanzi:'壳'},{char:'kě',hanzi:'可'},{char:'kè',hanzi:'课'},
        {char:'kū',hanzi:'哭'},{char:'kǔ',hanzi:'苦'},{char:'kù',hanzi:'裤'},
        {char:'kuā',hanzi:'夸'},{char:'kuǎ',hanzi:'垮'},{char:'kuà',hanzi:'跨'}
      ]},
      // === h 声母拼读 ===
      { name:'h 拼读练习', items:[
        {char:'hā',hanzi:'哈'},{char:'há',hanzi:'蛤'},{char:'hǎ',hanzi:'哈'},
        {char:'hē',hanzi:'喝'},{char:'hé',hanzi:'和'},{char:'hè',hanzi:'贺'},
        {char:'hū',hanzi:'呼'},{char:'hú',hanzi:'胡'},{char:'hǔ',hanzi:'虎'},{char:'hù',hanzi:'护'},
        {char:'huā',hanzi:'花'},{char:'huá',hanzi:'华'},{char:'huà',hanzi:'画'}
      ]},
      // === j 声母拼读 ===
      { name:'j 拼读练习', items:[
        {char:'jī',hanzi:'鸡'},{char:'jí',hanzi:'急'},{char:'jǐ',hanzi:'几'},{char:'jì',hanzi:'记'},
        {char:'jū',hanzi:'居'},{char:'jú',hanzi:'局'},{char:'jǔ',hanzi:'举'},{char:'jù',hanzi:'句'},
        {char:'jiā',hanzi:'家'},{char:'jiá',hanzi:'夹'},{char:'jiǎ',hanzi:'假'},{char:'jià',hanzi:'架'}
      ]},
      // === q 声母拼读 ===
      { name:'q 拼读练习', items:[
        {char:'qī',hanzi:'七'},{char:'qí',hanzi:'骑'},{char:'qǐ',hanzi:'起'},{char:'qì',hanzi:'气'},
        {char:'qū',hanzi:'区'},{char:'qú',hanzi:'渠'},{char:'qǔ',hanzi:'取'},{char:'qù',hanzi:'去'},
        {char:'qiā',hanzi:'掐'},{char:'qiǎ',hanzi:'卡'},{char:'qià',hanzi:'恰'}
      ]},
      // === x 声母拼读 ===
      { name:'x 拼读练习', items:[
        {char:'xī',hanzi:'西'},{char:'xí',hanzi:'习'},{char:'xǐ',hanzi:'洗'},{char:'xì',hanzi:'细'},
        {char:'xū',hanzi:'需'},{char:'xú',hanzi:'徐'},{char:'xǔ',hanzi:'许'},{char:'xù',hanzi:'续'},
        {char:'xiā',hanzi:'虾'},{char:'xiá',hanzi:'霞'},{char:'xià',hanzi:'下'}
      ]},
      // === zh 声母拼读 ===
      { name:'zh 拼读练习', items:[
        {char:'zhī',hanzi:'知'},{char:'zhí',hanzi:'直'},{char:'zhǐ',hanzi:'纸'},{char:'zhì',hanzi:'志'},
        {char:'zhū',hanzi:'猪'},{char:'zhú',hanzi:'竹'},{char:'zhǔ',hanzi:'主'},{char:'zhù',hanzi:'住'},
        {char:'zhā',hanzi:'扎'},{char:'zhá',hanzi:'闸'},{char:'zhǎ',hanzi:'眨'},{char:'zhà',hanzi:'炸'}
      ]},
      // === ch 声母拼读 ===
      { name:'ch 拼读练习', items:[
        {char:'chī',hanzi:'吃'},{char:'chí',hanzi:'迟'},{char:'chǐ',hanzi:'尺'},{char:'chì',hanzi:'翅'},
        {char:'chū',hanzi:'出'},{char:'chú',hanzi:'除'},{char:'chǔ',hanzi:'楚'},{char:'chù',hanzi:'处'},
        {char:'chā',hanzi:'插'},{char:'chá',hanzi:'茶'},{char:'chǎ',hanzi:'叉'},{char:'chà',hanzi:'差'}
      ]},
      // === sh 声母拼读 ===
      { name:'sh 拼读练习', items:[
        {char:'shī',hanzi:'师'},{char:'shí',hanzi:'十'},{char:'shǐ',hanzi:'始'},{char:'shì',hanzi:'是'},
        {char:'shū',hanzi:'书'},{char:'shú',hanzi:'熟'},{char:'shǔ',hanzi:'数'},{char:'shù',hanzi:'树'},
        {char:'shā',hanzi:'沙'},{char:'shá',hanzi:'啥'},{char:'shǎ',hanzi:'傻'},{char:'shà',hanzi:'厦'}
      ]},
      // === r 声母拼读 ===
      { name:'r 拼读练习', items:[
        {char:'rī',hanzi:'日'},{char:'rì',hanzi:'日'},
        {char:'rū',hanzi:'如'},{char:'rú',hanzi:'如'},{char:'rǔ',hanzi:'乳'},{char:'rù',hanzi:'入'},
        {char:'rè',hanzi:'热'},{char:'rě',hanzi:'惹'}
      ]},
      // === z 声母拼读 ===
      { name:'z 拼读练习', items:[
        {char:'zī',hanzi:'资'},{char:'zǐ',hanzi:'子'},{char:'zì',hanzi:'自'},
        {char:'zū',hanzi:'租'},{char:'zú',hanzi:'足'},{char:'zǔ',hanzi:'组'},
        {char:'zā',hanzi:'扎'},{char:'zá',hanzi:'杂'}
      ]},
      // === c 声母拼读 ===
      { name:'c 拼读练习', items:[
        {char:'cī',hanzi:'疵'},{char:'cí',hanzi:'词'},{char:'cǐ',hanzi:'此'},{char:'cì',hanzi:'次'},
        {char:'cū',hanzi:'粗'},{char:'cù',hanzi:'醋'},
        {char:'cā',hanzi:'擦'}
      ]},
      // === s 声母拼读 ===
      { name:'s 拼读练习', items:[
        {char:'sī',hanzi:'丝'},{char:'sǐ',hanzi:'死'},{char:'sì',hanzi:'四'},
        {char:'sū',hanzi:'苏'},{char:'sú',hanzi:'俗'},{char:'sù',hanzi:'速'},
        {char:'sā',hanzi:'撒'},{char:'sǎ',hanzi:'洒'}
      ]},
      // === y 声母拼读 ===
      { name:'y 拼读练习', items:[
        {char:'yī',hanzi:'一'},{char:'yí',hanzi:'姨'},{char:'yǐ',hanzi:'以'},{char:'yì',hanzi:'意'},
        {char:'yā',hanzi:'鸭'},{char:'yá',hanzi:'牙'},{char:'yǎ',hanzi:'雅'},{char:'yà',hanzi:'亚'},
        {char:'yē',hanzi:'耶'},{char:'yé',hanzi:'爷'},{char:'yě',hanzi:'也'},{char:'yè',hanzi:'夜'}
      ]},
      // === w 声母拼读 ===
      { name:'w 拼读练习', items:[
        {char:'wū',hanzi:'屋'},{char:'wú',hanzi:'无'},{char:'wǔ',hanzi:'五'},{char:'wù',hanzi:'物'},
        {char:'wā',hanzi:'挖'},{char:'wá',hanzi:'娃'},{char:'wǎ',hanzi:'瓦'},{char:'wà',hanzi:'袜'},
        {char:'wō',hanzi:'窝'},{char:'wǒ',hanzi:'我'},{char:'wò',hanzi:'握'}
      ]},
      // === 复韵母拼读 ===
      { name:'ai 拼读', items:[
        {char:'āi',hanzi:'哀'},{char:'ái',hanzi:'癌'},{char:'ǎi',hanzi:'矮'},{char:'ài',hanzi:'爱'},
        {char:'bāi',hanzi:'掰'},{char:'bái',hanzi:'白'},{char:'bǎi',hanzi:'百'},{char:'bài',hanzi:'败'}
      ]},
      { name:'ei 拼读', items:[
        {char:'ēi',hanzi:'诶'},{char:'éi',hanzi:'诶'},{char:'ěi',hanzi:'诶'},{char:'èi',hanzi:'诶'},
        {char:'bēi',hanzi:'杯'},{char:'běi',hanzi:'北'},{char:'bèi',hanzi:'被'}
      ]},
      { name:'ao 拼读', items:[
        {char:'āo',hanzi:'凹'},{char:'áo',hanzi:'熬'},{char:'ǎo',hanzi:'袄'},{char:'ào',hanzi:'奥'},
        {char:'bāo',hanzi:'包'},{char:'báo',hanzi:'薄'},{char:'bǎo',hanzi:'宝'},{char:'bào',hanzi:'报'}
      ]},
      { name:'ou 拼读', items:[
        {char:'ōu',hanzi:'欧'},{char:'ǒu',hanzi:'偶'},{char:'òu',hanzi:'沤'},
        {char:'dōu',hanzi:'都'},{char:'dǒu',hanzi:'斗'},{char:'dòu',hanzi:'豆'}
      ]},
      { name:'ie 拼读', items:[
        {char:'iē',hanzi:'耶'},{char:'ié',hanzi:'爷'},{char:'iě',hanzi:'也'},{char:'iè',hanzi:'夜'},
        {char:'tiē',hanzi:'贴'},{char:'tiě',hanzi:'铁'}
      ]},
      { name:'er 拼读', items:[
        {char:'ēr',hanzi:'儿'},{char:'ér',hanzi:'儿'},{char:'ěr',hanzi:'耳'},{char:'èr',hanzi:'二'}
      ]},
      // === 前鼻韵母拼读 ===
      { name:'an 拼读', items:[
        {char:'ān',hanzi:'安'},{char:'ǎn',hanzi:'俺'},{char:'àn',hanzi:'按'},
        {char:'bān',hanzi:'班'},{char:'bǎn',hanzi:'板'},{char:'bàn',hanzi:'半'}
      ]},
      { name:'en 拼读', items:[
        {char:'ēn',hanzi:'恩'},{char:'èn',hanzi:'摁'},
        {char:'bēn',hanzi:'奔'},{char:'běn',hanzi:'本'},{char:'bèn',hanzi:'笨'}
      ]},
      { name:'in 拼读', items:[
        {char:'īn',hanzi:'音'},{char:'ín',hanzi:'银'},{char:'ǐn',hanzi:'引'},{char:'ìn',hanzi:'印'}
      ]},
      // === 后鼻韵母拼读 ===
      { name:'ang 拼读', items:[
        {char:'āng',hanzi:'肮'},{char:'áng',hanzi:'昂'},{char:'àng',hanzi:'盎'},
        {char:'bāng',hanzi:'帮'},{char:'bǎng',hanzi:'绑'},{char:'bàng',hanzi:'棒'}
      ]},
      { name:'eng 拼读', items:[
        {char:'ēng',hanzi:'鞥'},{char:'éng',hanzi:'能'},{char:'ěng',hanzi:'冷'},{char:'èng',hanzi:'梦'}
      ]},
      { name:'ing 拼读', items:[
        {char:'īng',hanzi:'英'},{char:'íng',hanzi:'营'},{char:'ǐng',hanzi:'影'},{char:'ìng',hanzi:'硬'}
      ]},
      { name:'ong 拼读', items:[
        {char:'ōng',hanzi:'工'},{char:'óng',hanzi:'红'},{char:'ǒng',hanzi:'孔'},{char:'òng',hanzi:'送'}
      ]}
    ]
  }
};
