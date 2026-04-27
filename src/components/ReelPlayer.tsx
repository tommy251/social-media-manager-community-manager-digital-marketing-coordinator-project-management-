import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type Props = {
  src: string;
  poster?: string;
  label: string;
  caption: string;
};

export function ReelPlayer({ src, poster, label, caption }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div className="group relative aspect-[9/16] rounded-2xl overflow-hidden glass">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{label}</div>
        <div className="mt-1 font-display text-lg leading-tight">{caption}</div>
      </div>
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 rounded-full glass hover:bg-white/15 transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={toggle}
          className="p-2 rounded-full glass hover:bg-white/15 transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
