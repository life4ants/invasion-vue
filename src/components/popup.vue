<template>
  <div>
  <div :class="{modal: true, fade: true, in: show}" :style="{ display: show ? 'block' : 'none' }" :id="id">
    <div class="modal-dialog">
      <div class="modal-content" >
        <div class="modal-header">
          <h4 class="modal-title">
            {{title}}
          </h4>
        </div>

        <!-- ====== body: ======= -->
        <div v-if="type === 'players'" class="modal-body">
          <ul>
            <li v-for='player in players'>
              <icon :code='player.code' ></icon>
              <h4>{{player.name}}:</h4>
              <div>{{player.terrCount}} Territories</div>
            </li>
          </ul>
        </div>
        <div v-else-if="['alert', 'yesno'].includes(type)" slot="modal-body"></div>
        <div v-else-if="type === 'input'" class="modal-body">
          <label>{{content}}</label>
          <input type="text" v-model="name" :autofocus="true" maxlength="22">
          <i>{{error}}</i>
        </div>
        <div v-else class="modal-body" v-html="content"></div> <!-- used by: confirm, info -->

        <!-- =====. footer: ====== -->
        <div v-if="type === 'yesno'" class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">No</button>
          <button type="button" class="btn btn-primary" @click="action">Yes</button>
        </div>
        <div v-else-if="type === 'input'" class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" @click="checkName">Ok</button>
        </div>
        <div v-else-if="type === 'confirm'" class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">Cancel</button>
          <button type="button" class="btn btn-danger" @click="action(false)">Don't Save</button>
          <button type="button" class="btn btn-primary" @click="action(true)">Save Game</button>
        </div>
        <div v-else class="modal-footer"> <!-- used by: alert,players, info -->
          <button type="button" class="btn btn-default" @click="close">Ok</button>
        </div>
      </div>
    </div>
  </div>
  <div :class="{'modal-backdrop': show, in: show}"></div>
  </div>
</template>

<script>
  import icon from './icon'

  export default {
    name: 'popup',
    components: {
      icon
    },
    data(){
      return {
        name: '',
        error: ''
      }
    },
    methods: {
      checkName(){
        if (this.name.length < 3)
          this.error = 'name must be 3-22 letters long'
        else {
          const name = this.name
          this.name = ''
          this.error = ''
          this.action(true, name)
        }
      },
      cancel(){
        this.error = ''
        this.name = ''
        this.action(false)
      }
    },
    props: [
      'title', 'content', 'type', // alert, confirm, input, players, yesno, info
      'players', 'show', 'close',
      'action', 'size'
    ],
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
  .modal {
    transition: all 0.4s ease;
  }
</style>
