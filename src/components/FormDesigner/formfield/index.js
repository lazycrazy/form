import FieldCheckbox from './field-checkbox.vue'
import FieldDate from './field-date.vue'
import FieldInput from './field-input.vue'
import FieldRadio from './field-radio.vue'
import FieldSelect from './field-select.vue'
import FieldSwith from './field-switch.vue'
import FieldTree from './field-tree.vue'
import FieldUpload from './field-upload.vue'
import FieldCascader from './field-cascader.vue'
import FieldTimePicker from './field-timepicker.vue'
import FieldRate from './field-rate.vue'
import FieldSlider from './field-slider.vue'
import FieldGrid from './field-grid.vue'
import FieldText from './field-text.vue'

const components = [FieldCheckbox, FieldDate, FieldInput, FieldRadio, FieldSelect, FieldSwith, FieldTree, FieldUpload, FieldCascader, FieldTimePicker, FieldRate, FieldSlider, FieldGrid, FieldText]

const Formfields = {
  install(Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component)
    })
  }
}

export default Formfields
