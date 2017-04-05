<template>
 <div class="flex">
    <div class="iconbox">
      <label>Choose Color:</label>
      <div>
        <button v-for="icon in renderColors" class="square" @click="changeIcon(icon)">
          <icon :code='icon'></icon>
        </button>
      </div>
    </div>
    <div class="iconbox">
      <label>Choose Shape:</label>
      <div>
        <button v-for="icon in renderShapes" class="square" @click="changeIcon(icon)">
          <icon :code='icon'></icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import icon from './icon'

  export default{
    name: 'iconbox',
    components: {
      icon
    },
    props: ['code', 'changeIcon'],
    data(){
      return {
      }
    },
    methods:{
    },
    computed: {
      renderColors(){
        let shape = (this.code - (this.code % 10))
        let items = []
        for(let i=0; i<10; i++){
          items.push(shape+i)
        }
        return items
      },
      renderShapes(){
        let color = this.code % 10
        let items = []
        for(let i=0; i<100; i+=10){
          items.push(color+i)
        }
        return items
      }
    }
  }
</script>

<style>

  .iconbox{
    flex: 1 1 225px;
  }

  .square{
    height: 37px;
    width: 45px;
    padding: 6px;
  }

  .square:hover{
    background-color: #999;
    margin-top: -4px;
    height: 39px;
  }
</style>
