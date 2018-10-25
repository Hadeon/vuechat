<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.memeUrl"/>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postMeme" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A MEME
          </a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import parse from 'xml-parser'
  export default {
    data () {
      return {
        'memeUrl': null
      }
    },
    mounted () {
      this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
        this.memeUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
      })
    },
    methods: {
      postMeme () {
        this.$root.$firebaseRefs.meme.push({
          'url': this.memeUrl,
          'comment': this.title,
          'info': 'Posted by Eli on Tuesday',
          'created_at': -1 * new Date().getTime()
        })
          .then(this.$router.push('/'))
      }
    }
  }
</script>
<style>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>