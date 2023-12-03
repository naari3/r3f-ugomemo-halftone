import { extend } from "@react-three/fiber";
import { VFC, useMemo, useRef } from "react";
import { ShaderPass } from "three-stdlib";
import fragmentShader from "./halftone/fragment.glsl?raw";
import vertexShader from "./halftone/vertex.glsl?raw";
import twoByTwoFragmentShader from "./halftone2x2/fragment.glsl?raw";
import twoByTwoVertexShader from "./halftone2x2/vertex.glsl?raw";

extend({ ShaderPass });

type HalftonePassType = {
	enabled?: boolean;
	pixelSize?: number;
	resolution?: [number, number];
	twoByTwo?: boolean;
};

export const HalftonePass: VFC<HalftonePassType> = (props) => {
	const { enabled = true, pixelSize = 0.01, resolution, twoByTwo } = props;

	const halftoneRef = useRef<ShaderPass>(null);
	const shader: THREE.Shader = useMemo(
		() => ({
			uniforms: {
				tDiffuse: { value: null },
				u_pixelSize: { value: pixelSize },
				u_resolution: { value: resolution },
			},
			vertexShader: twoByTwo ? twoByTwoVertexShader : vertexShader,
			fragmentShader: twoByTwo ? twoByTwoFragmentShader : fragmentShader,
		}),
		[pixelSize, resolution, twoByTwo],
	);

	return (
		<shaderPass
			args={[shader]}
			ref={halftoneRef}
			attachArray="passes"
			enabled={enabled}
			uniforms-u_pixelSize-value={pixelSize}
			uniforms-u_resolution-value={resolution}
		/>
	);
};
