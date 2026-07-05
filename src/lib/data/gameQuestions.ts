import type { EmojiPuzzle, QuizQuestion } from "@/types/games-play";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: "q1",  category: "anime",     difficulty: 1, question: "من هو مؤلف مانجا ناروتو؟", choices: ["ماساشي كيشيموتو","إييتشيرو أودا","تيتي كوبو","هيرومو أراكاوا"], answer: 0 },
  { id: "q2",  category: "anime",     difficulty: 1, question: "ما اسم قرية ناروتو؟", choices: ["السحاب","الصخر","الورق (كونوها)","الرمل"], answer: 2 },
  { id: "q3",  category: "character", difficulty: 2, question: "من هو قائد الفرقة 13 في Bleach؟", choices: ["كيوراكو","أوكيتاكي جوشيرو","يامامتو","بياكويا"], answer: 1 },
  { id: "q4",  category: "anime",     difficulty: 1, question: "من هو قبطان قراصنة قبعة القش؟", choices: ["زورو","سانجي","لوفي","إيس"], answer: 2 },
  { id: "q5",  category: "manga",     difficulty: 2, question: "من رسم مانجا Attack on Titan؟", choices: ["هاجيمي إيساياما","كينتارو ميورا","تسوجيتومو","إيشيدا"], answer: 0 },
  { id: "q6",  category: "studio",    difficulty: 2, question: "أي استوديو أنتج Demon Slayer؟", choices: ["Mappa","Ufotable","Bones","Madhouse"], answer: 1 },
  { id: "q7",  category: "studio",    difficulty: 2, question: "أي استوديو أنتج Jujutsu Kaisen؟", choices: ["Mappa","A-1","Wit","Trigger"], answer: 0 },
  { id: "q8",  category: "opening",   difficulty: 3, question: "أغنية 'Guren no Yumiya' من أي أنمي؟", choices: ["Bleach","Attack on Titan","Naruto","Fairy Tail"], answer: 1 },
  { id: "q9",  category: "character", difficulty: 1, question: "من هو صديق ديكو المقرب في My Hero Academia؟", choices: ["باكوغو","كيريشيما","توداروكي","إييدا"], answer: 0 },
  { id: "q10", category: "anime",     difficulty: 1, question: "ما اسم القط الأزرق في Fairy Tail؟", choices: ["هابي","بلو","تشوبر","كيروبي"], answer: 0 },
  { id: "q11", category: "manga",     difficulty: 2, question: "ما عدد أفراد Akatsuki الأصليين؟", choices: ["7","9","10","12"], answer: 1 },
  { id: "q12", category: "character", difficulty: 2, question: "من هو معلم غوتشي إيتادوري؟", choices: ["ناناميي","غوجو ساتورو","ميغومي","تودو"], answer: 1 },
  { id: "q13", category: "anime",     difficulty: 3, question: "من كتب Death Note؟", choices: ["تسوجومي أوبا","تاكيشي أوباتا","إيتشيرو أودا","ياسوهيسا هارا"], answer: 0 },
  { id: "q14", category: "studio",    difficulty: 3, question: "استوديو Ghibli أسسه:", choices: ["ميازاكي فقط","تاكاهاتا فقط","ميازاكي وتاكاهاتا وسوزوكي","أنو هيديكاي"], answer: 2 },
  { id: "q15", category: "anime",     difficulty: 1, question: "بطل One Punch Man هو:", choices: ["سايتاما","جينوس","كينغ","بانغ"], answer: 0 },
  { id: "q16", category: "character", difficulty: 2, question: "ستاند Jotaro اسمه:", choices: ["Star Platinum","The World","Crazy Diamond","Gold Experience"], answer: 0 },
  { id: "q17", category: "anime",     difficulty: 2, question: "ما اسم سيف تانجيرو الأول؟", choices: ["نيتشيرين أسود","نيتشيرين أحمر","كاتانا فضية","سيف الرعد"], answer: 0 },
  { id: "q18", category: "manga",     difficulty: 3, question: "أطول مانجا مستمرة حالياً هي:", choices: ["ون بيس","كوتشيكامي","غولغو 13","دراغون بول"], answer: 2 },
  { id: "q19", category: "opening",   difficulty: 2, question: "أغنية 'Unravel' من أنمي:", choices: ["Psycho-Pass","Tokyo Ghoul","Death Parade","Steins;Gate"], answer: 1 },
  { id: "q20", category: "character", difficulty: 1, question: "بطلة Sailor Moon اسمها الحقيقي:", choices: ["أوسائي","ريي","أمي","ماكوتو"], answer: 0 },
];

export const EMOJI_PUZZLES: EmojiPuzzle[] = [
  { emojis: "🍥🍜🦊", answer: "ناروتو", hint: "قرية الورق", difficulty: 1 },
  { emojis: "☠️🏴‍☠️👒", answer: "ون بيس", hint: "قبعة القش", difficulty: 1 },
  { emojis: "⚔️🌸👹", answer: "قاتل الشياطين", hint: "تانجيرو", difficulty: 1 },
  { emojis: "👁️👁️🩸", answer: "توكيو غول", hint: "كاجوني", difficulty: 2 },
  { emojis: "🧙⚡🎓", answer: "جوجوتسو كايسن", hint: "لعنات", difficulty: 2 },
  { emojis: "👊👨‍🦲", answer: "ون بانش مان", hint: "بطل الصلعة", difficulty: 1 },
  { emojis: "🧪⏰📱", answer: "شتاينز غيت", hint: "سفر عبر الزمن", difficulty: 3 },
  { emojis: "📓💀✏️", answer: "مذكرة الموت", hint: "لايت وإل", difficulty: 1 },
  { emojis: "🗡️🏰🐴", answer: "هجوم العمالقة", hint: "الجدران الثلاثة", difficulty: 2 },
  { emojis: "🏀👦", answer: "كوروكو نو باسكت", hint: "الظل السادس", difficulty: 2 },
  { emojis: "⚽👦🔥", answer: "بلو لوك", hint: "أنانية", difficulty: 2 },
  { emojis: "🧑‍🍳⚔️", answer: "توريكو", hint: "طعام أسطوري", difficulty: 3 },
];

export const WORD_BANK = [
  "ناروتو","لوفي","ساسكي","إيتاتشي","غوجو","إيتادوري","تانجيرو","نيزوكو",
  "ليفاي","إيرين","ميكاسا","لايت","ريوك","سايتاما","جينوس","إدوارد",
  "ألفونس","أشيتاكا","تشيهيرو","توتورو",
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
