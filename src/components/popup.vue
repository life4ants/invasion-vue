<template>
  <modal :show.sync="show" effect="fade" :width="width" :backdrop="false">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">
        {{title}}
      </h4>
    </div>

    <!-- ====== body: ======= -->
    <div v-if="type === 'info'" slot="modal-body" class="modal-body">{{content}}</div>
    <div v-if="type === 'players'" slot="modal-body" class="modal-body">
      <ul>
        <li v-for='player in players'>
          <icon :code='player.code' ></icon>
          <h4>{{player.name}}:</h4>
          <div>{{player.terrCount}} Territories</div>
        </li>
      </ul>
    </div>

    <!-- =====. footer: ====== -->
    <div v-if="['info', 'players'].includes(type)" slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="close">Close</button>
    </div>
    <div v-if="type === 'confirm'" slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="close">cancel</button>
      <button type="button" class="btn btn-primary" @click="action">Ok</button>
    </div>
  </modal>
</template>

<script>
  import { modal } from 'vue-strap'
  import icon from './icon'

  export default {
    name: 'popup',
    components: {
      modal, icon
    },

    props: {
      title: {
        type: String,
        default: 'No Title'
      },
      content: {
        type: String,
        default: 'no content'
      },
      type: {
        type: String,
        default: 'info'
      },
      players: {},
      show: {},
      close: {},
      action: {}
    },
    computed: {
      width(){
        if (this.type === 'players')
          return 350
        else
          return 400
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li h4{
    flex-basis: 90px;
    text-align: left;
    margin-left: 15px;
  }
  li div {
    margin-left: 5px;
  }
</style>
