module.exports = numgle;

function numgle(text) {
  const result = convertStringToNumgle(text);

  return result;
}

const data = {
  "cho": ["J", "ᖵ", "r", "n", "Д", "ru", "ㅁ", "ㄸ", "뚠", ">", "ᕒ", "ㅇ", "Ʞ", "ᕒ|", "Ʞ-", "ㅚ", "m", "ㅒ", "아"],
  "jong": ["", "J", "ᖵ", "⋝'", "r", "5ı", "δ˫", "n", "ru", "「늬", "「님", "ꈉ'", "⪞", "ꉱ", "", "ꂚ˫", "ㅁ", "ㄸ", "⪚", ">", "ᕒ", "ㅇ", "Ʞ", "Ʞ-", "ㅚ", "m", "ㅒ", "아"],
  "jung": ["ㅏ", "ᅷ", "左", "上", "ㅑ", "ㅓ", "ᅺ", "곤", "ᅼ", "ㅕ", "l", "⊥"],
  "cj": [
    ["ᆗ", "ᅾ", "F", "宁", "早", "「뉘", "무", "뚜", "투", "⪲", "寻", "우", "쉬", "퀴", "쉬-", "ᆗ┘", "쑤", "부", "위-"],
    ["≚", "", "도", "모", "圼", "ꄹ", "문", "뚠", "툰", "㒰", "쿤", "운", "쉰", "퀸", "쉰-", "ꁈ", "쑨", "분", "윈-"],
    ["", "", "斤", "「규", "l큐", "「뉴|", "뮤", "뜌", "튜", "슈", "", "유", "슈|", "큐|", "슈|-", "=뉴l", "쓔", "뷰", "유|-"],
    ["", "", "됴", "묘", "昱", "「뉸l", "뮨", "뜐", "튠", "슌", "", "윤", "슌|", "큔|", "슌|-", "=뉸l", "쓘", "뷴", "윤|-"],
    ["ᖵ", "ᅽ", "「工", "「고", "l코", "ꌰ", "모", "또", "토", "소", "", "오", "쇠", "쾨", "솨", "=뇌", "쏘", "보", "와"],
    ["≚", "", "뜨", "「곤", "l콘", "ꄹ", "몬", "똔", "톤", "손", "", "온", "쇤", "쾬", "솬", "ꁈ", "쏜", "본", "완"],
    ["", "", "「立", "「교", "l쿄", "「뇨|", "묘", "뚀", "툐", "쇼", "", "요", "쇼|", "쿄|", "쇼|-", "=뇨l", "쑈", "뵤", "요|-"],
    ["", "", "「프", "「굔", "l쿈", "「뇬|", "묜", "뚄", "툔", "숀", "", "욘", "숀|", "쿈|", "숀|-", "=뇬l", "쑌", "뵨", "욘|-"],
    ["⇲", "", "ㄷ", "「그", "日", "Ṉ", "므", "뜨", "트", "≥", "", "으", "≥|", "킈", "≥|-", "=늬", "쓰", "브", "의-"]
  ],
  "han": ["J", "ᖵ", "⋝'", "r", "5ı", "δ˫", "n", "Д", "ru", "「늬", "「님", "ꈉ'", "⪞", "ꉱ", "", "ꂚ˫", "ㅁ", "ㄸ", "뚠", "⪚", ">", "ᕒ", "ㅇ", "ꓘ", "ᕒ|", "ꓘ-", "ㅚ", "m", "ㅒ", "아", "ㅜ", "工", "ㅠ", "ㅍ", "ㅗ", "〧", "ㅛ", "", "ㅏ", "ᅷ", "左", "上", "ㅑ", "ㅓ", "ᅺ", "", "ᅼ", "ㅕ", "l", "⊥", "ㅡ"],
  "englishUpper": ["ᗆ", "ϖ", "∩", "ᗜ", "m", "ㄲ", "ᘏ", "工", "ㅡ", "(__", "ㅈ", "┌-", "ᕒ", "Z", "O", "‾ᗜ", ",O", "7ᗜ", "∽", "-ㅓ", "⊂", "<", "ε", "X", "-<", "N"],
  "englishLower": ["ჹ", "ᓂ", "ᴒ", "ᓇ", "ര", "Ⴕ", "ڡ", "ፓ", "-·", "ㄴ.", "ㅈ", "ㅡ", "ᴟ", "ᴝ", "o", "ᓀ", "ᓄ", "ㄱ", "ᔥ", "-+", "ㄷ", "<", "ꗨ", "x", "ﻋ", "ᴺ"],
  "number": ["o", "ㅡ", "ru", "ω", "-F", "UT", "0‾‾", "__|", "∞", "__0"],
  "special": ["·-J", "·ㅡ", ".", ">", "ㅣ"],
  "range": {
    "completeHangul": {
      "start": 44032,
      "end": 55203
    },
    "notCompleteHangul": {
      "start": 12593,
      "end": 12643
    },
    "uppercase": {
      "start": 65,
      "end": 90
    },
    "lowercase": {
      "start": 97,
      "end": 122
    },
    "number": {
      "start": 48,
      "end": 57
    },
    "special": [63, 33, 46, 94, 45]
  }
}

