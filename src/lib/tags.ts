export function parseTags(raw: string): string[] {
	return [...new Set(raw.split(',').map((tag) => tag.trim()).filter(Boolean))];
}

export function normalizeTags(raw: string): string {
	return parseTags(raw).join(', ');
}
