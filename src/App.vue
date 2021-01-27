<template>
  <h1>Labyrinth-Game</h1>
  <br/>
  <MazeView :maze="maze"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MazeView from './components/MazeView.vue'
import { generateMaze } from '@/generation/mazegen'

@Options({
  components: {
    MazeView
  }
})
export default class App extends Vue {
  get maze() {
    return generateMaze(6, 5)
  }
}
</script>

<style>
body {
  background-color: #202020;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e0e0e0;
  margin-top: 60px;
}

h1 {
  font-weight: lighter;
}
</style>
