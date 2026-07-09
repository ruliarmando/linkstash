import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	return redirect(302, event.locals.user ? '/bookmarks' : '/login');
};
