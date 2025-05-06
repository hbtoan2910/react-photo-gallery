import "video.js";

declare module "video.js" {
  interface VideoJsPlayer {
    seekButtons(options: {
      forward?: number;
      back?: number;
      forwardTip?: string;
      backTip?: string;
      forwardContent?: string;
      backContent?: string;
    }): void;
  }
}
