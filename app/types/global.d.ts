// Add YouTube IFrame API types
interface Window {
  YT: {
    Player: new (
      elementId: string,
      options: {
        videoId: string
        playerVars?: {
          autoplay?: number
          mute?: number
          controls?: number
          showinfo?: number
          rel?: number
          loop?: number
          playlist?: string
          modestbranding?: number
          iv_load_policy?: number
          enablejsapi?: number
        }
        events?: {
          onReady?: (event: { target: YT.Player }) => void
          onStateChange?: (event: { data: number; target: YT.Player }) => void
        }
      },
    ) => YT.Player
    PlayerState: {
      ENDED: number
      PLAYING: number
      PAUSED: number
      BUFFERING: number
      CUED: number
    }
  }
  onYouTubeIframeAPIReady: () => void
}

namespace YT {
  interface Player {
    playVideo: () => void
    pauseVideo: () => void
    mute: () => void
    unMute: () => void
    destroy: () => void
  }
}

