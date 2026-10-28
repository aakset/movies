<script>
	import MovieCard from '#lib/components/MovieCard.svelte';
	let { data } = $props();
</script>

<div class="container">
	<h1>Movies</h1>
	<p>These images were stolen from the internet... my bad!</p>
	<a href="/movies/create"><button class="btn btn-primary">add new movie</button></a>
	<br>
	<br>
	<div class="row">
		{#each data.movies as movie}
			<div class="col-6 col-md-3">
				<MovieCard {movie}></MovieCard>
			</div>
		{/each}
	</div>
</div>
