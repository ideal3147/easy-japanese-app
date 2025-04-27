"use server";

import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

let kuroshiro: InstanceType<typeof Kuroshiro> | null = null;

export async function initKuroshiro() {
  if (!kuroshiro) {
    kuroshiro = new Kuroshiro();
    await kuroshiro.init(new KuromojiAnalyzer({
      dictPath: "/app/node_modules/kuromoji/dict/",
  }));
  }
}

export async function convertToHiragana(text: string): Promise<string> {
  if (!kuroshiro) {
    await initKuroshiro();
  }
  return await kuroshiro!.convert(text, { to: "hiragana" });
}