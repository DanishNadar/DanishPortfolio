import { motion } from "framer-motion";

interface AnimatedAvatarPortraitProps {
  speaking?: boolean;
  listening?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const professionalHeadshot = "/danish_images/DN-Professional-Photo-Icon.png";

export function AnimatedAvatarPortrait({
  speaking = false,
  listening = false,
  size = "md",
  className = "",
}: AnimatedAvatarPortraitProps) {
  const dims = size === "lg" ? "h-[26rem] w-[26rem]" : size === "sm" ? "h-28 w-28" : "h-56 w-56";
  const status = speaking ? "Speaking" : listening ? "Listening" : "Ready";

  return (
    <div className={`relative ${dims} ${className}`}>
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-rb opacity-35 blur-2xl" />
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[2rem] glass ring-orb shadow-elevated"
        animate={speaking ? { y: [0, -2, 1, 0], scale: [1, 1.025, 1] } : { y: [0, -5, 0] }}
        transition={{ duration: speaking ? 0.55 : 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.img
          src={professionalHeadshot}
          alt="Danish Nadar professional headshot"
          className="h-full w-full object-cover object-center"
          animate={speaking ? { scale: [1.05, 1.09, 1.05] } : { scale: [1.03, 1.055, 1.03] }}
          transition={{ duration: speaking ? 0.45 : 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <div className="flex items-center justify-between rounded-full bg-background/65 px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md">
            <span className={speaking ? "text-secondary" : "text-accent"}>{status}</span>
            <span className="text-muted-foreground">AI guide</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
