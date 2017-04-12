<template>
  <span v-html='insertShape'></span>
</template>

<script>
  import gameData from './game_data.js'
  export default {
    name: 'icon',
    data(){
      return {

      }
    },
    props: {
      size: {
        type: Number,
        default: 25
      },
      code: {
        type: Number
      }
    },
    computed: {
      insertShape() {
        const shapes = [["cx='12.5' cy='13.5' r='12.5'", "circle"], //circle cy='13.5'
          ["y='1' width='24' height='24'", "rect"], //square
          ["d='m0,25 25,0 -12.5,-24z'", "path"], //tryangle
          ["d='m0,13.5 12.5,-12.5 12.5,12.5 -12.5,12.5z'", "path"], //diamond m0,13.5
          ["d='m25,1 -9,12 9,12 -25,0 9,-12 -9,-12 z'", "path"], //hourglass
          ["d='m0.5,5 c 4,-8 12,1 12,1 0,0 8,-9 12,-1 3,8 -5,14 -12,20 -7,-6 -15,-12 -12,-20 z'", "path"], //heart
          ["d='m0.5,1 12,5.5 12,-5.5 -5.5,12 5.5,12 -12,-5.5 -12,5.5 5.5,-12 z'", "path"], //4-sided star m0.5,1 12,5.5
          ["d='m8.8,1 0,8.8 -8.8,0 0,7 8.8,0 0,8.8 7,0 0,-8.8 8.8,0 0,-7 -8.8,0 0,-8.8 -7,0z'", "path"], //cross
          ["d='m12,1 a 12,12 0 0 0 -12,12 12.108591,12.108591 0 0 0 12,12.2168 12.108591,12.108591 0 0 0 12.10937,-12.10937 A 12.108591,12.108591 0 0 0 12,1 Z m -0.0742,5.0918 a 7.0915475,7.0915475 0 0 1 7.08984,7.0918 7.0915475,7.0915475 0 0 1 -7.08984,7.09179 7.0915475,7.0915475 0 0 1 -7.0918,-7.09179 7.0915475,7.0915475 0 0 1 7.0918,-7.0918 z'", "path"], //donut
          ["d='m23,20.5 -6.75,-3.94 0.45,7.86 -3.14,-7.16 -4.26,6.63 1.67,-7.64 -7.34,2.86 5.84,-5.2 -7.62,-2 7.77645,-0.77 -4.99,-6.1 6.75,3.94 -0.45,-7.86 3.14,7.16 4.26,-6.63 -1.67,7.64 7.34,-2.86 -5.84,5.2 7.62,2 -7.78,0.77 z'", "path"] // star m23,20.5
          ]
        const color = this.code % 10;
        const shape = (this.code - (this.code % 10))/10;

        if (this.code < 0)
          return " <svg version='1.1' height='20' width='20' viewbox='0 0 26.5 28.5'><"+shapes[0][1]+" style='fill:none; stroke:black; stroke-width:1.5; stroke-linejoin:round'"+shapes[0][0] + "/></svg>"
        else
    return " <svg version='1.1' height='"+this.size+"' width='"+this.size+"' viewbox='0 0 26.5 28.5'><"+shapes[shape][1]+" style='fill:"+gameData.mycolors[color]+"; stroke:black; stroke-width:1.5; stroke-linejoin:round'"+shapes[shape][0] + "/></svg>";
      }
    }
  }

</script>

<style scoped>

</style>