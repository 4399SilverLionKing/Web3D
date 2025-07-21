import { usePlane } from '@react-three/cannon';

interface PlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Plane({
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
}: PlaneProps) {
  const [ref] = usePlane(() => ({
    position,
    rotation,
    mass: 0,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
