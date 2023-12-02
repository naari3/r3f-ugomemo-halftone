import { extend } from "@react-three/fiber";
import { useMemo } from "react";
import { ShaderPass } from "three-stdlib";

extend({ ShaderPass });

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
    uniform vec3 weights;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = vec4(inputColor.rgb * weights, inputColor.a);
    }
`;

export const PassThroughPass = () => {
	const shader = useMemo(
		() => ({
			uniforms: {
				tDiffuse: { value: null },
			},
			vertexShader,
			fragmentShader,
		}),
		[],
	);

	return <shaderPass args={[shader]} />;
};
