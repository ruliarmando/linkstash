<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
	<h1 class="text-xl font-bold tracking-tight text-slate-900">LinkStash</h1>
	<p class="mt-1 text-sm text-slate-500">Log in or create an account</p>

	<form method="POST" action="?/signInEmail" use:enhance class="mt-6 flex flex-col gap-4">
		<label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
			Email
			<input
				type="email"
				name="email"
				required
				class="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
			Password
			<input
				type="password"
				name="password"
				required
				class="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm font-medium text-slate-700">
			Name <span class="font-normal text-slate-400">(for registration only)</span>
			<input
				name="name"
				class="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
			/>
		</label>

		<div class="mt-2 flex gap-3">
			<button
				type="submit"
				class="flex-1 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
			>
				Log in
			</button>
			<button
				type="submit"
				formaction="?/signUpEmail"
				class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
			>
				Register
			</button>
		</div>
	</form>

	{#if form?.message}
		<p class="mt-4 text-sm text-red-600">{form.message}</p>
	{/if}
</div>
