"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const points: Point[] = Array(3).fill(null).map(() => ({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Initialize points at different positions
      points[0] = {
        x: canvas.width * 0.3,
        y: canvas.height * 0.3,
        targetX: canvas.width * 0.3,
        targetY: canvas.height * 0.3,
      };
      points[1] = {
        x: canvas.width * 0.7,
        y: canvas.height * 0.3,
        targetX: canvas.width * 0.7,
        targetY: canvas.height * 0.3,
      };
      points[2] = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.7,
        targetX: canvas.width * 0.5,
        targetY: canvas.height * 0.7,
      };
    };

    const createGradient = (x: number, y: number, hue: number) => {
      const gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        Math.min(canvas.width, canvas.height) * 0.5
      );

      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.4)`);
      gradient.addColorStop(0.5, `hsla(${hue}, 85%, 50%, 0.2)`);
      gradient.addColorStop(1, `hsla(${hue}, 90%, 40%, 0)`);

      return gradient;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each point
      points.forEach((point, index) => {
        const ease = 0.08;
        point.x += (point.targetX - point.x) * ease;
        point.y += (point.targetY - point.y) * ease;

        // Different hue for each point
        const hue = (index * 120 + performance.now() / 50) % 360;
        const gradient = createGradient(point.x, point.y, hue);
        
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update target positions based on mouse movement
      points.forEach((point, index) => {
        const angle = (index * (Math.PI * 2)) / points.length;
        const distance = Math.min(canvas.width, canvas.height) * 0.2;
        
        point.targetX = mouseX + Math.cos(angle) * distance;
        point.targetY = mouseY + Math.sin(angle) * distance;
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseX = touch.clientX;
        const mouseY = touch.clientY;

        points.forEach((point, index) => {
          const angle = (index * (Math.PI * 2)) / points.length;
          const distance = Math.min(canvas.width, canvas.height) * 0.2;
          
          point.targetX = mouseX + Math.cos(angle) * distance;
          point.targetY = mouseY + Math.sin(angle) * distance;
        });
      }
    };

    // Initial setup
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}