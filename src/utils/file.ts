export const publicPath = (path: string) => {
	return new URL(`${import.meta.env.BASE_URL}${path}`, "http://localhost")
		.pathname;
};
