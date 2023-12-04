import urlJoin from "url-join";

export const publicPath = (path: string) => {
	return urlJoin(import.meta.env.BASE_URL, path);
};
