<template>
  <div class="container">
    <table>
      <tr v-for="y in height" :key="y">
        <td v-for="(x, index) in maze[y - 1]" :key="index"
            :class="`wall${x}`" :id="(index === goalX && y === goalY + 1) ? 'goal' : ''">
          <div :class="(charX === index && charY + 1 === y) ? 'active' : ''"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    maze: Array,
    goalX: Number,
    goalY: Number
  },
  emits: ['stop', 'start'],
  watch: {
    maze() {
      /* If the maze changes, reset character position and started status. */
      this.charX = 0;
      this.charY = 0;
      this.started = false;
    }
  }
})
export default class MazeView extends Vue {
  maze!: number[][];
  goalX!: number;
  goalY!: number;

  private charX = 0;
  private charY = 0;
  private started = false;

  get height() {
    return this.maze.length;
  }

  private checkWin() {
    if (this.charX === this.goalX && this.charY === this.goalY) {
      this.$emit('stop');
    }
  }

  mounted() {
    const arrowUp = () => {
      if (this.maze[this.charY][this.charX] & 2) {
        this.charY -= 1;
        this.checkWin();
      }
    };

    const arrowDown = () => {
      if (this.maze[this.charY][this.charX] & 1) {
        this.charY += 1;
        this.checkWin();
      }
    };

    const arrowLeft = () => {
      if (this.maze[this.charY][this.charX] & 8) {
        this.charX -= 1;
        this.checkWin();
      }
    };

    const arrowRight = () => {
      if (this.maze[this.charY][this.charX] & 4) {
        this.charX += 1;
        this.checkWin();
      }
    };

    const start = () => {
      if (!this.started) {
        this.started = true;
        this.$emit('start');
      }
    };

    /* Bind arrowkeys to character movement */
    window.addEventListener('keydown', function(e) {
      start();
      switch (e.key) {
        case 'ArrowUp':
          arrowUp();
          break;
        case 'ArrowDown':
          arrowDown();
          break;
        case 'ArrowLeft':
          arrowLeft();
          break;
        case 'ArrowRight':
          arrowRight();
          break;
        default:
          break;
      }
    });
  }
}
</script>

<style scoped>
.container {
  max-height: 80%;
}

table {
  color: #e0e0e0;
  margin: auto;
  border-collapse: collapse;
  max-width: 80%;
}

td {
  width: 30px;
  height: 30px;
  border: solid 1px #e0e0e0;
}

.wall1, .wall3, .wall5, .wall7, .wall9, .wall11, .wall13, .wall15 {
  border-bottom-width: 0;
}

.wall2, .wall3, .wall6, .wall7, .wall10, .wall11, .wall14, .wall15 {
  border-top-width: 0;
}

.wall4, .wall5, .wall6, .wall7, .wall12, .wall13, .wall14, .wall15 {
  border-right-width: 0;
}

.wall8, .wall9, .wall10, .wall11, .wall12, .wall13, .wall14, .wall15 {
  border-left-width: 0;
}

.active {
  background: #fff;
  border-radius: 100%;
  width: 40%;
  height: 40%;
  margin: 30%;
  box-shadow: 0 0 5px 5px #fff, 0 0 10px 10px #aff;
  transition-duration: 0.1s;
}

#goal {
  background: none;
  border-radius: 100%;
  box-shadow: 3px 3px 1px 1px #fff, 1px 1px 2px 2px #aff;
}
</style>
