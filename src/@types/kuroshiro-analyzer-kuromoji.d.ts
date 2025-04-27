declare module "kuroshiro-analyzer-kuromoji" {
  import { AnalyzerInterface } from "kuroshiro";

  export interface KuromojiAnalyzerOptions {
    dictPath?: string;
  }

  export default class KuromojiAnalyzer implements AnalyzerInterface {
    constructor(options?: KuromojiAnalyzerOptions);
    init(): Promise<void>;
    tokenize(text: string): Promise<any>;
  }
}