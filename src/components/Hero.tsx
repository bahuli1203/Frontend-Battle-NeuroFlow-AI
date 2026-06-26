"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { themeHex, themeColorStr } = useTheme();

  // Create refs to feed theme color to Three.js loop
  const themeColorRef = useRef(themeHex);
  useEffect(() => {
    themeColorRef.current = themeHex;
  }, [themeHex]);

  // Magnetic Button Hooks
  const [btnOffsetLeft, setBtnOffsetLeft] = useState({ x: 0, y: 0 });
  const [btnOffsetRight, setBtnOffsetRight] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Attract vector (35% pull strength)
    setOffset({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMagneticLeave = (
    setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic Physics Nodes on a Sphere (Mathematical Neural Grid)
    const nodeCount = 150;
    const restPositions: THREE.Vector3[] = [];
    const currentPositions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Golden Spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.6;

      const x = Math.cos(theta) * Math.sin(phi) * radius;
      const y = Math.sin(theta) * Math.sin(phi) * radius;
      const z = Math.cos(phi) * radius;

      const restPos = new THREE.Vector3(x, y, z);
      restPositions.push(restPos);
      currentPositions.push(restPos.clone());
      velocities.push(new THREE.Vector3(0, 0, 0));
    }

    // Geometry for points
    const pointsGeo = new THREE.BufferGeometry();
    const pointsArray = new Float32Array(nodeCount * 3);
    
    // Initialize points array
    currentPositions.forEach((pos, idx) => {
      pointsArray[idx * 3] = pos.x;
      pointsArray[idx * 3 + 1] = pos.y;
      pointsArray[idx * 3 + 2] = pos.z;
    });

    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pointsArray, 3));

    // Points Material
    const pointsMat = new THREE.PointsMaterial({
      color: themeColorRef.current,
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const nodePoints = new THREE.Points(pointsGeo, pointsMat);
    mainGroup.add(nodePoints);

    // Connecting Lines Geometry & Material
    // In neural networks, connect nodes that are closer than 0.7 units
    const maxLineConnections = 300;
    const lineIndices: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (restPositions[i].distanceTo(restPositions[j]) < 0.7) {
          lineIndices.push(i, j);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    const linePositionsArray = new Float32Array(lineIndices.length * 3);
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositionsArray, 3));

    const linesMat = new THREE.LineBasicMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(linesGeo, linesMat);
    mainGroup.add(lineSegments);

    // Orbiting data packets (outer rings)
    const particleCount = 100;
    const orbitingPositions = new Float32Array(particleCount * 3);
    const particleAngles: number[] = [];
    const particleSpeeds: number[] = [];
    const particleRadii: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particleAngles.push(Math.random() * Math.PI * 2);
      particleSpeeds.push(0.004 + Math.random() * 0.008);
      particleRadii.push(2.1 + Math.random() * 0.5);
    }

    const orbitingGeo = new THREE.BufferGeometry();
    orbitingGeo.setAttribute("position", new THREE.BufferAttribute(orbitingPositions, 3));

    const orbitingMat = new THREE.PointsMaterial({
      color: 0x00D4FF, // cyan highlight
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const orbitingPoints = new THREE.Points(orbitingGeo, orbitingMat);
    mainGroup.add(orbitingPoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00D4FF, 2.5, 30);
    blueLight.position.set(4, 4, 4);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x7B61FF, 2.5, 30);
    purpleLight.position.set(-4, -4, 4);
    scene.add(purpleLight);

    // Parallax mouse variables
    let targetX = 0;
    let targetY = 0;
    let mouse3D = new THREE.Vector3(0, 0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      
      targetX = x * 0.4;
      targetY = y * 0.4;

      // Project coordinates into 3D space to attract nodes
      mouse3D.set(x * 2.2, y * 2.2, 1.2);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / width) * 2 - 1;
      const y = -((touch.clientY - rect.top) / height) * 2 + 1;
      
      targetX = x * 0.45;
      targetY = y * 0.45;
      mouse3D.set(x * 2.2, y * 2.2, 1.2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / width) * 2 - 1;
      const y = -((touch.clientY - rect.top) / height) * 2 + 1;
      
      targetX = x * 0.45;
      targetY = y * 0.45;
      mouse3D.set(x * 2.2, y * 2.2, 1.2);
    };

    const handleTouchEnd = () => {
      targetX = 0;
      targetY = 0;
      mouse3D.set(9999, 9999, 9999); // Reset attraction when finger is lifted
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate groups
      mainGroup.rotation.y += 0.0015;
      mainGroup.rotation.x += 0.0006;

      // Sync color with Theme Context dynamically
      pointsMat.color.setHex(themeColorRef.current);
      linesMat.color.setHex(themeColorRef.current);

      // Node Physics simulation (Spring rebound + mouse cursor gravity)
      const pointsPos = nodePoints.geometry.attributes.position.array as Float32Array;
      const linePositions = lineSegments.geometry.attributes.position.array as Float32Array;

      // Calculate transformed mouse coordinate relative to main group rotation
      const localMouse = mouse3D.clone().applyMatrix4(mainGroup.matrixWorld.clone().invert());

      for (let i = 0; i < nodeCount; i++) {
        const curr = currentPositions[i];
        const rest = restPositions[i];
        const vel = velocities[i];

        // 1. Spring restoring force
        const forceSpring = rest.clone().sub(curr).multiplyScalar(0.06);

        // 2. Mouse gravity attraction if close
        const distToMouse = curr.distanceTo(localMouse);
        let forceMouse = new THREE.Vector3(0, 0, 0);
        
        if (distToMouse < 1.3) {
          const attractStrength = (1.3 - distToMouse) * 0.12;
          forceMouse = localMouse.clone().sub(curr).normalize().multiplyScalar(attractStrength);
        }

        // Update velocity & position
        vel.multiplyScalar(0.85); // Damping friction
        vel.add(forceSpring);
        vel.add(forceMouse);
        curr.add(vel);

        // Write coordinates back to buffer
        pointsPos[i * 3] = curr.x;
        pointsPos[i * 3 + 1] = curr.y;
        pointsPos[i * 3 + 2] = curr.z;
      }
      nodePoints.geometry.attributes.position.needsUpdate = true;

      // Write connected lines back to segments
      let lineIdx = 0;
      for (let i = 0; i < lineIndices.length / 2; i++) {
        const idxA = lineIndices[i * 2];
        const idxB = lineIndices[i * 2 + 1];

        const nodeA = currentPositions[idxA];
        const nodeB = currentPositions[idxB];

        linePositions[lineIdx++] = nodeA.x;
        linePositions[lineIdx++] = nodeA.y;
        linePositions[lineIdx++] = nodeA.z;

        linePositions[lineIdx++] = nodeB.x;
        linePositions[lineIdx++] = nodeB.y;
        linePositions[lineIdx++] = nodeB.z;
      }
      lineSegments.geometry.attributes.position.needsUpdate = true;

      // Orbiting particles ring update
      const orbitPos = orbitingPoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i];
        const angle = particleAngles[i];
        const radius = particleRadii[i];

        orbitPos[i * 3] = Math.cos(angle) * radius;
        orbitPos[i * 3 + 1] = Math.sin(angle * 0.4) * (radius * 0.2); // Waving orbit plane
        orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
      }
      orbitingPoints.geometry.attributes.position.needsUpdate = true;

      // Parallax layout tilt
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight || 550;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      orbitingGeo.dispose();
      orbitingMat.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 overflow-hidden grid-bg-cyber">
      {/* Background glowing gradients */}
      <div 
        className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full blur-[120px] animate-pulse-glow transition-all duration-700" 
        style={{ backgroundColor: `${themeColorStr}15` }} // Dynamic theme glow
      />
      <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-[#00D4FF]/10 blur-[100px] animate-pulse-glow" />

      {/* Floating stars particles backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-float" />
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-float-delayed" />
        <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-[#7B61FF] animate-float" />
        <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Copywriting */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 max-w-xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#00FFB2]" />
            <span className="text-xs font-heading font-semibold text-[#00FFB2] tracking-wider uppercase">
              Next-Gen Neural Globe System
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
            Transform Data <br />
            Into Decisions At The <br />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-700"
              style={{
                backgroundImage: `linear-gradient(to right, #00D4FF, ${themeColorStr}, #00FFB2)`,
              }}
            >
              Speed Of Thought
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
            AI-powered workflow automation platform designed for modern enterprises. Predict outcomes, map vector relationships, and execute jobs with zero manual overhead.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            {/* Magnetic Start button */}
            <a
              href="#pricing"
              onMouseMove={(e) => handleMagneticMove(e, setBtnOffsetLeft)}
              onMouseLeave={() => handleMagneticLeave(setBtnOffsetLeft)}
              className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-br from-[#7B61FF] to-[#00D4FF] hover:bg-gradient-to-r hover:from-[#00D4FF] hover:to-[#00FFB2] text-white shadow-xl transition-all duration-75 text-center font-heading active:scale-95 cursor-pointer select-none"
              style={{
                transform: `translate3d(${btnOffsetLeft.x}px, ${btnOffsetLeft.y}px, 0)`,
                willChange: "transform",
              }}
            >
              Start Free Trial
            </a>
            
            {/* Magnetic Watch button */}
            <button
              onClick={() => {
                document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseMove={(e) => handleMagneticMove(e, setBtnOffsetRight)}
              onMouseLeave={() => handleMagneticLeave(setBtnOffsetRight)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all backdrop-blur-md font-heading select-none cursor-pointer"
              style={{
                transform: `translate3d(${btnOffsetRight.x}px, ${btnOffsetRight.y}px, 0)`,
                willChange: "transform",
              }}
            >
              <Play className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]/20" />
              Watch Demo
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="w-full grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
            <div>
              <div className="text-xl font-bold font-heading text-white">99.98%</div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Core Uptime</div>
            </div>
            <div>
              <div className="text-xl font-bold font-heading text-[#00D4FF]">10M+</div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Daily Runs</div>
            </div>
            <div>
              <div className="text-xl font-bold font-heading text-[#00FFB2]">&lt; 50ms</div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Inference</div>
            </div>
          </div>
        </div>

        {/* Right Side 3D interactive Three.js Canvas */}
        <div className="lg:col-span-6 w-full flex items-center justify-center relative">
          <div 
            ref={containerRef} 
            className="w-full max-w-[500px] aspect-square relative flex items-center justify-center rounded-full"
          >
            {/* Background rotating radial design rings */}
            <div className="absolute inset-4 rounded-full border border-[#7B61FF]/10 bg-radial-gradient from-transparent to-[#7B61FF]/5 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-dashed border-[#00D4FF]/20 animate-spin-slow-reverse pointer-events-none" />

            <canvas
              ref={canvasRef}
              className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing touch-none"
              title="Interactive 3D Holographic AI Neural Globe"
            />
            
            {/* Indicator tag */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] text-muted flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 pointer-events-none uppercase tracking-wider font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-ping" />
              Dynamic Neural Globe
            </div>
          </div>
        </div>
      </div>

      {/* Fade mask */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </section>
  );
}
