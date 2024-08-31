export type buttonsType = "pause30" | "pause45" | "pause60" | "pause5"

export interface Message {
  startPauseTimer?: number
  clearPausing?: boolean
  excludeHost?: string
}

export interface StoredConfig {
  activePause?: buttonsType
  excludeHost?: string
}
console.log("Hello from common.ts")
