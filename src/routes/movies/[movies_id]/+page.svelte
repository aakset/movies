<script>
	let { data } = $props();
</script>

<div class="container mt-3">
	<a href="/movies">Back</a>

	{#if data.movie !== null}
		<h1>{data.movie.title}</h1>

		<div class="row">
			<div class="col-md-5">
				<img src={data.movie.poster} alt={data.movie.title} class="img-fluid" />
			</div>

			<!-- right column: info -->
			<div class="col-md-7">
				<p>Jahr: {data.movie.year}</p>
				<p>Dauer: {data.movie.duration}</p>

				{#if data.movie.actors}
					<p>Cast:</p>
					<ul>
						{#each data.movie.actors as actor}
							<li>{actor}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{:else}
		<p>Movie not found.</p>
	{/if}
</div>
