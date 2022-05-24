import { replaceTpl } from '../../utils/tools';
import './index.scss'
import tpl from './index.tpl';

export default {
    name: 'Collect',
    tpl(isFull) {
        return replaceTpl(tpl, {
            style_class: isFull ? 'full' : 'o'
        })
    },


    bindEvent(setCollect) {
        const oCollect = document.getElementsByClassName('collect')[0];
        oCollect.addEventListener('click', this.toggle.bind(oCollect, setCollect), false)
    },

    toggle(callback) {
        const className = this.className;


        if (className == 'collect full') {
            this.className = 'collect o'
            callback(false)
        } else {
            this.className = 'collect full'
            callback(true)

        }
    }

}