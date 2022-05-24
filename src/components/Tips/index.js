import './index.scss'
import tpl from './index.tpl'
import { replaceTpl } from '../../utils/tools'

export default {
    name: 'Tips',
    add(text) {
        return replaceTpl(tpl, {
            text: text
        })
    },
    remove() {
        const oTips = document.getElementsByClassName('tips')[0];
        oTips && oTips.remove()
    }
}