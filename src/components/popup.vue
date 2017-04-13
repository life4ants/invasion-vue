<template>
  <modal :show="show" effect="fade" :backdrop="false" :id="id">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">
        {{title}}
      </h4>
    </div>

    <!-- ====== body: ======= -->
    <div v-if="type === 'players'" slot="modal-body" class="modal-body">
      <ul>
        <li v-for='player in players'>
          <icon :code='player.code' ></icon>
          <h4>{{player.name}}:</h4>
          <div>{{player.terrCount}} Territories</div>
        </li>
      </ul>
    </div>
    <div v-else-if="type === 'alert'" slot="modal-body"></div>
    <div v-else slot="modal-body" class="modal-body" v-html="content"></div>

    <!-- =====. footer: ====== -->
    <div v-if="type === 'yesno'" slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-primary" @click="action">Yes</button>
      <button type="button" class="btn btn-danger" @click="close">No</button>
    </div>
    <div v-else slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="close">Ok</button>
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
      action: {},
      size: {}
    },
    computed: {
      id(){
        if (this.size === 'small')
          return 'popup'
        else if (this.size === 'small-center')
          return 'popup-center'
        else
          return null
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
