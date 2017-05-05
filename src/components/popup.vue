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
        <div v-else-if="['cards', 'turnInCards'].includes(type)" class="modal-body">
          <div v-if="type === 'turnInCards'">
            <label>Please select three cards to turn in: </label>
          </div>
          <div v-if="data.length > 0" class="cardBox">
            <card v-for="(card, key) in data" :value="card" :key="key" :index="key" :clickHandler="selectCard"></card>
          </div>
          <div v-else><i>You do not have any cards!</i></div>
          <span style="float: right;"><i>{{error}}</i></span>
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
          <button type="button" class="btn btn-default" id="esc" @click="closePopup">No</button>
          <button type="button" class="btn btn-primary" id="etr" @click="action">Yes</button>
        </div>
        <div v-else-if="'yesnocancel' === type" class="modal-footer">
          <button type="button" class="btn btn-default" id="esc" @click="closePopup">Cancel</button>
          <button type="button" class="btn btn-success" @click="action(false)">No</button>
          <button type="button" class="btn btn-primary" id="etr" @click="action(true)">Yes</button>
        </div>
        <div v-else-if="['input', 'turnInCards'].includes(type)" class="modal-footer">
          <button type="button" class="btn btn-default" id="esc" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" id="etr" @click="checkValue">Ok</button>
        </div>
        <div v-else-if="['dicepick1', 'dicepick2'].includes(type)" class="modal-footer">
          <button v-if="'dicepick1' === type" type="button" class="btn btn-default" id="esc" @click="action(0)">Cancel</button>
          <button type="button" class="btn btn-primary" id="etr" @click="action(dice)">Ok</button>
        </div>
        <div v-else-if="'confirm' === type" class="modal-footer">
          <button type="button" class="btn btn-default" id="esc" @click="closePopup">Cancel</button>
          <button type="button" class="btn btn-danger" @click="action(false)">Don't Save</button>
          <button type="button" class="btn btn-primary" id="etr" @click="action(true)">Save Game</button>
        </div>
        <div v-else-if="['callback', 'cards'].includes(type)" class="modal-footer">
          <button type="button" class="btn btn-default" id="etr" @click="action">Ok</button>
        </div>
        <div v-else-if="'passTroops' === type" class="modal-footer">
          <button v-if="title === 'Pass Troops'" type="button" class="btn btn-default" id="esc" @click="action(0)">Cancel</button>
          <button type="button" class="btn btn-success" id="etr" @click="action(troops)">Ok</button>
        </div>
        <div v-else class="modal-footer"> <!-- used by: alert,players, info -->
          <button type="button" class="btn btn-default" id="etr" @click="closePopup">Ok</button>
        </div>
      </div>
    </div>
  </div>
  <div :class="{'modal-backdrop': show, in: show}"></div>
  </div>
</template>

<script>
  import icon from './icon'
  import card from './card'
  import gameData from './game_data.js'

  export default {
    name: 'popup',
    components: {
      icon, card
    },
// All Types: alert, confirm, input, players, yesno, yesnocancel, info, dicepick1, dicepick2, passtroop, callback, cards, turnInCards
    props: [
      'title', 'content', 'type',
      'players', 'show', 'closePopup',
      'action', 'size', 'data', 'repeatAttack'
    ],
    data(){
      return {
        name: '',
        error: '',
        dice: null,
        troops: null,
        selectedCards: []
      }
    },
    mounted(){
      window.addEventListener('keyup', this.keyHandler)
    },
    destroyed(){
      window.removeEventListener('keyup', this.keyHandler)
    },
    methods: {
      checkValue(){
        if (this.type === 'input')
          this.checkName()
        else
          this.checkCards()
      },
      checkCards(){
        if (this.selectedCards.length != 3)
          this.error = "Please select exactly three cards"
        else {
          let cards = this.selectedCards.sort().map((val) => this.data[val]-1)//LOW values
          if (gameData.checkSetOfCards(cards)){
            this.$store.dispatch('turnInCards', {ids: this.selectedCards, values: cards})
            this.error = ''
            this.selectedCards = []
            this.action()
          }
          else
            this.error = "Those cards don't match!"
        }
      },
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
        this.selectedCards = []
        this.error = ''
        this.name = ''
        this.action(false)
      },
      selectCard(i){
        if ($("#card"+i).hasClass('selected')){
          $("#card"+i).removeClass('selected')
          this.selectedCards.splice(this.selectedCards.indexOf(i), 1)
        }
        else {
          $("#card"+i).addClass('selected')
          this.selectedCards.push(i)
        }
      },
      keyHandler(event) {
        console.log(event.key+" was pressed")
        if (this.show){
          if (event.key === "Enter") {
            $('#etr').click()
          }
          else if (event.key === "Escape"){
            $('#esc').click()
          }
        }
        else {
          console.log("no popup")
          if (event.key === "r")
            this.repeatAttack()
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
      type(){
        if (this.type === "input")
          setTimeout(() => $("#nameInput").trigger("focus"), 0)
        else if (this.type === 'passTroops'){
          this.troops = this.data.max
          setTimeout(() => $("#troops").trigger("focus"), 0)
        }
        else if (['dicepick1', 'dicepick2'].includes(this.type))
          this.dice = this.data ? 3 : 2
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
    overflow: scroll;
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
  .cardBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
