import { BakeShadows } from "@react-three/drei";
import { GroupProps, MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
	Color,
	Euler,
	SphereGeometry,
	Vector3,
	WireframeGeometry,
} from "three";

function Cube({
	position,
	rotationSpeed,
}: { position: Vector3; rotationSpeed: number[] }) {
	const ref = useRef<MeshProps>();

	useFrame((state, delta) => {
		const rotation = ref.current!.rotation! as Euler;
		rotation.x += rotationSpeed[0] * delta;
		rotation.y += rotationSpeed[1] * delta;
		rotation.z += rotationSpeed[2] * delta;
	});

	return (
		<mesh
			castShadow
			receiveShadow
			ref={ref}
			position={position}
			scale={new Vector3(0.1, 0.1, 0.1)}
		>
			<boxBufferGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="white" roughness={1.0} />
		</mesh>
	);
}

function Sphere() {
	const ref = useRef<MeshProps>();
	useFrame((state, delta) => {
		const rotation = ref.current!.rotation! as Euler;
		rotation.x += 0.01 * delta;
		rotation.y += 0 * delta;
		rotation.z += 0.01 * delta;
	});

	const geom = new SphereGeometry(5, 16, 16);
	const wireframe = new WireframeGeometry(geom);

	return (
		<>
			<mesh ref={ref}>
				<sphereGeometry args={[5, 16, 16]} />
				<meshNormalMaterial wireframe />
			</mesh>
		</>
	);
}

function Scene() {
	const ref = useRef<GroupProps>();
	useFrame((state, delta) => {
		const rotation = ref.current!.rotation! as Euler;
		rotation.y += 0.0075 * delta;
		// rotation.y += 0 * delta;
		// rotation.z += 0.01 * delta;
	});

	const numCubes = 500;
	const cubes = [];

	for (let i = 0; i < numCubes; i++) {
		const position = new Vector3(
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
		).multiplyScalar(0.6);
		const rotationSpeed = [
			Math.random() * 0.1,
			Math.random() * 0.1,
			Math.random() * 0.1,
		];
		cubes.push(
			<Cube key={i} position={position} rotationSpeed={rotationSpeed} />,
		);
	}

	return (
		<>
			<group>
				<group ref={ref}>
					{cubes.map((cube) => {
						return cube;
					})}
				</group>
				<Sphere />
				<BakeShadows />
			</group>
		</>
	);
}

export default Scene;
