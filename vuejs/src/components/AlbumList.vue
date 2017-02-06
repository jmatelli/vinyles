<template>
  <div>
    <album-item
      v-for="item in list"
      v-bind:album="item">
    </album-item>
  </div>
</template>

<script>
import AlbumItem from './AlbumItem.vue'

export default {
  name: 'album-list',

  components: {
    AlbumItem,
  },

  props: ['list'],
}
</script>
