<template>
  <div>
      add
    {{data}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      data: state => state.added.data
    })
  },
  mounted() {
    const data = JSON.parse(window.localStorage.getItem('cs')) || {}
    this.getbj(data)
  },
  methods: {
    ...mapActions({
      getbj: 'added/sj'
    })
  }
}
</script>
