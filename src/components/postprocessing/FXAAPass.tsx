import { extend } from "@react-three/fiber";
import { VFC } from "react";
import { FXAAShader, ShaderPass } from "three-stdlib";

extend({ ShaderPass });

type FXAAPassType = {
	enabled?: boolean;
};

export const FXAAPass: VFC<FXAAPassType> = (props) => {
	const { enabled = true } = props;
	return (
		<shaderPass attachArray="passes" args={[FXAAShader]} enabled={enabled} />
	);
};
