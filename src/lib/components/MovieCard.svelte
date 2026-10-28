<script>
	let { movie } = $props();
</script>

<div class="movie-card">
	<img src={movie.poster} alt={movie.title} class="img-fluid" />
	<div class="movie-info">
		<a href="/movies/{movie._id}"><h3>{movie.title}</h3></a>
		<p>Year: {movie.year}</p>
		<p>Runtime: {movie.duration}</p>
	</div>
</div>

<style>
    .movie-card {
        background-color: grey;
        color: white;
        padding: 30px;
        margin-bottom: 30px;
    }
    
</style>
