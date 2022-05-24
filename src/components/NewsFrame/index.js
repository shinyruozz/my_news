import { replaceTpl } from '../../utils/tools'
import './index.scss'
import tpl from './index.tpl'

export default {
    name: 'NewsFrame',
    tpl(news_url) {
        return replaceTpl(tpl, {
            news_url: news_url
        })
    }
}