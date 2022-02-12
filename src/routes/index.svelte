<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from 'svelte';
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
		Total number of dots: {totalNrOfDots}
		{#if imageURL}
			<img src={imageURL} alt={dotName} />
			<p>{dotName}</p>
		{/if}
	</h1>
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
</style>
