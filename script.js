const defaultQuizzes = [
  {
    question: "江戸時代の初期、京都を中心に出版された啓蒙的色彩の強い通俗文学を総称してなんと呼ぶか？",
    answer: "仮名草子",
    choices: ["仮名草子", "浮世草子", "読本", "八文字屋本"]
  },
  {
    question: "仮名草子の最大の作者であり、最も早い職業作家の一人と言われるのは誰か？",
    answer: "浅井了意",
    choices: ["井原西鶴", "浅井了意", "山東京伝", "曲亭馬琴"]
  },
  {
    question: "浅井了意の代表作で、浮世房という主人公の遍歴を描いた作品は何か？",
    answer: "浮世物語",
    choices: ["浮世物語", "伽婢子", "雨月物語", "春雨物語"]
  },
  {
    question: "浅井了意が中国の剪灯新話などを翻案した怪異小説集は何か？",
    answer: "伽婢子",
    choices: ["伽婢子", "英草紙", "椿説弓張月", "西鶴諸国咄"]
  },
  { question: "天和2年から約百年間、上方中心の現実主義的傾向の濃い作品を総称してなんと呼ぶか？", answer: "浮世草子" },
  { question: "談林派の代表的俳諧師から浮世草子最大の作者になったのは誰か？", answer: "井原西鶴" },
  { question: "井原西鶴の好色物の代表作で、この文学形式の第一作とされる作品は何か？", answer: "好色一代男" },
  { question: "井原西鶴の雑話物の代表作で、諸国の珍しい話三十五を集めた作品は何か？", answer: "西鶴諸国咄" },
  { question: "井原西鶴の武家物の代表作で、敵討ちの詳しい経過を描いた作品は何か？", answer: "武道伝来記" },
  { question: "井原西鶴の町人物の代表作で、大晦日に必死でやりくりする町人の姿の悲喜劇を描いた作品は何か？", answer: "世間胸算用" },
  { question: "井原西鶴の没後、京都のある出版社から出た娯楽小説が栄えたが、それを総称してなんと呼ぶか？", answer: "八文字屋本" },
  { question: "八文字屋本の中で、江島其磧のかいた気質物の代表作は何か？", answer: "世間子息きしつ" },
  { question: "都賀庭鐘が中国の白話小説を翻案した作品は何か？", answer: "英草紙" },
  { question: "国学者、歌人でもあった前期（上方）読本最大の作者は誰か？", answer: "上田秋成" },
  { question: "上田秋成の前期読本中の傑作で、菊花の約など九篇の怪異小説からなる中・短編集は何か？", answer: "雨月物語" },
  { question: "上田秋成の晩年の傑作で、史実や古典に基づいて書かれた作品は何か？", answer: "春雨物語" },
  { question: "昔話稲妻表紙などで後期読本の基礎を気づいたのは誰か？", answer: "山東京伝" },
  { question: "山東京伝の弟子で後期（江戸）読本最大の作者は誰か？", answer: "曲亭馬琴" },
  { question: "曲亭馬琴による伊豆大島に流された源為朝を描いた作品は何か？", answer: "椿説弓張月" },
  { question: "曲亭馬琴が水滸伝の構想によりながら勧善懲悪、因果応報思想で貫いた長編小説は何か？", answer: "南総里見八犬伝" }
];

function loadQuizzes() {
  const saved = localStorage.getItem('quizzes');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [...defaultQuizzes];
    }
  }
  return [...defaultQuizzes];
}

function saveQuizzes(quizzes) {
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
}

let quizzes = loadQuizzes();
let current = 0;

const questionDiv = document.getElementById('question');
const choicesDiv = document.createElement('div');
choicesDiv.id = 'choices';
questionDiv.after(choicesDiv);

const answerInput = document.getElementById('answer-input');
if (answerInput) answerInput.style.display = 'none'; // 非表示
const submitBtn = document.getElementById('submit-answer');
if (submitBtn) submitBtn.style.display = 'none'; // 非表示

const resultDiv = document.getElementById('result');
const nextBtn = document.getElementById('next-question');
const newQ = document.getElementById('new-question');
const newA = document.getElementById('new-answer');
const addBtn = document.getElementById('add-quiz');
const addResult = document.getElementById('add-result');

function shuffle(arr) {
  return arr.map(v => [v, Math.random()]).sort((a, b) => a[1] - b[1]).map(v => v[0]);
}

function showQuestion() {
  if (quizzes.length === 0) {
    questionDiv.textContent = "クイズがありません。追加してください。";
    choicesDiv.innerHTML = "";
    nextBtn.disabled = true;
    return;
  }
  const quiz = quizzes[current];
  questionDiv.textContent = quiz.question;
  resultDiv.textContent = '';
  resultDiv.style.color = "#333";
  nextBtn.disabled = true;

  // 選択肢を表示
  choicesDiv.innerHTML = '';
  let choices = quiz.choices ? [...quiz.choices] : [quiz.answer];
  // 追加クイズの場合、choicesがなければダミーを生成
  if (choices.length < 4) {
    // 他の答えからランダムに追加
    const pool = quizzes.map(q => q.answer).filter(a => a !== quiz.answer);
    while (choices.length < 4 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      choices.push(pool.splice(idx, 1)[0]);
    }
    // まだ足りなければダミー
    while (choices.length < 4) choices.push("ダミー");
  }
  choices = shuffle(choices);

  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = function() {
      if (choice === quiz.answer) {
        resultDiv.textContent = "正解！";
        resultDiv.style.color = "#2a8c2a";
      } else {
        resultDiv.textContent = `不正解。正解は「${quiz.answer}」`;
        resultDiv.style.color = "#c00";
      }
      // 全ボタン無効化
      Array.from(choicesDiv.children).forEach(b => b.disabled = true);
      nextBtn.disabled = false;
    };
    choicesDiv.appendChild(btn);
  });
}

nextBtn.onclick = function() {
  current = (current + 1) % quizzes.length;
  showQuestion();
};

addBtn.onclick = function() {
  const q = newQ.value.trim();
  const a = newA.value.trim();
  if (!q || !a) {
    addResult.textContent = "問題文と答えを両方入力してください。";
    addResult.style.color = "#c00";
    return;
  }
  // 追加時はchoicesを自動生成
  let pool = quizzes.map(qz => qz.answer).filter(ans => ans !== a);
  let choices = [a];
  while (choices.length < 4 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    choices.push(pool.splice(idx, 1)[0]);
  }
  while (choices.length < 4) choices.push("ダミー");
  choices = shuffle(choices);

  quizzes.push({ question: q, answer: a, choices });
  saveQuizzes(quizzes);
  addResult.textContent = "クイズを追加しました！";
  addResult.style.color = "#2a8c2a";
  newQ.value = '';
  newA.value = '';
  if (quizzes.length === 1) {
    current = 0;
    showQuestion();
  }
};

window.onload = function() {
  showQuestion();
};