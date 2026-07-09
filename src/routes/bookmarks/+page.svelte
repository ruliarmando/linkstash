<script lang="ts">
	import { enhance } from '$app/forms';
	import { parseTags } from '$lib/tags';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let searchQuery = $state('');
	let selectedTag = $state<string | null>(null);

	let allTags = $derived([...new Set(data.bookmarks.flatMap((b) => parseTags(b.tags)))].sort());

	let filteredBookmarks = $derived(
		data.bookmarks.filter((b) => {
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch =
				query === '' ||
				b.title.toLowerCase().includes(query) ||
				b.url.toLowerCase().includes(query);
			const matchesTag = selectedTag === null || parseTags(b.tags).includes(selectedTag);
			return matchesSearch && matchesTag;
		})
	);
</script>

<div class="mx-auto max-w-3xl">
	<h1 class="text-2xl font-bold text-slate-900">Your Bookmarks</h1>

	<form
		method="POST"
		action="?/create"
		use:enhance
		class="mt-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row"
	>
		<input
			name="url"
			type="url"
			placeholder="https://..."
			required
			class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
		/>
		<input
			name="title"
			placeholder="Title (leave blank to auto-fetch)"
			class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
		/>
		<input
			name="tags"
			placeholder="tags, comma, separated"
			class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
		/>
		<button
			type="submit"
			class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
		>
			Save
		</button>
	</form>

	{#if form?.missing}
		<p class="mt-2 text-sm text-red-600">A URL is required.</p>
	{/if}

	{#if data.bookmarks.length > 0}
		<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<input
				bind:value={searchQuery}
				placeholder="Search bookmarks..."
				class="w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
			/>

			{#if allTags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag (tag)}
						<button
							type="button"
							onclick={() => (selectedTag = selectedTag === tag ? null : tag)}
							class="rounded-full border px-3 py-1 text-xs font-medium transition {selectedTag === tag
								? 'border-slate-900 bg-slate-900 text-white'
								: 'border-slate-300 text-slate-600 hover:bg-slate-100'}"
						>
							{tag}
						</button>
					{/each}
					{#if selectedTag}
						<button
							type="button"
							onclick={() => (selectedTag = null)}
							class="text-xs font-medium text-slate-500 underline hover:text-slate-800"
						>
							clear filter
						</button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	{#if data.bookmarks.length === 0}
		<p class="mt-8 text-sm text-slate-500">No bookmarks yet — add your first one above.</p>
	{:else if filteredBookmarks.length === 0}
		<p class="mt-8 text-sm text-slate-500">No bookmarks match your search/filter.</p>
	{:else}
		<ul class="mt-6 flex flex-col gap-2">
			{#each filteredBookmarks as b (b.id)}
				<li
					class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
				>
					<div class="min-w-0">
						<a
							href={b.url}
							target="_blank"
							rel="noopener"
							class="truncate font-medium text-slate-900 hover:underline"
						>
							{b.title}
						</a>
						{#if parseTags(b.tags).length > 0}
							<div class="mt-1 flex flex-wrap gap-1">
								{#each parseTags(b.tags) as tag (tag)}
									<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
										{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={b.id} />
						<button type="submit" class="shrink-0 text-sm text-slate-400 hover:text-red-600">
							delete
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>
