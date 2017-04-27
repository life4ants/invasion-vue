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
        <div v-if="'players' === type" class="modal-body">
          <ul>
            <li v-for='player in players'>
              <icon :code='player.code' ></icon>
              <h4>{{player.name}}:</h4>
              <div>{{player.terrCount}} Territories</div>
            </li>
          </ul>
        </div>
        <div v-else-if="'passTroops' === type" class="modal-body">
          <label>Enter number of Troops to pass:</label>
          <input id="troops" type="number"  @keyup.enter="action(troops)"
                :min="data.min" :max="data.max" v-model.number="troops">
          <label>This will leave behind:</label>
          <span>{{behind}}</span>
        </div>
        <div v-else-if="['dicepick1', 'dicepick2'].includes(type)" class="modal-body center" >
          <input type="radio" id="one" :value="1" v-model="dice">
          <label for="one">One</label>
          <input type="radio" id="two" :value="2" v-model="dice">
          <label for="two">Two</label>
          <input v-if="data" type="radio" id="three" :value="3" v-model="dice">
          <label v-if="data" for="three">Three</label>
        </div>
        <div v-else-if="['alert', 'yesno', 'yesnocancel', 'callback'].includes(type)"></div>
        <div v-else-if="type === 'input'" class="modal-body">
          <label>{{content}}</label>
          <input type="text" v-model="name" maxlength="22" id="nameInput" @keyup.enter="checkName" @keyup.esc="cancel">
          <i>{{error}}</i>
        </div>
        <div v-else class="modal-body" v-html="content"></div> <!-- used by: confirm, info -->

        <!-- =====. footer: ====== -->
        <div v-if="'yesno' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">No</button>
          <button type="button" class="btn btn-primary" @click="action">Yes</button>
        </div>
        <div v-else-if="'yesnocancel' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">Cancel</button>
          <button type="button" class="btn btn-success" @click="action(false)">No</button>
          <button type="button" class="btn btn-primary" @click="action(true)">Yes</button>
        </div>
        <div v-else-if="'input' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" @click="checkName">Ok</button>
        </div>
        <div v-else-if="['dicepick1', 'dicepick2'].includes(type)" class="modal-footer">
          <button v-if="'dicepick1' === type" type="button" class="btn btn-default" @click="action(0)">Cancel</button>
          <button type="button" class="btn btn-primary" @click="action(dice)">Ok</button>
        </div>
        <div v-else-if="'confirm' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">Cancel</button>
          <button type="button" class="btn btn-danger" @click="action(false)">Don't Save</button>
          <button type="button" class="btn btn-primary" @click="action(true)">Save Game</button>
        </div>
        <div v-else-if="'callback' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="action">Ok</button>
        </div>
        <div v-else-if="'passTroops' === type" class="modal-footer">
          <button type="button" class="btn btn-default" @click="action(troops)">Ok</button>
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
    props: [
      'title', 'content', 'type', // alert, confirm, input, players, yesno, info, dicepick1, dicepick2
      'players', 'show', 'close',
      'action', 'size', 'data'
    ],
    data(){
      return {
        name: '',
        error: '',
        dice: null,
        troops: null
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
      },
      test(i){
        console.log(i)
      },
      keyHandler(event) {
        if (event.key === "Enter") {
          if (['yesno', 'callback'].includes(this.type))
            this.action()
          else if ('yesnocancel' === this.type)
            this.action(true)
          else if (['dicepick1', 'dicepick2'].includes(this.type))
            this.action(this.dice)
          else if (['info', 'players', 'alert'].includes(this.type))
            this.close()
        }
        if (event.key === "Escape"){
          if ("dicepick1" === this.type)
            this.action(0)
          else if ("dicepick2" === this.type){}
          else
            this.close()
        }
      }
    },
    computed: {
      id(){
        if (this.size === 'small')
          return 'popup'
        else if (this.size === 'small-center')
          return 'popup-center'
        else
          return null
      },
      behind(){
        return this.data.max+1 - this.troops
      }
    },
    watch: {
      show(){
        switch(this.type){
          case "input":
            setTimeout(() => $("#nameInput").trigger("focus"), 0)
            break
          case "passTroops":
            setTimeout(() => $("#troops").trigger("focus"), 0)
            break
          case undefined:
            window.removeEventListener('keyup', this.keyHandler)
            break
          default:
            window.addEventListener('keyup', this.keyHandler)
        }
      },
      title(){
        if (['dicepick1', 'dicepick2'].includes(this.type))
          this.dice = this.data ? 3 : 2
        else if ('passTroops' === this.type)
          this.troops = this.data.max
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
  label {
    margin-right: 8px;
  }
  .center {
    text-align: center;
  }
  #troops {
    width: 45px;
  }
</style>
