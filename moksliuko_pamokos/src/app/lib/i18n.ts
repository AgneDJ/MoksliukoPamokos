export type Lang = "lt" | "en";

export const strings = {
  lt: {
    appName: "Mokykimės",
    nav: { lessons: "Pamokos", rewards: "Apdovanojimai", home: "Pradžia" },
    home: {
      title: "Sveikas atvykęs",
      subtitle: "Pasirink ką nori daryti",
      progress: "Pažanga",
      completed: "Atliktos pamokos",
    },
    lessons: { title: "Pamokos", done: "Atlikta", start: "Pradėti" },
    lesson: {
      taskTitle: "Užduotis",
      check: "Tikrinti",
      correct: "Teisingai",
      wrong: "Pabandyk dar kartą",
      complete: "Užbaigti pamoką",
      pick: "Pasirink atsakymą",
    },
    rewards: {
      title: "Tavo lipdukai",
      empty: "Dar neturi lipdukų. Atlik pamoką ir gausi pirmą",
      earned: "Gauti lipdukai",
    },
    stickers: { star: "Žvaigždutė", rocket: "Raketa", heart: "Širdelė", owl: "Pelėda" },
  },
  en: {
    appName: "Learn",
    nav: { lessons: "Lessons", rewards: "Rewards", home: "Home" },
    home: { title: "Welcome", subtitle: "Pick what to do", progress: "Progress", completed: "Completed lessons" },
    lessons: { title: "Lessons", done: "Done", start: "Start" },
    lesson: { taskTitle: "Task", check: "Check", correct: "Correct", wrong: "Try again", complete: "Finish lesson", pick: "Pick an answer" },
    rewards: { title: "Your stickers", empty: "No stickers yet. Complete a lesson to earn one", earned: "Earned stickers" },
    stickers: { star: "Star", rocket: "Rocket", heart: "Heart", owl: "Owl" },
  },
} as const;

export function t(lang: Lang, keyPath: string): string {
  const parts = keyPath.split(".");
  let cur: any = strings[lang];
  for (const p of parts) cur = cur?.[p];
  return typeof cur === "string" ? cur : keyPath;
}
