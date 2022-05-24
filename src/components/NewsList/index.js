import './index.scss';
import tpl from './tpl/index.tpl'
import type0 from './tpl/type0.tpl'
import type1 from './tpl/type1.tpl'
import type2 from './tpl/type2.tpl'
import type3 from './tpl/type3.tpl'
import { replaceTpl, findNewsItem } from '../../utils/tools';

export default {
    name: 'NewsList',
    wrapTpl() {

        return tpl()
    },

    newItemTpl(options, NewsList) {
        let newsItems = '';
        NewsList.forEach((data, index) => {
            let typeTpl = null;
            if (!data.thumbnail_pic_s) {
                typeTpl = type0;
            } else if (data.thumbnail_pic_s && !data.thumbnail_pic_s02) {
                typeTpl = type1;
            } else if (data.thumbnail_pic_s02 && !data.thumbnail_pic_s03) {
                typeTpl = type2;
            } else if (data.thumbnail_pic_s03) {
                typeTpl = type3;
            }


            newsItems += replaceTpl(typeTpl, {
                pageNum: options.pageNum,
                index: index,
                title: data.title,
                thumbnail_pic_s: data.thumbnail_pic_s,
                thumbnail_pic_s02: data.thumbnail_pic_s02,
                thumbnail_pic_s03: data.thumbnail_pic_s03,
                author_name: data.author_name,
                date: data.date
            })
        })

        return newsItems
    },

    showImg() {
        const imgs = document.querySelectorAll('img');
        [...imgs].forEach(img => {
            img.onload = function() {
                this.style.opacity = 1;
            }
        })
    },
    bindEvent(oList, setDetail) {
        oList.addEventListener('click', function(e) {
            const tar = e.target;

            const newsItem = findNewsItem(tar),
                curPage = newsItem.dataset.page,
                curIdx = newsItem.dataset.index;
            setDetail({
                curPage,
                curIdx
            })
        }, false)

    }



}