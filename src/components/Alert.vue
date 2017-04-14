<template>
  <div
    v-show="show"
    v-bind:class="{
      'alert':		true,
      'alert-success':(type == 'success'),
      'alert-warning':(type == 'warning'),
      'alert-info':	(type == 'info'),
      'alert-danger':	(type == 'danger'),
      'top': 			(placement === 'top'),
      'top-right': 	(placement === 'top-right'),
      'slide-in': true
    }"
    v-bind:style="{width:width}"
    role="alert">
    <button v-show="dismissable" type="button" class="close"
      @click="close">
      <span>&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    type: {
      type: String
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true,
      twoWay: true
    },
    duration: {
      type: Number,
      default: 0
    },
    width: {
      type: String
    },
    placement: {
      type: String
    },
    close: {}
  },
  watch: {
    show (val) {
      if (this._timeout) clearTimeout(this._timeout)
      if (val && Boolean(this.duration)) {
        this._timeout = setTimeout(() => { this.close() }, 4000)
      }
    }
  }
}
</script>

<style scoped>

.slide-in{
  animation: 4s slidein;
}

@keyframes slidein {
  0% {
    right: -200px;
  }
  5%{
    right: 50px;
  }
  95%{
    right: 50px;
  }

  100% {
    right: -200px;
  }
}

.alert.top {
  position: fixed;
  top: 65px;
  margin: 0 auto;
  left: 0;
  z-index: 1050;
}
.alert.top-right {
  position: fixed;
  top: 65px;
  z-index: 1050;
}
</style>
