import { extend } from "@react-three/fiber";
import { VFC } from "react";
import { FXAAShader, ShaderPass } from "three-stdlib";

extend({ ShaderPass });

type ToonPassType = {
	enabled?: boolean;
};

export const FXAAPass: VFC<ToonPassType> = (props) => {
	const { enabled = true } = props;
	return (
		<shaderPass attachArray="passes" args={[FXAAShader]} enabled={enabled} />
	);
};
