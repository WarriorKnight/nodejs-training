import unhandled from 'cli-handle-unhandled';
import welcome from 'cli-welcome';
import { getPackageJson } from 'get-package-json-file';

export default async ({ clear = true }) => {
	unhandled();
	const pkgJson = await getPackageJson(`./../package.json`);
};
