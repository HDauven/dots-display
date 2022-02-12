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
	let dotID = 0;

	onMount(async () => {
		dotsCanvasContract = instantiateDotsCanvasContract();
		totalNrOfDots = await totalNumberOfDots(dotsCanvasContract);
		if (totalNrOfDots <= 0) {
			dotID = 0;
		} else {
			const newestDotMetadata = await getDotsMetadata(dotsCanvasContract, totalNrOfDots);
			imageURL = newestDotMetadata.image;
			dotName = newestDotMetadata.name;
			dotID = totalNrOfDots;
		}

		dotsCanvasContract.on('CanvasMinted', async (_owner, id) => {
			// Update Dot counter
			totalNrOfDots = await totalNumberOfDots(dotsCanvasContract);

			// Update Dot NFT
			const newDotMetadata = await getDotsMetadata(dotsCanvasContract, id);
			imageURL = newDotMetadata.image;
			dotName = newDotMetadata.name;
			dotID = id;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<!-- Total number of Dot NFTs: {totalNrOfDots} -->
		</h1>
		{#if imageURL}
			<img src={imageURL} alt={dotName} />
			<h1>{dotName} - #{dotID}</h1>
		{:else}
			<h1>No Dots minted yet.</h1>
		{/if}
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
