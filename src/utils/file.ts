export const publicPath = (path: string) => {
	return new URL(path, `http://localhost/${import.meta.env.BASE_URL}`).pathname;
};
