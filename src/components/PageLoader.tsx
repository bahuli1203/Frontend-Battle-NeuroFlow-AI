"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function PageLoader() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Word assembly simulation
    const fullText = "NEUROFLOW AI";
    let textInterval = setInterval(() => {
      setText((prev) => {
        if (prev.length < fullText.length) {
          return fullText.slice(0, prev.length + 1);
        }
        clearInterval(textInterval);
        return prev;
      });
    }, 120);

    // 2. Progress bar simulation
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 5;
        }
        clearInterval(progressInterval);
        return 100;
      });
    }, 70);

    // 3. Fade out triggers
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    const removeTimeout = setTimeout(() => {
      setIsRendered(false);
    }, 2200);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  // 4. Three.js 3D core setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = 180;
    const height = 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Glowing Inner Core Geometry
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7B61FF, // Quantum Purple
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Outer Shell Geometry
    const shellGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x00D4FF, // Cyber Blue
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shell);

    // Orbiting particle points
    const particleCount = 30;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * 1.7;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      particlePositions[i * 3 + 2] = Math.sin(angle) * 1.7;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00FFB2, // Emerald green
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x7B61FF, 1.5, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Spin geometries at different rates
      core.rotation.y += 0.03;
      core.rotation.x += 0.015;

      shell.rotation.y -= 0.015;
      shell.rotation.z += 0.01;

      // Pulsing scale for core
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.08;
      core.scale.set(pulse, pulse, pulse);

      particles.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background glow highlights */}
      <div className="absolute w-[45vw] h-[45vw] rounded-full bg-[#7B61FF]/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-xs w-full px-6">
        {/* Interactive 3D Loader Canvas */}
        <div className="w-[180px] h-[180px] flex items-center justify-center relative">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Subtle logo inside 3D core wireframe bounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-heading font-extrabold tracking-widest text-[#00D4FF] animate-pulse">
            CORE
          </div>
        </div>

        {/* Word Header */}
        <h1 className="font-heading font-extrabold text-2xl tracking-widest text-white text-center h-8">
          {text}
          <span className="w-1.5 h-5 bg-[#00FFB2] inline-block ml-1 animate-pulse" />
        </h1>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#7B61FF] via-[#00D4FF] to-[#00FFB2] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] text-muted font-mono">
            <span>COGNITIVE CORE SYNC</span>
            <span className="text-[#00FFB2]">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
