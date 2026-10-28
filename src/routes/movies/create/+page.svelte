<script>
  let { form } = $props();
</script>

<div class="container">
<br>
<a href="/movies">Back</a>
<h1>Add a movie</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">title</label>
    <input name="title" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">year</label>
    <input name="year" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">duration</label>
    <input name="duration" class="form-control" type="text" />
  </div>
  <button type="submit" class="btn btn-primary"> Add Movie </button>
</form>


{#if form?.success}
  <p>Movie created</p>
{/if}
</div>