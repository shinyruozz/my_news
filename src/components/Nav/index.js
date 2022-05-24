import tpl from './tpl/index.tpl';
import navItemTpl from './tpl/navItem.tpl';
import './index.scss';

import { replaceTpl } from '../../utils/tools';



export default {
    name: 'Nav',

    tpl(data) {
        let navItems = '';

        data.forEach((item, idx) => {
            navItems += replaceTpl(navItemTpl, {
                type: item.type,
                isCurrent: !idx ? 'current' : "",
                text: item.chs
            })
        })

        return replaceTpl(tpl, {
            items: navItems
        })
    },
    bindEvent(setType) {
        const oList = document.getElementsByClassName('nav-list')[0],
            oLis = oList.getElementsByClassName('nav-item');

        oList.addEventListener('click', this.navItemClick.bind(this, oLis, setType), false)

    },
    navItemClick(oLis, setType) {
        let ev = arguments[2] || window,
            target = ev.target,
            className = target.className;
        if (className == 'item-lk') {

            const oLi = target.parentNode,
                type = oLi.dataset.type;
            for (let i = 0; i < oLis.length; i++) {
                oLis[i].classList.toggle('current', oLis[i] == oLi)
            }

            setType(type)

        }
    }
}