function replaceTpl(tpl, replaceObj) {
    return tpl().replace(/{{(.*?)}}/g, function(node, key) {
        return replaceObj[key]
    })
}

function isScrollBottom(callback) {
    if (_getScrollHeight() <= _getScrollTop() + _getWindowHeight()) {
        callback()
    }
}

function findNewsItem(tar) {
    while (tar.className.split(' ')[0] !== 'news-item') {
        tar = tar.parentNode;
    }

    return tar
}


/* 获取滚动条的距离  */
function _getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

/* 获取整个 文档的高度, (包括滚动条的距离) */
function _getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

/*  获取窗口的高度 不包含 border 和 margin */
function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

export {
    replaceTpl,
    isScrollBottom,
    findNewsItem
}