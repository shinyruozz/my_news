import "../scss/index.scss";
import "./common.js";

import { news_type } from "../utils/data";
import IndexModel from "../models/index";

import Header from "../components/Header";
import Nav from "../components/Nav"
import NewsList from "../components/NewsList";
import Loading from '../components/Loading'

import { isScrollBottom } from "../utils/tools";
((doc) => {

    const oApp = doc.getElementById('app');

    const config = {
        type: 'top',
        pageNum: 0,
        index: 0,
        count: 10
    }
    let cacheNewsData = {};
    let oList = null,
        isRenew = true;

    const init = async() => {
        runder();
        await setNewsList(config.type)
        bindEvent();
    };



    function bindEvent() {
        window.addEventListener('scroll', isScrollBottom.bind(this, scrollBottom), false);
        Nav.bindEvent(setType);
        Header.bindEvent()
        NewsList.bindEvent(oList, setDetail)
    }



    function runder() {
        const header = Header.tpl({
            showLeft: false,
            text: '新闻头条',
            showRight: true
        })
        const nav = Nav.tpl(news_type);
        const listWrap = NewsList.wrapTpl();
        oApp.innerHTML += (header + nav + listWrap);
        oList = doc.getElementsByClassName('news-list')[0];
    }

    function setType(type) {
        config.type = type;
        window.scrollTo(0, 0);
        config.pageNum = 0;
        config.index = 0;
        oList.innerHTML = ''
        setNewsList(type)
    }


    function setDetail(obj) {
        const { curPage, curIdx } = obj,
        type = config.type;
        const detail = cacheNewsData[type][curPage][curIdx];
        window.location.href = './detail.html'
        window.localStorage.setItem("current_news", JSON.stringify(detail));
    }

    // 获取分类数据
    async function setNewsList(type) {
        const { pageNum, count } = config
        if (!cacheNewsData[type]) {
            cacheNewsData[type] = await IndexModel.getNewsList(type, count);
        }
        runList(cacheNewsData[type][pageNum])
    }

    // 渲染列表
    function runList(data) {
        const newsList = NewsList.newItemTpl({
            pageNum: config.pageNum
        }, data);

        Loading.remove();
        isRenew = true;
        oList.innerHTML += newsList;
        NewsList.showImg()
    }

    // 滑动到底部刷新数据
    function scrollBottom() {
        if (!isRenew) return;

        const { type, pageNum } = config;

        if (cacheNewsData[type] && pageNum >= cacheNewsData[type].length - 1) {
            Loading.add(oList, {
                text: '没有更多数据',
                loadingShow: false
            });
            return


        }
        isRenew = false

        config.pageNum = pageNum + 1;
        Loading.add(oList, {
            text: '正在加载',
            loadingShow: true
        });
        setTimeout(function() {
            setNewsList(type)
        }, 1000)

    }




    init();

})(document);