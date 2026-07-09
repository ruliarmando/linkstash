<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { enhance } from '$app/forms';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if data.user}
	<div class="flex min-h-screen bg-slate-50">
		<aside class="flex w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-6">
			<div>
				<h1 class="text-xl font-bold tracking-tight text-slate-900">LinkStash</h1>
				<nav class="mt-8 flex flex-col gap-1">
					<a
						href="/bookmarks"
						class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
					>
						Bookmarks
					</a>
				</nav>
			</div>

			<div class="border-t border-slate-200 pt-4">
				<p class="truncate text-sm text-slate-500">{data.user.email}</p>
				<form method="POST" action="/logout" use:enhance class="mt-2">
					<button type="submit" class="text-sm font-medium text-slate-600 hover:text-slate-900">
						Log out
					</button>
				</form>
			</div>
		</aside>

		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-slate-50 p-6">
		{@render children()}
	</div>
{/if}
