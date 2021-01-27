<template>
  <div>
    <table>
      <tr v-for="y in height" :key="y">
        <td v-for="(x, index) in maze[y - 1]" :key="index"
            :class="`wall${x}`">
          <div :class="(charX === index && charY + 1 === y) ? 'active' : ''"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    maze: Array
  }
})
export default class MazeView extends Vue {
  maze!: number[][];
  private charX = 0;
  private charY = 0;

  get height() {
    return this.maze.length
  }

  get width() {
    return this.height > 0 ? this.maze[0].length : 0
  }

  mounted() {
    /* Bind arrowkeys to character movement */
    const arrowUp = () => {
      this.charY -= 1
    }

    const arrowDown = () => {
      this.charY += 1
    }

    const arrowLeft = () => {
      this.charX -= 1
    }

    const arrowRight = () => {
      this.charX += 1
    }

    window.addEventListener('keydown', function(e) {
      switch (e.key) {
        case 'ArrowUp':
          arrowUp()
          break
        case 'ArrowDown':
          arrowDown()
          break
        case 'ArrowLeft':
          arrowLeft()
          break
        case 'ArrowRight':
          arrowRight()
          break
        default:
          break
      }
    })
  }
}
</script>

<style scoped>
table {
  color: #e0e0e0;
  margin: auto;
  border-collapse: collapse;
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
}
</style>
