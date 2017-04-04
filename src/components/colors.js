const colorsMixin = {
  data(){
    return {
      mycolors: ["#OOOOOO", "#FF00FF", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#764710", "#FF8000"]
    }
  }
}

//- export it as a plugin
export default {
  install (Vue, options) {
    Vue.mixin(colorsMixin)
  }
}
