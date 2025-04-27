declare module "kuroshiro" {
    export interface AnalyzerInterface {
      init(): Promise<void>;
      tokenize(text: string): Promise<string[]>;
    }
  
    export default class Kuroshiro {
      constructor();
      init(analyzer: AnalyzerInterface): Promise<void>;
      convert(text: string, options: { to: "hiragana" | "katakana" | "romaji" }): Promise<string>;
    }
  }
  