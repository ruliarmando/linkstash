export async function fetchPageTitle(rawUrl: string): Promise<string | null> {
	let parsed: URL;
	try {
		parsed = new URL(rawUrl);
	} catch {
		return null;
	}

	console.log(parsed);

	// only ever fetch plain web URLs — never file:, internal schemes, etc.
	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
		return null;
	}

	try {
		const res = await fetch(parsed, { signal: AbortSignal.timeout(5000) });
		if (!res.ok) return null;

		const html = await res.text();
		const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
		return match ? match[1].trim() : null;
	} catch {
		return null;
	}
}
