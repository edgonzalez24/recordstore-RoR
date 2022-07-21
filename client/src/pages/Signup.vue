<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-gray-100 shadow rounded">
      <h3 class="text-2xl mb-6 text-gray-500 font-bold">Sign Up</h3>
      <form @submit.prevent="signUp">
        <div class="mb-6">
          <label for="email" class="text-gray-700 uppercase">E-mail Address</label>
          <input
            type="text"
            v-model="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="joh-doe@fake.com"
            autocomplete="off"
          >
        </div>
        <div class="mb-6">
          <label class="text-gray-700 uppercase">Password</label>
          <input
            type="password"
            v-model="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="********"
            autocomplete="off"
          >
        </div>
        <div class="mb-6">
          <label class="text-gray-700 uppercase">Password Confirmation</label>
          <input
            type="password"
            v-model="password_confirmation"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="********"
            autocomplete="off"
          >
        </div>
        <button
          type="submit"
          class="font-sans px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
            Sign Up
        </button>

        <div class="my-4">
          <router-link to="/" class="underline text-blue-600">
            Sign In
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: null,
      password: null,
      password_confirmation: null
    }
  },
  mounted () {
    if (localStorage.signIn) {
      this.$router.replace('/records')
    }
  },
  methods: {
    async signUp () {
      try {
        const { data } = await this.$http.plain.post('/signup', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        if (data.csrf) {
          localStorage.csrf = data.csrf
          localStorage.signedIn = true
          this.$router.replace('/records')
        }
      } catch (error) {
        this.$toast.error(error.response.data.error || 'Oopps! Something went wrong.')
        delete localStorage.csrf
        delete localStorage.signedIn
      }
    }
  }
}
</script>

<style>

</style>
