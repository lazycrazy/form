import Input from './input.vue'
import Checkbox from './checkbox.vue'
import Radio from './radio.vue'
import Switch from './switch.vue'
import Select from './select.vue'
import Upload from './upload.vue'
import Date from './date.vue'
import Timepicker from './timepicker.vue'
import Rate from './rate.vue'
import Slider from './slider.vue'
import Grid from './grid.vue'
import Text from './text.vue'
import Table from './table.vue'

const components = [Input, Checkbox, Radio, Switch, Select, Upload, Date, Timepicker, Rate, Slider, Grid, Text, Table]

const Config = {
  install(Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component)
    })
  }
}

export default Config
