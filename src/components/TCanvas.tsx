import { BakeShadows, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
} from "@react-three/postprocessing";
import { Suspense, VFC } from "react";
import { Effect } from "./Effect";
import { ImagePlane } from "./ImagePlane";
import Scene from "./Scene";

export const TCanvas: VFC = () => {
	return (
		<Canvas
			shadows
			camera={{
				position: [0, 0, 2],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 1,
				far: 20,
			}}
			dpr={window.devicePixelRatio}
		>
			{/* canvas color */}
			<color attach="background" args={["white"]} />
			{/* camera controller */}
			<OrbitControls attach="orbitControls" />
			{/* helper */}
			<Stats />
			{/* object */}

			{/* lights */}
			<ambientLight intensity={0.2} />
			<pointLight color="orange" position={[0, 0, 5]} intensity={0.75} />
			<hemisphereLight intensity={0.15} groundColor="black" />
			<spotLight
				position={[10, 20, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<fog args={["black", 50, 2000]} />

			{/* scene */}
			<Scene />
			<BakeShadows />
			<Suspense fallback={null}>{/* <ImagePlane /> */}</Suspense>
			<EffectComposer>
				<Bloom
					luminanceThreshold={0}
					luminanceSmoothing={0.4}
					intensity={0.3}
				/>
				<DepthOfField
					target={[0, 0, 1]}
					focalLength={0.3}
					bokehScale={15}
					height={700}
				/>
			</EffectComposer>
			{/* effect */}
			<Effect />
		</Canvas>
	);
};
