import tpl from "./index.tpl";

import './index.scss';
import { replaceTpl } from '../../utils/tools'


export default {
    name: "Header",
    tpl(options) {
        return replaceTpl(tpl, {
            url: options.url,
            showLeft: options.showLeft ? 'block' : 'none',
            text: options.text,
            showRight: options.showRight ? 'block' : 'none',
        })
    },
    bindEvent() {
        const oIconLeft = document.getElementsByClassName('icon-left')[0];
        const oIconRight = document.getElementsByClassName('icon-right')[0];
        oIconLeft && oIconLeft.addEventListener('click', function() {
            window.history.back()
        }, false)

        oIconRight && oIconRight.addEventListener('click', function() {
            window.location.href = './collections.html'
        }, false)
    }
};