import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { VFC, useEffect, useRef } from "react";
import {
	BloomPass,
	EffectComposer,
	GlitchPass,
	RenderPass,
	ShaderPass,
	UnrealBloomPass,
} from "three-stdlib";
import { DistortionPass } from "./postprocessing/DistortionPass";
import { FXAAPass } from "./postprocessing/FXAAPass";
import { HalftonePass } from "./postprocessing/HalftonePass";
import { PassThroughPass } from "./postprocessing/PassThroughPass";
import { RipplePass } from "./postprocessing/RipplePass";

extend({
	EffectComposer,
	RenderPass,
	ShaderPass,
	GlitchPass,
	BloomPass,
	UnrealBloomPass,
});

export const Effect: VFC = () => {
	const { gl, scene, camera, size } = useThree();

	const glitch_params = useControls("Glitch", {
		enabled: { value: false },
		goWild: { value: true },
	});

	const fxaa_params = useControls("FXAA", {
		enabled: true,
	});

	const dist_params = useControls("Distortion", {
		enabled: true,
		progress: { value: 0, min: 0, max: 1, step: 0.01 },
		scale: { value: 1, min: 0, max: 5, step: 0.01 },
	});

	const ripple_params = useControls("Ripple", {
		enabled: true,
	});

	const halftone_params = useControls("Halftone", {
		enabled: true,
		pixelSize: { value: 0.001, min: 0.0001, max: 0.01, step: 0.0001 },
		resWidth: { value: size.width, min: 0, max: 10000, step: 1 },
		resHeight: { value: size.height, min: 0, max: 10000, step: 1 },
		twoByTwo: { value: false },
	});

	const composerRef = useRef<EffectComposer>(null);

	useEffect(() => {
		composerRef.current!.setSize(size.width, size.height);
	}, [size]);

	useFrame(() => {
		composerRef.current!.render();
	}, 1);

	return (
		<effectComposer ref={composerRef} args={[gl]}>
			<renderPass attachArray="passes" args={[scene, camera]} />
			{/* <PassThroughPass /> */}
			<glitchPass attachArray="passes" {...glitch_params} />
			<FXAAPass {...fxaa_params} />
			<bloomPass attachArray="passes" args={[1, 25, 0.1, 1024]} />
			{/* <unrealBloomPass
				attachArray="passes"
				strength={0.2}
				radius={0.1}
				threshold={0.9}
			/> */}
			<DistortionPass {...dist_params} />
			<RipplePass {...ripple_params} />
			<HalftonePass
				{...halftone_params}
				resolution={[halftone_params.resWidth, halftone_params.resHeight]}
			/>
		</effectComposer>
	);
};
