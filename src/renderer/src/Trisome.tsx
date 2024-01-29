import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { useEffect, useState } from 'react';

function calculateNextPositions(point1: THREE.Vector3, point2: THREE.Vector3, point3: THREE.Vector3) {
  const G = 6.67430e-11; // 万有引力常数

  // 计算两个点之间的距离的立方
  function calculateDistanceCubed(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z;
    const distanceSquared = dx ** 2 + dy ** 2 + dz ** 2;
    return distanceSquared * Math.sqrt(distanceSquared);
  }

  // 计算下一时刻的加速度
  function calculateAcceleration(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
    const distanceCubed = calculateDistanceCubed(p1, p2);
    const accelerationX = G * (p2.x - p1.x) / distanceCubed + G * (p3.x - p1.x) / calculateDistanceCubed(p1, p3);
    const accelerationY = G * (p2.y - p1.y) / distanceCubed + G * (p3.y - p1.y) / calculateDistanceCubed(p1, p3);
    const accelerationZ = G * (p2.z - p1.z) / distanceCubed + G * (p3.z - p1.z) / calculateDistanceCubed(p1, p3);
    return new THREE.Vector3(accelerationX, accelerationY, accelerationZ);
  }

  // 计算下一时刻的速度
  function calculateVelocity(velocity: THREE.Vector3, acceleration: THREE.Vector3) {
    const velocityX = velocity.x + acceleration.x;
    const velocityY = velocity.y + acceleration.y;
    const velocityZ = velocity.z + acceleration.z;
    return new THREE.Vector3(velocityX, velocityY, velocityZ);
  }

  // 计算下一时刻的位置
  function calculatePosition(position: THREE.Vector3, velocity: THREE.Vector3) {
    const positionX = position.x + velocity.x;
    const positionY = position.y + velocity.y;
    const positionZ = position.z + velocity.z;
    return new THREE.Vector3(positionX, positionY, positionZ);
  }

  const acceleration1 = calculateAcceleration(point1, point2, point3);
  const acceleration2 = calculateAcceleration(point2, point1, point3);
  const acceleration3 = calculateAcceleration(point3, point1, point2);

  const value = generateRandomCoordinates();
  const velocity1 = calculateVelocity(new THREE.Vector3(0 + value.x, 0 + value.y, 0 + value.z), acceleration1);
  const velocity2 = calculateVelocity(new THREE.Vector3(0 + value.x, 0 + value.y, 0 + value.z), acceleration2);
  const velocity3 = calculateVelocity(new THREE.Vector3(0 + value.x, 0 + value.y, 0 + value.z), acceleration3);

  const newPosition1 = calculatePosition(point1, velocity1);
  const newPosition2 = calculatePosition(point2, velocity2);
  const newPosition3 = calculatePosition(point3, velocity3);

  return [newPosition1, newPosition2, newPosition3];
}

function generateRandomCoordinates() {
  const x = Math.random() * 0.1 - 0.05; // 假设 x 轴长度为100
  const y = Math.random() * 0.1 - 0.05; // 假设 y 轴长度为100
  const z = Math.random() * 0.1 - 0.05; // 假设 z 轴长度为100
  return new THREE.Vector3(x, y, z);
}

function Trisome(): JSX.Element {
  const [point1, setPoint1] = useState<THREE.Vector3>(generateRandomCoordinates());
  const [point2, setPoint2] = useState<THREE.Vector3>(generateRandomCoordinates());
  const [point3, setPoint3] = useState<THREE.Vector3>(generateRandomCoordinates());

  const renderer = async () => {
    const [newPoint1, newPoint2, newPoint3] = calculateNextPositions(point1, point2, point3);
    
    setPoint1(newPoint1);
    setPoint2(newPoint2);
    setPoint3(newPoint3);
  };

  useEffect(() => {
    requestAnimationFrame(renderer);
  }, [point1, point2, point3])

  useEffect(() => {
    renderer();
  }, []);

  return (
    <>
      <Canvas camera={{ fov: 45, position: [-4, 2, -4] }} style={{ height: '100vh' }}>
        <Sphere position={[point1.x, point1.y, point1.z]} />
        <Sphere position={[point2.x, point2.y, point2.z]} />
        <Sphere position={[point3.x, point3.y, point3.z]} />
      </Canvas>
    </>
  )
}

export default Trisome
