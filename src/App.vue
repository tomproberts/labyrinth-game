<template>
  <h1>
    Labyrinth-Game
    <a class="github-link" href="https://github.com/tomproberts/labyrinth-game">
      <i class="fab fa-github"/>
    </a>
  </h1>
  <br/>
  <MazeView :maze="maze" :goalX="goalX" :goalY="goalY" @won="won"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MazeView from './components/MazeView.vue';
import { generateMaze } from '@/generation/mazegen';

@Options({
  components: {
    MazeView
  }
})
export default class App extends Vue {
  get maze() {
    return generateMaze(10, 7);
  }

  get goalX() {
    return 5;
  }

  get goalY() {
    return 6;
  }

  private won() {
    alert('Won');
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

.github-link {
  margin-left: 0.5rem;
  color: #e0e0e0;
}
</style>
