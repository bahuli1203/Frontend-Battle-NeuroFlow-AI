"use client";

import React, { useEffect, useRef, useState } from "react";

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const typedKeys = useRef<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Append key to buffer
      typedKeys.current += e.key.toLowerCase();
      
      // Keep only last 15 chars to avoid overflow
      if (typedKeys.current.length > 15) {
        typedKeys.current = typedKeys.current.slice(-15);
      }

      // Check codes
      if (typedKeys.current.includes("iddqd") || typedKeys.current.includes("matrix")) {
        setIsActive((prev) => !prev);
        typedKeys.current = ""; // Reset
      }

      // Escape key exits matrix mode
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 16;
    const columns = width / fontSize;

    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // randomize start heights offscreen
    }

    const draw = () => {
      ctx.fillStyle = "rgba(23, 43, 54, 0.08)"; // space background with trails (Oceanic Noir)
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#FFC801"; // Forsythia theme color
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      // Draw Center HUD Panel
      ctx.fillStyle = "rgba(17, 76, 90, 0.85)"; // Nocturnal Expedition
      ctx.strokeStyle = "#FFC801";
      ctx.lineWidth = 2;
      const boxWidth = 500;
      const boxHeight = 160;
      const boxX = (width - boxWidth) / 2;
      const boxY = (height - boxHeight) / 2;
      
      // Glass box
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

      // HUD Text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("NEUROFLOW CORE OVERRIDE", width / 2, height / 2 - 20);

      ctx.fillStyle = "#FFC801";
      ctx.font = "13px monospace";
      ctx.fillText("STATUS: GRAVITY SHIELD BYPASSED [IDDQD ACTIVE]", width / 2, height / 2 + 15);
      
      ctx.fillStyle = "#94A3B8";
      ctx.font = "11px sans-serif";
      ctx.fillText("Press ESC to restore system parameters", width / 2, height / 2 + 45);
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#172B36] overflow-hidden select-none cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
