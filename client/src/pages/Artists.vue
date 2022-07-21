<template>
  <div class="max-w-md m-auto py-10">
    <h3 class="font-mono font-regular text-3xl mb-4">
      Add a new Artist
    </h3>

    <form @submit.prevent="addArtist">
      <div class="mb-6">
        <input
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          autofocus
          autocomplete="off"
          placeholder="Type an artist name"
          v-model="newArtist.name"
        />
      </div>
      <button
        type="submit"
        class="font-sans px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
          Add Artist
      </button>
    </form>

    <hr class="border border-gray-200 my-6">

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="artist in artists" :key="artist.id">
        <div class="flex items-center justify-between flex-wrap">
          <p class="flex-1 font-mono font-semibold flex items-center ">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 20 20" width="20" height="20"><title>music artist</title><path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
            {{ artist.name }}
          </p>

          <button class="bg-tranparent text-sm hover:bg-blue-500 hover:text-white text-blue-500 border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editArtist(artist)">Edit</button>

          <button class="bg-transprent text-sm hover:bg-red-500 text-red-500 hover:text-white no-underline font-bold py-2 px-4 rounded border border-red-500"
          @click.prevent="removeArtist(artist)">Delete</button>
        </div>
        <div v-if="artist === editedArtist">
          <form action="" @submit.prevent="updateArtist(artist)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <input class="input" v-model="artist.name" />
              <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue-500 hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Artists',
  data () {
    return {
      artists: [],
      newArtist: [],
      error: '',
      editedArtist: ''
    }
  },
  async mounted () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      try {
        const { data } = await this.$http.secured.get('/api/v1/artists')
        this.artists = data
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Something went wrong.')
      }
    }
  },
  methods: {
    async addArtist () {
      const value = this.newArtist
      if (!value) {
        return
      }
      try {
        const { data } = await this.$http.secured.post('/api/v1/artists/', { artist: { name: this.newArtist.name } })
        this.artists.push(data)
        this.newArtist = ''
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot create artist.')
      }
    },
    async removeArtist (artist) {
      try {
        await this.$http.secured.delete(`/api/v1/artists/${artist.id}`)
        this.artists.splice(this.artists.indexOf(artist), 1)
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot delete artist.')
      }
    },
    editArtist (artist) {
      this.editedArtist = artist
    },
    async updateArtist (artist) {
      this.editedArtist = ''
      try {
        await this.$http.secured.patch(`/api/v1/artists/${artist.id}`, { artist: { title: artist.name } })
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot update artist.')
      }
    }
  }
}
</script>

<style>

</style>
