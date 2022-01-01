import { createApp } from "vue"
import pressie from "./pressie.js"
import { createPopper } from '@popperjs/core'

window.createApp = createApp
window.pressie = pressie
window.createPopper = createPopper