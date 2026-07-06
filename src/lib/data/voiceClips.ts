// Voice guess clips — the browser TTS reads a distorted/hint phrase
// and the player guesses the anime/character.
export interface VoiceClip {
  id: string;
  say: string;           // what TTS speaks (Japanese/English hint)
  answer: string;        // Arabic answer
  aliases?: string[];    // acceptable variants
  hint?: string;
  lang?: string;         // BCP-47 for SpeechSynthesis
}

export const VOICE_CLIPS: VoiceClip[] = [
  { id: "v1", say: "Dattebayo!",                 answer: "ناروتو",          aliases: ["naruto"],       hint: "قرية الورق",   lang: "en-US" },
  { id: "v2", say: "I'm gonna be King of the Pirates!", answer: "ون بيس",   aliases: ["one piece","لوفي"], hint: "قبعة القش",  lang: "en-US" },
  { id: "v3", say: "Total concentration breathing!", answer: "قاتل الشياطين", aliases: ["demon slayer","تانجيرو"], hint: "سيف نيتشيرين", lang: "en-US" },
  { id: "v4", say: "Plus Ultra!",                answer: "بطلي الأكاديمي",   aliases: ["my hero","ديكو"], hint: "أول مايت",  lang: "en-US" },
  { id: "v5", say: "Domain Expansion!",          answer: "جوجوتسو كايسن",   aliases: ["jujutsu","غوجو"], hint: "لعنات",     lang: "en-US" },
  { id: "v6", say: "Ora ora ora ora!",           answer: "جوجو",             aliases: ["jojo","jotaro"], hint: "ستاند",     lang: "en-US" },
  { id: "v7", say: "Just according to keikaku",  answer: "مذكرة الموت",     aliases: ["death note","لايت"], hint: "الشينيغامي", lang: "en-US" },
  { id: "v8", say: "Nani?!",                     answer: "قبضة النجم الشمالي", aliases: ["hokuto","kenshiro"], hint: "أنت متّ بالفعل", lang: "en-US" },
  { id: "v9", say: "Believe in the me that believes in you", answer: "غورين لاغان", aliases: ["gurren","كامينا"], hint: "المثقاب السماوي", lang: "en-US" },
  { id: "v10", say: "El Psy Kongroo",            answer: "شتاينز غيت",      aliases: ["steins gate","أوكابي"], hint: "سفر عبر الزمن", lang: "en-US" },
];
