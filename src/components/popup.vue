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
          <table>
            <tr v-for='player in data.players'>
              <td style="display: flex; align-items: center;">
                <icon :code='player.code' ></icon>
                <h4>{{player.name}}:</h4>
              </td>
              <td class="t-col">{{player.terrCount}} Territories</td>
              <td class="c-col">{{player.cards.length}} {{player.cards.length === 1 ? "card" : "cards"}}</td>
            </tr>
          </table>
          <span>A set of cards is worth {{data.cardValue}} troops.</span>
        </div>

        <div v-else-if="['cards', 'turnInCards'].includes(type)" class="modal-body">
          <div v-if="type === 'turnInCards'">
            <label>Please select three cards to turn in: </label>
          </div>
          <div v-if="data.cards.length > 0" class="cardBox">
            <card v-for="(card, key) in data.cards" :value="card+1" :key="key" :index="key" :clickHandler="selectCard"></card>
          </div>
          <div v-else><i>You do not have any cards!</i></div>
          <span class="right"><i>{{error}}</i></span>
        </div>

        <div v-else-if="'passTroops' === type" class="modal-body">
          <label>Enter number of Troops to pass:</label>
          <input id="troops" type="number" :min="data.min" :max="data.max" v-model.number="troops">
          <label>This will leave behind:</label>
          <span>{{behind}}</span><br>
          <i class="right">{{error}}</i>
        </div>

        <div v-else-if="['dicepick1', 'dicepick2'].includes(type)" class="modal-body center" >
          <input type="radio" id="one" :value="1" v-model="dice">
          <label for="one">{{content[0]}}</label>
          <input type="radio" id="two" :value="2" v-model="dice">
          <label for="two">{{content[1]}}</label>
          <input v-if="data.threeDice" type="radio" id="three" :value="3" v-model="dice">
          <label v-if="data.threeDice" for="three">{{content[2]}}</label>
          <div class="alwaysRoll" v-if="'dicepick2' === type" >
            <input type="checkbox" v-model="autoroll">
            <label>Always roll {{dice === 2 ? "two dice" : "one die"}} and don't ask again</label>
            <br><span>You can change this at any time in <code>Menu &#10140; My Settings</code></span>
          </div>
        </div>

        <div v-else-if="'settings' === type" class="modal-body center">
          <label>Your name is: </label>
          <input type="text" v-model="name" maxlength="22" id="nameInput">
          <br><br>
          <input type="checkbox" id="autoroll" v-model="autoroll">
          <label for="autoroll">Auto-roll dice when you are being attacked:</label><br>
          <input type="radio" id="two" :value="2" v-model="dice" :disabled="!autoroll">
          <label for="two" :class="{'disabled': !autoroll}">Two</label>
          <input type="radio" id="one" :value="1" v-model="dice" :disabled="!autoroll">
          <label for="one" :class="{'disabled': !autoroll}">One</label>
        </div>

        <div v-else-if="type === 'input'" class="modal-body">
          <label>{{content}}</label>
          <input type="text" v-model="name" maxlength="22" id="nameInput">
          <i>{{error}}</i>
        </div>

        <div v-else-if="content" class="modal-body"><!-- used by: confirm, info, callback -->
          <div v-html="content"></div>
          <div v-if="data === 'passRules'">
            <strong>Rules for passing: </strong><a href="#" @click="showRules">{{rulesShown ? "hide" : "show" }}</a>
            <ul v-if="rulesShown">
              <li>You have a total of 3 passes - 2 short passes and one long pass (or 3 short passes)</li>
              <li>A short pass is between 2 of your territories that border each other.</li>
              <li>A long pass is between 2 of your territories that are connected by a continuous line of territories that you own.</li>
            </ul>
          </div>
        </div>
        <div v-else></div> <!-- used by: alert, yesno, yesnocancel, callback -->

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
        <div v-else-if="['input', 'turnInCards', 'settings'].includes(type)" class="modal-footer">
          <button type="button" class="btn btn-default" id="esc" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" id="etr" @click="checkValue">Ok</button>
        </div>
        <div v-else-if="'dicepick1' === type" class="modal-footer">
          <button type="button" class="btn btn-default" id="esc" @click="action(0)">Cancel</button>
          <button type="button" class="btn btn-primary" id="etr" @click="action(dice)">Ok</button>
        </div>
        <div v-else-if="'dicepick2' === type" class="modal-footer">
          <button type="button" class="btn btn-primary" id="etr" @click="dicepick2">Ok</button>
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
          <button type="button" class="btn btn-success" id="etr" @click="checkTroops">Ok</button>
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
// All Types: alert, confirm, input, players, yesno, yesnocancel, info,
// dicepick1, dicepick2, passtroop, callback, cards, turnInCards, settings
    props: [
      'title', 'content', 'type', 'show', 'closePopup',
      'action', 'size', 'data', 'repeatAttack'
    ],
    data(){
      return {
        name: '',
        error: '',
        dice: null,
        troops: null,
        selectedCards: [],
        autoroll: false,
        rulesShown: false
      }
    },
    mounted(){
      window.addEventListener('keyup', this.keyHandler)
    },
    destroyed(){
      window.removeEventListener('keyup', this.keyHandler)
    },
    methods: {
      showRules(){
        this.rulesShown = !this.rulesShown
      },
      checkValue(){
        if (this.type === 'input')
          this.checkName()
        else if (this.type === 'turnInCards')
          this.checkCards()
        else if (this.type === 'settings')
          this.setSettings()
      },
      checkCards(){
        if (this.selectedCards.length != 3)
          this.error = "Please select exactly three cards"
        else {
          let values = this.selectedCards.map((val) => this.data.cards[val])//LOW values
          if (gameData.checkSetOfCards(values)){
            this.$store.dispatch('turnInCards', {ids: this.selectedCards, values})
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
      checkTroops(){
        if (this.troops < this.data.min || this.troops > this.data.max)
          this.error = "must be between "+this.data.min+" and "+this.data.max
        else {
          this.error = ''
          this.action(this.troops)
        }
      },
      setSettings(){
        if (this.name != this.data.currentPlayer.name)
          this.$store.commit("changeName", {id: this.data.id, name: this.name})
        const autoroll = this.autoroll ? this.dice : false
        this.$store.commit("setAutoroll", {id: this.data.id, value: autoroll})
        this.name = ''
        this.closePopup()
      },
      dicepick2(){
        if (this.autoroll)
          this.$store.commit("setAutoroll", {id: this.data.id, value: this.dice})
        this.action(this.dice)
      },
      cancel(){
        if (this.type === 'input'){
          this.error = ''
          this.name = ''
          this.action(false)
        }
        else if (this.type === "turnInCards"){
          if (this.data.currentPlayer.mustTurnInCards){
            this.error = "You cannot cancel. You MUST turn in cards"
          }
          else{
            this.selectedCards = []
            this.error = ''
            this.action()
          }
        }
        else if (this.type === 'settings'){
          this.name = ''
          this.closePopup()
        }
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
        if (this.show){
          if (event.key === "Enter") {
            $('#etr').click()
          }
          else if (event.key === "Escape"){
            $('#esc').click()
          }
        }
        else {
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
          return "popup-big"
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
        else if (['dicepick1', 'dicepick2'].includes(this.type)){
          this.autoroll = false
          this.dice = this.data.dice
        }
        else if ('settings' === this.type){
          this.dice = this.data.currentPlayer.settings.autoroll ? this.data.currentPlayer.settings.autoroll : 2
          this.autoroll = this.data.currentPlayer.settings.autoroll ? true : false
          this.name = this.data.currentPlayer.name
        }
        else if ('info' === this.type)
          this.rulesShown = false
      }
    }
  }
</script>

<style scoped>
  table {
    margin: auto;
  }
  td h4{
    display: inline-block;
    margin: 10px 20px;
  }
  .t-col {
    width: 102px;
    text-align: right;
    padding-right: 20px;
  }
  .c-col {
    width: 46px;
  }
  .right {
    float: right;
  }
  .modal {
    transition: all 0.4s ease;
    overflow: scroll;
  }
  label {
    margin-right: 8px;
  }
  .alwaysRoll {
    margin-top: 10px;
  }
  .alwaysRoll span {
    font-size: 11px;
  }
  .alwaysRoll label {
    margin: 0;
    font-size: 13px;
  }
  .disabled {
    color: #999;
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
