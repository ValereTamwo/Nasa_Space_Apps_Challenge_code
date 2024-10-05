import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import Globe from "three-globe";

const GlobeComponent = () => {
  const globeRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);

    const globe = new Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .pointsData([{ lat: 37.7749, lng: -122.4194 }]) // Example: Point at San Francisco

    scene.add(globe);
    camera.position.z = 350;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.001; // Rotating globe animation
      renderer.render(scene, camera);
    };
    animate();

  }, []);

  return <div ref={globeRef} />;
};

export default GlobeComponent;
