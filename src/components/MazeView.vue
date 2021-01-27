<template>
  <div>
    <table>
      <tr v-for="y in height" :key="y">
        <td v-for="(x, index) in maze[y - 1]" :key="index" :class="`wall${x}`"/>
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

  get height() {
    return this.maze.length
  }

  get width() {
    return this.height > 0 ? this.maze[0].length : 0
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
</style>
