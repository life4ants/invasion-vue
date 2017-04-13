<template>
 <div class="flex">
    <div class="iconbox">
      <label>Choose Color:</label>
      <div>
        <button v-for="icon in renderColors" class="btn btn-default" @click="changeIcon(icon)">
          <icon :code='icon'></icon>
        </button>
      </div>
    </div>
    <div class="iconbox">
      <label>Choose Shape:</label>
      <div>
        <button v-for="icon in renderShapes" class="btn btn-default" @click="changeIcon(icon)">
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

<style scoped>

  .iconbox{
    flex: 1 1 225px;
  }

  .btn{
    height: 37px;
    width: 45px;
    padding: 6px;
    border-radius: 0;
  }

  .btn:hover{
    background-color: #999;
  }
</style>
