import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Sequence, Audio, staticFile } from "remotion";
import { Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const COLORS = {
  background: "#000B14",
  accent: "#FFB700",
  text: "#F7F7F7",
  textSecondary: "#C2C2C2",
};

const STEPS = [
  { icon: "💬", label: "Prompt" },
  { icon: "🤖", label: "Claude Code" },
  { icon: "⚛️", label: "Kod React" },
  { icon: "👀", label: "Podgląd" },
  { icon: "🎬", label: "MP4" },
];

const springProgress = (frame: number, startFrame: number, duration: number) => {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { easing: Easing.bezier(0.34, 1.56, 0.64, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = springProgress(frame, 0, 30);

  const y = interpolate(progress, [0, 1], [100, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const glow = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.8, 0.3],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          fontFamily,
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          margin: 0,
          transform: `translateY(${y}px)`,
          opacity,
          textShadow: `0 0 ${30 * glow}px ${COLORS.accent}`,
        }}
      >
        Od promptu do wideo w 5 minut
      </h1>
      <p
        style={{
          fontFamily,
          fontSize: 32,
          color: COLORS.textSecondary,
          marginTop: 20,
          opacity,
        }}
      >
        Claude Code + Remotion
      </p>
    </AbsoluteFill>
  );
};

const FlowStep: React.FC<{ step: number; icon: string; label: string; isActive: boolean }> = ({
  step,
  icon,
  label,
  isActive,
}) => {
  const frame = useCurrentFrame();

  const start = step * 20;
  const appear = springProgress(frame, start, 20);

  const scale = interpolate(appear, [0, 1], [0.8, 1]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${scale})`,
        opacity,
        width: 140,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 12,
          border: `2px solid ${isActive ? COLORS.accent : "rgba(255,183,0,0.4)"}`,
          backgroundColor: isActive ? COLORS.accent : "rgba(255,183,0,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: 700,
          color: isActive ? COLORS.accent : COLORS.text,
          marginTop: 12,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const FlowDiagram: React.FC = () => {
  const frame = useCurrentFrame();

  const activeStep = Math.min(4, Math.floor((frame - 60) / 20));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 20 }}>
        {STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <FlowStep step={i} icon={step.icon} label={step.label} isActive={i === activeStep} />
            {i < 4 && (
              <div
                style={{
                  fontSize: 24,
                  color: activeStep > i ? COLORS.accent : "rgba(255,183,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FadeOutText: React.FC = () => {
  const frame = useCurrentFrame();

  const start = 160;
  const fade = interpolate(frame, [start, start + 20], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <h2
        style={{
          fontFamily,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
          opacity: fade,
        }}
      >
        Żadnego After Effects.
      </h2>
    </AbsoluteFill>
  );
};

const SoundEffects: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("ding.wav")} volume={1} />
      <Audio src={staticFile("ding.wav")} volume={0.8} startFrom={30} />
      <Audio src={staticFile("ding.wav")} volume={0.8} startFrom={60} />
      <Audio src={staticFile("ding.wav")} volume={0.8} startFrom={90} />
      <Audio src={staticFile("ding.wav")} volume={0.8} startFrom={120} />
      <Audio src={staticFile("ding.wav")} volume={0.8} startFrom={150} />
    </>
  );
};

export const ExplainerDemo: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background }}>
      <SoundEffects />
      <Sequence durationInFrames={60}>
        <Title />
      </Sequence>
      <Sequence from={60} durationInFrames={100}>
        <FlowDiagram />
      </Sequence>
      <Sequence from={160} durationInFrames={20}>
        <FadeOutText />
      </Sequence>
    </div>
  );
};