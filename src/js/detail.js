import './common.js'
import Header from '../components/Header';
import Collect from '../components/Collect/index.js';
import NewsFrame from '../components/NewsFrame/index.js';

import '../scss/detail.scss'

((doc) => {
    const oApp = doc.getElementById('app');
    const currentNews = JSON.parse(window.localStorage.getItem('current_news')) || {};
    const newsCollect = JSON.parse(window.localStorage.getItem('news_collect')) || [];
    const init = () => {
        runder();
        bindEvent()
    }

    function runder() {
        const header = Header.tpl({
            text: '新闻详情',
            showLeft: true,
            showRight: false

        })

        const newsFrame = NewsFrame.tpl(currentNews.url)
        const collectStatus = newsCollect.some(news => news.uniquekey == currentNews.uniquekey)
        const collect = Collect.tpl(collectStatus);

        oApp.innerHTML += header + collect + newsFrame;
    }

    function bindEvent() {
        Header.bindEvent()
        Collect.bindEvent(setCollect)
    }

    function setCollect(status) {
        const newsCollect = JSON.parse(window.localStorage.getItem('news_collect')) || [];
        if (status) {
            newsCollect.push(currentNews)
            window.localStorage.setItem('news_collect', JSON.stringify(newsCollect))

        } else {
            const newsArr = newsCollect.filter((item) => {
                return item.uniquekey !== currentNews.uniquekey
            })
            window.localStorage.setItem('news_collect', JSON.stringify(newsArr))
        }
    }


    init()
})(document)