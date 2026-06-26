"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Layers, Cpu } from "lucide-react";
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

    // 3D AI Control Tesseract Layout (nested 4D hypercube structure)
    // Outer wireframe box
    const boxGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const edges = new THREE.EdgesGeometry(boxGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const boxWireframe = new THREE.LineSegments(edges, lineMaterial);
    mainGroup.add(boxWireframe);

    // Inner wireframe box (Tesseract inner cage)
    const innerBoxGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
    const innerBoxEdges = new THREE.EdgesGeometry(innerBoxGeo);
    const innerBoxMat = new THREE.LineBasicMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const innerBoxWireframe = new THREE.LineSegments(innerBoxEdges, innerBoxMat);
    mainGroup.add(innerBoxWireframe);

    // Dynamic Energy Tethers (tethers connecting core -> inner cage -> outer cage vertices)
    const tetherGeo = new THREE.BufferGeometry();
    const tetherPositions = new Float32Array(16 * 2 * 3); // 16 lines (8 inner, 8 outer) * 2 points * 3 coords
    const cornersOuter = [
      new THREE.Vector3(-1.1, -1.1, -1.1),
      new THREE.Vector3(1.1, -1.1, -1.1),
      new THREE.Vector3(-1.1, 1.1, -1.1),
      new THREE.Vector3(1.1, 1.1, -1.1),
      new THREE.Vector3(-1.1, -1.1, 1.1),
      new THREE.Vector3(1.1, -1.1, 1.1),
      new THREE.Vector3(-1.1, 1.1, 1.1),
      new THREE.Vector3(1.1, 1.1, 1.1)
    ];
    const cornersInner = [
      new THREE.Vector3(-0.55, -0.55, -0.55),
      new THREE.Vector3(0.55, -0.55, -0.55),
      new THREE.Vector3(-0.55, 0.55, -0.55),
      new THREE.Vector3(0.55, 0.55, -0.55),
      new THREE.Vector3(-0.55, -0.55, 0.55),
      new THREE.Vector3(0.55, -0.55, 0.55),
      new THREE.Vector3(-0.55, 0.55, 0.55),
      new THREE.Vector3(0.55, 0.55, 0.55)
    ];
    let tIdx = 0;
    for (let i = 0; i < 8; i++) {
      // Line segment 1: Core Center -> Inner Cage Corner
      tetherPositions[tIdx++] = 0;
      tetherPositions[tIdx++] = 0;
      tetherPositions[tIdx++] = 0;
      tetherPositions[tIdx++] = cornersInner[i].x;
      tetherPositions[tIdx++] = cornersInner[i].y;
      tetherPositions[tIdx++] = cornersInner[i].z;

      // Line segment 2: Inner Cage Corner -> Outer Cage Corner
      tetherPositions[tIdx++] = cornersInner[i].x;
      tetherPositions[tIdx++] = cornersInner[i].y;
      tetherPositions[tIdx++] = cornersInner[i].z;
      tetherPositions[tIdx++] = cornersOuter[i].x;
      tetherPositions[tIdx++] = cornersOuter[i].y;
      tetherPositions[tIdx++] = cornersOuter[i].z;
    }
    tetherGeo.setAttribute("position", new THREE.BufferAttribute(tetherPositions, 3));
    const tetherMat = new THREE.LineBasicMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const tethers = new THREE.LineSegments(tetherGeo, tetherMat);
    mainGroup.add(tethers);

    // Parallax Outer Spherical Cage
    const outerSphereGeo = new THREE.IcosahedronGeometry(2.9, 2);
    const outerSphereEdges = new THREE.EdgesGeometry(outerSphereGeo);
    const outerSphereMat = new THREE.LineBasicMaterial({
      color: 0x114C5A, // Nocturnal Expedition blue-green
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const outerSphere = new THREE.LineSegments(outerSphereEdges, outerSphereMat);
    scene.add(outerSphere); // Place outside mainGroup for opposite rotation

    // Floating computational rings (circular holograms) inside the cube
    const planesGroup = new THREE.Group();
    mainGroup.add(planesGroup);
    
    const planeGeo = new THREE.RingGeometry(0.35, 1.0, 32, 1);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x114C5A, // Nocturnal Expedition accent
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    
    const layerYPositions = [-0.6, 0, 0.6];
    const layers: THREE.Mesh[] = [];
    layerYPositions.forEach((yPos) => {
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI / 2; // Lie flat horizontal
      mesh.position.y = yPos;
      planesGroup.add(mesh);
      layers.push(mesh);
    });

    // Inner glowing core sphere (using Phong material for specular reflection highlights)
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.85,
      shininess: 120,
      specular: 0xffffff,
      emissive: themeColorRef.current,
      emissiveIntensity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Middle Cage (Crystalline geodesic icosahedron cage)
    const midCageGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const midCageEdges = new THREE.EdgesGeometry(midCageGeo);
    const midCageMat = new THREE.LineBasicMaterial({
      color: themeColorRef.current,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const midCageWireframe = new THREE.LineSegments(midCageEdges, midCageMat);
    mainGroup.add(midCageWireframe);

    // Orbiting data packets (3 perpendicular outer rings)
    const particleCount = 90; // 30 particles per plane
    const orbitingPositions = new Float32Array(particleCount * 3);
    const particleAngles: number[] = [];
    const particleSpeeds: number[] = [];
    const particleRadii: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particleAngles.push(Math.random() * Math.PI * 2);
      particleSpeeds.push(0.006 + Math.random() * 0.007);
      particleRadii.push(2.2 + Math.random() * 0.35);
    }

    const orbitingGeo = new THREE.BufferGeometry();
    orbitingGeo.setAttribute("position", new THREE.BufferAttribute(orbitingPositions, 3));

    const orbitingMat = new THREE.PointsMaterial({
      color: 0xFFC801, // Forsythia highlight
      size: 0.04,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const orbitingPoints = new THREE.Points(orbitingGeo, orbitingMat);
    mainGroup.add(orbitingPoints);

    // Lights & Atmospheric Grid Config
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0xD9E8E2, 3.0, 30);
    blueLight.position.set(4, 4, 4);
    scene.add(blueLight);

    const orangeLight = new THREE.PointLight(0xFF9932, 3.0, 30);
    orangeLight.position.set(-4, -4, 4);
    scene.add(orangeLight);

    // Subtle background grid helper inside the scene for depth
    const sceneGrid = new THREE.GridHelper(10, 10, 0x114C5A, 0x114C5A);
    sceneGrid.position.z = -3;
    sceneGrid.rotation.x = Math.PI / 3;
    scene.add(sceneGrid);

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
      mainGroup.rotation.y += 0.0014;
      mainGroup.rotation.x += 0.0006;

      // Rotate outer parallax cage in opposite direction
      outerSphere.rotation.y -= 0.0008;
      outerSphere.rotation.z += 0.0004;

      // Rotate internal computational rings opposite
      planesGroup.rotation.y -= 0.0022;

      // Slide computational rings up and down inside the cube (scanning laser wave effect)
      layers.forEach((layer, idx) => {
        const offset = Math.sin(Date.now() * 0.0012 + idx * Math.PI / 3) * 0.28;
        layer.position.y = layerYPositions[idx] + offset;
      });

      // Orbiting lights: Move PointLights dynamically in a circle around the core
      const lightTime = Date.now() * 0.001;
      blueLight.position.x = Math.cos(lightTime) * 4.5;
      blueLight.position.z = Math.sin(lightTime) * 4.5;
      orangeLight.position.x = -Math.cos(lightTime + 1.2) * 4.5;
      orangeLight.position.z = -Math.sin(lightTime + 1.2) * 4.5;

      // Pulsate the core glowing sphere
      const coreScale = 1.0 + Math.sin(Date.now() * 0.0025) * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Sync color with Theme Context dynamically
      lineMaterial.color.setHex(themeColorRef.current);
      innerBoxMat.color.setHex(themeColorRef.current);
      midCageMat.color.setHex(themeColorRef.current);
      coreMat.color.setHex(themeColorRef.current);
      coreMat.emissive.setHex(themeColorRef.current);
      tetherMat.color.setHex(themeColorRef.current);

      // Rotate the middle crystalline cage on its own axis for dynamic depth
      midCageWireframe.rotation.y += 0.0024;
      midCageWireframe.rotation.x -= 0.0010;

      // Orbiting particles: Split particles into 3 perpendicular orbital rings
      const orbitPos = orbitingPoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i];
        const angle = particleAngles[i];
        const radius = particleRadii[i];

        if (i < 30) {
          // Ring 1: X-Z Horizontal plane
          orbitPos[i * 3] = Math.cos(angle) * radius;
          orbitPos[i * 3 + 1] = Math.sin(angle * 0.15) * (radius * 0.08);
          orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
        } else if (i < 60) {
          // Ring 2: Y-Z Vertical plane
          orbitPos[i * 3] = Math.sin(angle * 0.15) * (radius * 0.08);
          orbitPos[i * 3 + 1] = Math.cos(angle) * radius;
          orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
        } else {
          // Ring 3: X-Y Diagonal plane
          orbitPos[i * 3] = Math.cos(angle) * radius;
          orbitPos[i * 3 + 1] = Math.sin(angle) * radius;
          orbitPos[i * 3 + 2] = Math.sin(angle * 0.15) * (radius * 0.08);
        }
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
      boxGeometry.dispose();
      edges.dispose();
      lineMaterial.dispose();
      innerBoxGeo.dispose();
      innerBoxEdges.dispose();
      innerBoxMat.dispose();
      tetherGeo.dispose();
      tetherMat.dispose();
      outerSphereGeo.dispose();
      outerSphereEdges.dispose();
      outerSphereMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      midCageGeo.dispose();
      midCageEdges.dispose();
      midCageMat.dispose();
      orbitingGeo.dispose();
      orbitingMat.dispose();
      sceneGrid.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 overflow-hidden grid-bg-cyber">
      {/* Background glowing gradients */}
      <div 
        className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full blur-[120px] animate-pulse-glow transition-all duration-700" 
        style={{ backgroundColor: `${themeColorStr}10` }} // Dynamic theme glow
      />
      <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-[#FF9932]/5 blur-[100px] animate-pulse-glow" />

      {/* Floating stars particles backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[30%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-float" />
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#D9E8E2] animate-float-delayed" />
        <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-[#FF9932] animate-float" />
        <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Copywriting */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 max-w-xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              AI Command Center
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white uppercase">
            AI Automation <br />
            For The <br />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-700"
              style={{
                backgroundImage: `linear-gradient(to right, #FFC801, ${themeColorStr}, #FF9932)`,
              }}
            >
              Modern Era
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
            Transform enterprise data into autonomous decisions with advanced AI workflows. Predict outcomes, map vector relationships, and execute jobs with zero manual overhead.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            {/* Magnetic Start button */}
            <a
              href="#pricing"
              onMouseMove={(e) => handleMagneticMove(e, setBtnOffsetLeft)}
              onMouseLeave={() => handleMagneticLeave(setBtnOffsetLeft)}
              className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-br from-[#FF9932] to-[#FFC801] hover:bg-gradient-to-r hover:from-[#FFC801] hover:to-[#D9E8E2] text-white shadow-xl transition-all duration-75 text-center font-heading active:scale-95 cursor-pointer select-none"
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
                document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseMove={(e) => handleMagneticMove(e, setBtnOffsetRight)}
              onMouseLeave={() => handleMagneticLeave(setBtnOffsetRight)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all backdrop-blur-md font-heading select-none cursor-pointer"
              style={{
                transform: `translate3d(${btnOffsetRight.x}px, ${btnOffsetRight.y}px, 0)`,
                willChange: "transform",
              }}
            >
              <Cpu className="w-3.5 h-3.5 text-[#FFC801]" />
              View Architecture
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
            <div className="absolute inset-4 rounded-full border border-[#FF9932]/10 bg-radial-gradient from-transparent to-[#FF9932]/5 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-dashed border-[#FFC801]/10 animate-spin-slow-reverse pointer-events-none" />

            <canvas
              ref={canvasRef}
              className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing touch-none"
              title="Interactive 3D Holographic AI Control Cube"
            />
            
            {/* Indicator tag */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] text-muted flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 pointer-events-none uppercase tracking-wider font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-ping" />
              3D AI Control Cube
            </div>
          </div>
        </div>
      </div>

      {/* Fade mask */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#172B36] to-transparent pointer-events-none" />
    </section>
  );
}
