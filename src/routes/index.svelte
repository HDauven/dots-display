<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from 'svelte';
	import Counter from '$lib/Counter.svelte';
	import { getDotsMetadata, instantiateDotsCanvasContract, totalNumberOfDots } from '../lib/dots';

	let totalNrOfDots = 0;
	let dotsCanvasContract = null;
	let imageURL = '';
	let dotName = '';

	onMount(async () => {
		dotsCanvasContract = instantiateDotsCanvasContract();
		totalNrOfDots = await totalNumberOfDots(dotsCanvasContract);
		const newestDotMetadata = await getDotsMetadata(dotsCanvasContract, totalNrOfDots);
		imageURL = newestDotMetadata.image;
		dotName = newestDotMetadata.name;

		dotsCanvasContract.on('CanvasMinted', async (_owner, id) => {
			// Update Dot counter
			totalNrOfDots = await totalNumberOfDots(dotsCanvasContract);

			// Update Dot NFT
			const newDotMetadata = await getDotsMetadata(dotsCanvasContract, id);
			imageURL = newDotMetadata.image;
			dotName = newDotMetadata.name;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		Total number of dots: {totalNrOfDots}
		{#if imageURL}
			<img src={imageURL} alt={dotName} />
			<p>{dotName}</p>
		{/if}
		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
