import { ReactThreeFiber } from "@react-three/fiber";
import { BloomPass, GlitchPass, UnrealBloomPass } from "three-stdlib";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			glitchPass: ReactThreeFiber.Node<GlitchPass, typeof GlitchPass>;
			bloomPass: ReactThreeFiber.Node<BloomPass, typeof BloomPass>;
			unrealBloomPass: ReactThreeFiber.Node<
				UnrealBloomPass,
				typeof UnrealBloomPass
			>;
		}
	}
}
