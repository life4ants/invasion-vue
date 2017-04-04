<template>
  <modal :show.sync="show" effect="fade" width="400" :backdrop=false>
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">
        {{title}}
      </h4>
    </div>
    <div slot="modal-body" class="modal-body">{{content}}</div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="close">cancel</button>
      <button type="button" class="btn btn-primary" @click="action">Ok</button>
    </div>
  </modal>
</template>

<script>
  import { modal } from 'vue-strap'

  export default {
    name: 'popup',
    components: {
      modal
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
      show: {},
      close: {},
      action: {}
    },

    data(){
      return {

      }
    },
    methods: {
      openPopup(){
        this.modalIsOpen = true
        console.log('yes')
      }
    }
  }
</script>