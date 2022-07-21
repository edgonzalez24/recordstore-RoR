<template>
  <div class="max-w-md m-auto py-10">
    <h3 class="font-mono font-regular text-3xl mb-4">
      Add a new Record
    </h3>

    <form @submit.prevent="addRecord">
      <div class="mb-6">
        <label>Title</label>
        <input
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          autofocus
          autocomplete="off"
          placeholder="Type a record title"
          v-model="newRecord.title"
        />
      </div>
      <div class="mb-6">
        <label>Year</label>
        <input
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          autofocus
          autocomplete="off"
          placeholder="Type a record year"
          v-model="newRecord.year"
        />
      </div>
      <div class="mb-6">
        <label>Artist</label>
        <select
          id="artist"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          v-model="newRecord.artist"
        >
          <option disabled value="">Select an artists</option>
          <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>
        </select>
        <p class="mt-4">Don't see an artists? <router-link to="/artists" class="text-blue-500 underline">Create one</router-link></p>
      </div>
      <button
        type="submit"
        class="font-sans px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
          Add Record
      </button>
    </form>

    <hr class="border border-gray-200 my-6">

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="record in records" :key="record.id">
        <div class="flex items-center justify-between flex-wrap">
          <p class="flex-1 font-mono font-semibold flex items-center ">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>record vinyl</title><path d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" ></path></svg>
            {{ record.title }} &mdash; {{ record.year }}
          </p>
          <p class="flex-1 font-mono font-semibold">
            {{ getArtist(record) }}
          </p>

          <button class="bg-tranparent text-sm hover:bg-blue-500 hover:text-white text-blue-500 border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editRecord(record)">Edit</button>

          <button class="bg-transprent text-sm hover:bg-red-500 text-red-500 hover:text-white no-underline font-bold py-2 px-4 rounded border border-red-500"
          @click.prevent="removeRecord(record)">Delete</button>
        </div>
        <div v-if="record.id === editedRecord.id">
          <form action="" @submit.prevent="updateRecord(record)">
            <div class="mb-6 p-4 bg-white rounded border border-gray-200 mt-4">
              <div class="mb-6">
                <label class="label">Title</label>
                <input class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" v-model="record.title">
              </div>
              <div class="mb-6">
                <label class="label">Year</label>
                <input class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" v-model="record.year">
              </div>
              <div class="mb-6">
                <select id="artist_update" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" v-model="record.artist_id">
                  <option v-for="artist in artists" :key="artist.id" :value="artist.id" >{{ artist.name }}</option>
                </select>
              </div>
              <input type="submit" value="Update" class="bg-transparent text-sm hover:bg-blue-500 hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Records',
  data () {
    return {
      artists: [],
      records: [],
      newRecord: [],
      editedRecord: ''
    }
  },
  async mounted () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      try {
        const { data: artists } = await this.$http.secured.get('/api/v1/artists')
        this.artists = artists
        const { data: records } = await this.$http.secured.get('/api/v1/records')
        this.records = records
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Something went wrong.')
      }
    }
  },
  methods: {
    getArtist (record) {
      const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id)
      let artist
      recordArtistValues.forEach(function (element) {
        artist = element.name
      })
      return artist
    },
    async addRecord () {
      const value = this.newRecord
      if (!value) {
        return
      }
      try {
        const { data } = await this.$http.secured.post('/api/v1/records/', { record: { title: this.newRecord.title, year: this.newRecord.year, artist_id: this.newRecord.artist } })
        this.records.push(data)
        this.newRecord = ''
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot create record.')
      }
    },
    async removeRecord (record) {
      try {
        await this.$http.secured.delete(`/api/v1/records/${record.id}`)
        this.records.splice(this.records.indexOf(record), 1)
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot delete record.')
      }
    },
    editRecord (record) {
      this.editedRecord = record
    },
    async updateRecord (record) {
      try {
        await this.$http.secured.patch(`/api/v1/records/${record.id}`, { record: { title: record.title, year: record.year, artist_id: record.artist } })
        this.editedRecord = ''
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Cannot update record.')
      }
    }
  }
}
</script>
