<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-1">
        <form @submit.prevent="submit" class="card is-fullwidth">
          <div class="card-header">
            <h2 class="card-header-title">
              Search Spotify for Songs
            </h2>
          </div>
          <div class="card-content">
            <div class="notification is-danger" v-for="error in flashMessages.errors">
              <button class="delete"></button>
              <p>{{error.message}}</p>
            </div>

            <label class="label">Search Term</label>
            <p class="control">
              <input class="input" type="text" v-model="searchTerm" placeholder="Search Term" name="search">
            </p>
          </div>

          <footer class="card-footer">
            <a class="card-footer-item" href="/songs/create">Back</a>
            <button class="card-footer-item">Search</button>
          </footer>
        </form>
      </div>

      <div class="column is-6">
        <template v-if="showTracks">
          <div class="panel">
            <div class="panel-block" v-for="track in tracks">
              <div class="is-flex is-space-between">
                <p class="song-details">
                  <strong>{{track.artists[0].name}}</strong> - {{track.name}}
                </p>

                <div class="song-actions">
                  <form action="/songs" method="POST">
                    {{ csrfField }}
                    <input type="hidden" value="{{ track.artists[0].name }}" name="artist">
                    <input type="hidden" value="{{ track.name }}" name="title">
                    <input type="hidden" value="{{ track.external_urls.spotify }}" name="spotify_link">
                    <input type="hidden" value="{{ track.id }}" name="spotify_id">
                    <button href="/song-details" class="button">Add</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="has-text-centered">
            <span class="fa fa-refresh fa-spin fa-3x fa-fw"></span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      searchTerm: '',
      flashMessages: {
        errors: []
      },
      tracks: [],
    };
  },
  computed: {
    showTracks() {
      return this.tracks.length && !this.isLoading;
    }
  },
  methods: {
    submit() {
      this.isLoading = true;

      fetch(`/songs/search-spotify?search=${this.searchTerm}`, {
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'xmlhttprequest'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          this.isLoading = false;

          if (data.tracks) {
            this.tracks = data.tracks;
          }
        });
    }
  },
};
</script>
