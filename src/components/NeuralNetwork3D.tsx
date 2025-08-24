import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const NeuralNetwork3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const connectionsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, index) => {
        const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3 + 0.7;
        node.scale.setScalar(pulse);
      });
    }
  });

  // Create neural network structure
  const nodes = [];
  const connections = [];
  
  // Layer 1 (Input)
  for (let i = 0; i < 5; i++) {
    nodes.push([-4, i * 1.5 - 3, 0]);
  }
  
  // Layer 2 (Hidden)
  for (let i = 0; i < 3; i++) {
    nodes.push([-1, i * 2 - 2, 0]);
  }
  
  // Layer 3 (Output)
  for (let i = 0; i < 2; i++) {
    nodes.push([2, i * 1.5 - 0.75, 0]);
  }

  // Create connections between layers
  for (let i = 0; i < 5; i++) {
    for (let j = 5; j < 8; j++) {
      connections.push([i, j]);
    }
  }
  
  for (let i = 5; i < 8; i++) {
    for (let j = 8; j < 10; j++) {
      connections.push([i, j]);
    }
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Nodes */}
      <group ref={nodesRef}>
        {nodes.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial 
              color={index < 5 ? "#00d4ff" : index < 8 ? "#4ade80" : "#a855f7"} 
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Connections */}
      <group ref={connectionsRef}>
        {connections.map(([startIdx, endIdx], index) => {
          const start = new THREE.Vector3(...nodes[startIdx]);
          const end = new THREE.Vector3(...nodes[endIdx]);
          const mid = start.clone().lerp(end, 0.5);
          const length = start.distanceTo(end);
          
          return (
            <group key={index}>
              <mesh position={mid}>
                <cylinderGeometry args={[0.01, 0.01, length, 4]} />
                <meshBasicMaterial 
                  color="#00d4ff" 
                  transparent 
                  opacity={0.3}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

export default NeuralNetwork3D;