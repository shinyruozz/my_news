import '../scss/collections.scss'
import './common.js'
import Header from '../components/Header';
import Tips from '../components/Tips'
import NewsList from '../components/NewsList'



;
((doc) => {

    const oApp = doc.getElementById('app');
    const newsCollect = JSON.parse(window.localStorage.getItem('news_collect')) || [];
    let oList = null;
    const init = () => {
        runder()
        bindEvent()

    }

    function runder() {
        let tips = '';
        const header = Header.tpl({
            text: '我的收藏',
            showLeft: true,
            showRight: false
        })

        const listWrap = NewsList.wrapTpl()

        if (newsCollect.length == 0) {
            tips = Tips.add('目前没有收藏')
        }

        oApp.innerHTML += header + listWrap + tips;

        oList = doc.getElementsByClassName('news-list')[0];
        oList.innerHTML = NewsList.newItemTpl({
            pageNum: -1,

        }, newsCollect);
        NewsList.showImg()
    }

    function bindEvent() {
        Header.bindEvent()
        NewsList.bindEvent(oList, setDetail)
    }


    function setDetail(obj) {
        const { curIdx } = obj;

        window.localStorage.setItem('current_news', JSON.stringify(newsCollect[curIdx]))
        window.location.href = './detail.html';
    }

    init()
})(document)