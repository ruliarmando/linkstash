import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { bookmark } from '$lib/server/db/schema';
import { normalizeTags } from '$lib/tags';
import { fetchPageTitle } from '$lib/server/linkPreview';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const bookmarks = await db
		.select()
		.from(bookmark)
		.where(eq(bookmark.userId, event.locals.user.id))
		.orderBy(bookmark.createdAt);

	return { bookmarks };
};

export const actions: Actions = {
	create: async (event) => {
		if (!event.locals.user) return fail(401);

		const data = await event.request.formData();
		const url = data.get('url');
		const title = data.get('title');
		const tags = data.get('tags');

		if (typeof url !== 'string' || !url.trim()) {
			return fail(400, { url, title, tags, missing: true });
		}

		const providedTitle = typeof title === 'string' && title.trim() ? title.trim() : null;
		const resolvedTitle = providedTitle ?? (await fetchPageTitle(url)) ?? url;

		await db.insert(bookmark).values({
			userId: event.locals.user.id,
			url,
			title: resolvedTitle,
			tags: normalizeTags(typeof tags === 'string' ? tags : '')
		});

		return { success: true };
	},

	delete: async (event) => {
		if (!event.locals.user) return fail(401);

		const data = await event.request.formData();
		const id = data.get('id');
		if (typeof id !== 'string') return fail(400);

		await db
			.delete(bookmark)
			.where(and(eq(bookmark.id, id), eq(bookmark.userId, event.locals.user.id)));

		return { success: true };
	}
};
