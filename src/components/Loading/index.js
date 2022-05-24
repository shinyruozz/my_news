import tpl from './index.tpl'
import './index.scss'
import { replaceTpl } from '../../utils/tools';

export default {
    name: "Loading",
    add(oList, options) {
        const oLoading = oList.getElementsByClassName('loading-wrap')[0];
        if (oLoading) {
            return
        }
        oList.innerHTML += replaceTpl(tpl, {
            text: options.text,
            loadingShow: options.loadingShow ? 'block' : 'none'
        })
    },

    remove() {
        const oLoading = document.getElementsByClassName('loading-wrap')[0];
        oLoading && oLoading.remove()
    }
}