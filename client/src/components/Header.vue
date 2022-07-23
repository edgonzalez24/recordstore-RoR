<template>
  <nav class="bg-white shadow dark:bg-gray-800">
    <div
      class="
        container
        px-6
        py-4
        mx-auto
        md:flex md:justify-between md:items-center
      "
    >
      <div class="flex items-center justify-between">
        <div>
          <router-link
            class="
              text-2xl
              font-bold
              text-gray-800
              transition-colors
              duration-200
              transform
              dark:text-white
              lg:text-3xl
              hover:text-gray-700
              dark:hover:text-gray-300
            "
            to="/"
            >RecordStore</router-link
          >
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            type="button"
            class="
              text-gray-500
              dark:text-gray-200
              hover:text-gray-600
              dark:hover:text-gray-400
              focus:outline-none focus:text-gray-600
              dark:focus:text-gray-400
            "
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div class="items-center md:flex">
        <div class="flex flex-col md:flex-row md:mx-6">
          <router-link
            class="
              my-1
              text-sm
              font-medium
              text-gray-700
              transition-colors
              duration-200
              transform
              dark:text-gray-200
              hover:text-blue-500
              dark:hover:text-blue-400
              md:mx-4 md:my-0
            "
            to="/"
            v-if="!signedIn"
            >Sign in</router-link
          >
          <router-link
            class="
              my-1
              text-sm
              font-medium
              text-gray-700
              transition-colors
              duration-200
              transform
              dark:text-gray-200
              hover:text-blue-500
              dark:hover:text-blue-400
              md:mx-4 md:my-0
            "
            to="/signup"
            v-if="!signedIn"
            >Sign up</router-link
          >
          <router-link
            class="
              my-1
              text-sm
              font-medium
              text-gray-700
              transition-colors
              duration-200
              transform
              dark:text-gray-200
              hover:text-blue-500
              dark:hover:text-blue-400
              md:mx-4 md:my-0
            "
            to="/records"
            v-if="signedIn"
            >Records</router-link
          >
          <router-link
            class="
              my-1
              text-sm
              font-medium
              text-gray-700
              transition-colors
              duration-200
              transform
              dark:text-gray-200
              hover:text-blue-500
              dark:hover:text-blue-400
              md:mx-4 md:my-0
            "
            to="/artists"
            v-if="signedIn"
            >Artists</router-link
          >
          <a
            class="
              my-1
              text-sm
              font-medium
              text-gray-700
              transition-colors
              duration-200
              transform
              dark:text-gray-200
              hover:text-blue-500
              dark:hover:text-blue-400
              md:mx-4 md:my-0
            "
            href="#"
            v-if="signedIn"
            @click.prevent="signOut"
            >Sign out</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      signedIn: false
    }
  },
  watch: {
    '$route' () {
      this.signedIn = localStorage.signedIn
    }
  },
  methods: {
    async signOut () {
      try {
        await this.$http.secured.delete('/signin')
        delete localStorage.csrf
        delete localStorage.signedIn
        this.$router.replace('/')
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Something went wrong.')
      }
    }
  }
}
</script>
