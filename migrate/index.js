

const fetch = require('cross-fetch');

const BASE_DIRECTUS_URL = 'http://localhost:8055';
const BASE_ACCESS_TOKEN = '3V7NvQDIHrnGjAEeph-pv9oG7OqJ9b5t';

const TARGET_DIRECTUS_URL = 'http://10.15.8.30:8055';
const TARGET_ACCESS_TOKEN = '64wU95kesFBmw-dBlz90xUaafjEqEXll';

async function main() {
	const snapshot = await getSnapshot();
	const diff = await getDiff(snapshot);
	await applyDiff(diff);
}

main();

async function getSnapshot() {
	const URL = `${BASE_DIRECTUS_URL}/schema/snapshot?access_token=${BASE_ACCESS_TOKEN}`;
	const { data } = await fetch(URL).then((r) => r.json());
	return data;
}

async function getDiff(snapshot) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/diff?access_token=${TARGET_ACCESS_TOKEN}`;

	const { data } = await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(snapshot),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((r) => r.json());

	return data;
}

async function applyDiff(diff) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/apply?access_token=${TARGET_ACCESS_TOKEN}`;

	await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}