const LETTER_TYPE = {
  empty: 1,
  completeHangul: 2,
  notCompleteHangul: 3,
  englishUpper: 4,
  englishLower: 5,
  number: 6,
  specialLetter: 7,
  unknown: 8
}

function convertStringToNumgle(input) {
  if (input.length === 0) return '';

  const arr = [];

  for (let i = 0; i < input.length; i++) {
    arr[i] = convertCharToNumgle(input[i]);
  }

  const output = arr.join(' ');

  return output;
}

function convertCharToNumgle(input) {
  const i = input.charCodeAt(0);
  const letterType = getLetterType(i);
  let start;
  let result;

  switch (letterType) {
    case LETTER_TYPE.empty:
      result = '';
      break;
    
    case LETTER_TYPE.completeHangul:
      result = completeHangul(i);
      break;

    case LETTER_TYPE.notCompleteHangul:
      start = data.range.notCompleteHangul.start;
      result = data.han[i - start];
      break;

    case LETTER_TYPE.englishUpper:
      start = data.range.uppercase.start;
      result = data.englishUpper[i - start];
      break;

    case LETTER_TYPE.englishLower:
      start = data.range.lowercase.start;
      result = data.englishLower[i - start];
      break;

    case LETTER_TYPE.number:
      start = data.range.number.start;
      result = data.number[i - start];
      break;

    case LETTER_TYPE.specialLetter:
      result = data.special[data.range.special.indexOf(i)];
      break;

    case LETTER_TYPE.unknown:
      break;
    
    default:
      console.log('There is a letter not converted.');
  }

  return result;
}

// will be called at case LETTER_TYPE.completeHangul
function completeHangul(input) {
  const separatedHan = separateHan(input);
  
  if (!isInData(separatedHan.cho, separatedHan.jung, separatedHan.jong)) {
    console.log('There is a letter not converted.');
    return '';
  }

  if (separatedHan.jung >= 8 && separatedHan.jung !== 20) {
    return data.jong[separatedHan.jong] + data.jung[separatedHan.jung - 8] + data.cho[separatedHan.cho];
  }

  return data.jong[separatedHan.jong] + data.cj[Math.min(8, separatedHan.jung)][separatedHan.cho];
}

function separateHan(han) {
  const obj = {
    cho: Math.floor((han - 44032) / 28 / 21),
    jung: Math.floor((han - 44032) / 28 % 21),
    jong: Math.floor((han - 44032) % 28)
  }

  return obj;
}

function isInData(cho_num, jung_num, jong_num) {
  if (jong_num !== 0 && data.jong[jong_num] === '') return false;
  if (jung_num >= 8 && jung_num != 20) return data.jung[jung_num - 8] !== '';
  else return data.cj[Math.min(8, jung_num), cho_num] !== '';
}

function getLetterType(code) {
  const dr = data.range;

  if (code === '' || code === '\r' || code === '\n') return LETTER_TYPE.empty;
  else if (code >= dr.completeHangul.start && code <= dr.completeHangul.end) return LETTER_TYPE.completeHangul;
  else if (code >= dr.notCompleteHangul.start && code <= dr.notCompleteHangul.end) return LETTER_TYPE.notCompleteHangul;
  else if (code >= dr.uppercase.start && code <= dr.uppercase.end) return LETTER_TYPE.englishUpper;
  else if (code >= dr.lowercase.start && code <= dr.lowercase.end) return LETTER_TYPE.englishLower;
  else if (code >= dr.number.start && code <= dr.number.end) return LETTER_TYPE.number;
  else if (dr.special.indexOf(code)) return LETTER_TYPE.specialLetter;
  else return LETTER_TYPE.unknown;
}