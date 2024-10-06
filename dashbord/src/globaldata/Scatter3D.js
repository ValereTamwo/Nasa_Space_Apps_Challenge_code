import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const Point = ({ position, label, color }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} /> {/* Increased size */}
      <meshStandardMaterial color={color} />
      <Html>
        <div style={{ color: 'purple', fontSize: '12px', pointerEvents: 'none' }}>{label}</div> {/* Enhanced label styling */}
      </Html>
    </mesh>
  );
};

const ScatterPlot3D = ({ selectedContinent, selectedSocialIndex, selectedDisasterType }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (selectedContinent && selectedSocialIndex) {
      fetch('http://localhost:5000/api/data')
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) =>
              item.CONTINENT === selectedContinent &&
              item[selectedSocialIndex] !== null &&
              item['Gender Inequality Index'] !== null &&
              item[selectedDisasterType] !== null
          );

          const points = filteredData.map((item) => ({
            position: [
              item[selectedSocialIndex], // X axis
              item['Gender Inequality Index'], // Y axis
              Math.random() * 10, // Random Z axis value
            ],
            label: item.COUNTRY,
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
          }));

          setDataPoints(points);
        });
    }
  }, [selectedContinent, selectedSocialIndex, selectedDisasterType]);

    return (
        <div className='mt-8 w-full h-[100%] bg-gray-900 top-[25px]'>
            <h3 className='text-white p-3 w-[400px]' >{selectedSocialIndex} vs Gender Inequality Index vs{selectedDisasterType} </h3>
    <Canvas style={{ height: '100%',width:'100%', background: 'skyblue' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {/* Optional: Add grid or axes for better reference */}
      <gridHelper args={[10, 10, 'blue', 'gray']} position={[0, 0, 0]} />
      {dataPoints.map((point, index) => (
        <Point key={index} position={point.position} label={point.label} color={point.color} />
      ))}
    </Canvas>
    </div>
  );
};

export default ScatterPlot3D;
