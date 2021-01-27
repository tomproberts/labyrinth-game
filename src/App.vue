<template>
  <h1>
    Labyrinth-Game
    <a class="github-link" href="https://github.com/tomproberts/labyrinth-game">
      <i class="fab fa-github"/>
    </a>
  </h1>
  <p>{{ timeElapsed }}</p>
  <MazeView :maze="maze" :goalX="goalX" :goalY="goalY" @stop="stop" @start="startTimer"/>
  <p>
    <button @click="regenerateMaze(10, 7)">Easy</button>
    <button @click="regenerateMaze(20, 15)">Medium</button>
    <button @click="regenerateMaze(30, 20)">Hard</button>
  </p>
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
  private maze = generateMaze(10, 7);
  private timePassed = 0;
  private timer = 0;
  private goalX = 5;
  private goalY = 5;

  private regenerateMaze(width: number, height: number) {
    this.maze = generateMaze(width, height);

    /* Randomly generate goal anywhere on the maze. */
    this.goalX = Math.floor(Math.random() * (width - 1));
    this.goalY = Math.floor(Math.random() * (height - 1));

    /* Reset timer and positions */
    clearInterval(this.timer);
    this.timePassed = 0;
  }

  get timeElapsed(): string {
    const minutes = Math.floor(this.timePassed / 60);
    const seconds = this.timePassed % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  private stop() {
    clearInterval(this.timer); // Stop timer
    alert(`Completed! It only took you ${this.timePassed} seconds!`);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.timePassed += 1;
    }, 1000);
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

button {
  margin: 0 0.2rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 2px;
  padding: 0.2rem 0.5rem;
  color: #202020;
}

button:hover {
  background-color: #d0d0d0;
}
</style>
