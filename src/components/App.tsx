import React, { VFC } from "react";
import { LinkIconButton } from "./LinkIconButton";
import { TCanvas } from "./TCanvas";

export const App: VFC = () => {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<TCanvas />
			<LinkIconButton
				imagePath="/assets/icons/github.svg"
				linkPath="https://github.com/naari3/r3f-ugomemo-halftone"
			/>
		</div>
	);
};
