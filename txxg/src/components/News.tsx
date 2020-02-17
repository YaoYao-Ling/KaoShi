import React, { useState, useEffect } from 'react'
import {getProvinceNews} from '../services/index'
import {AreaType} from '../utils/types'
import styles from './Hospital.module.scss'
interface ProvinceType{
    [key: string]: string
}
interface ItemType{
    "title": string,
    "publish_time": string,
    "news_url": string,
    "cms_id": string
}
const ProvinceList:ProvinceType = {
    "hb": "湖北",
    "zj": "浙江",
    "gd": "广东",
    "henan": "河南",
    "hn": "湖南",
    "ah": "安徽",
    "jiangxi": "江西",
    "cq": "重庆",
    "jiangsu": "江苏",
    "cd": "四川",
    "sd": "山东",
    "bj": "北京",
    "sh": "上海",
    "fj": "福建",
    "heilongjiang": "黑龙江",
    "xian": "陕西",
    "guangxi": "广西",
    "hebei": "河北",
    "yn": "云南",
    "hainan": "海南",
    "ln": "辽宁",
    "shanxi": "山西",
    "tj": "天津",
    "guizhou": "贵州",
    "gansu": "甘肃",
    "jilin": "吉林",
    "neimenggu": "内蒙古",
    "ningxia": "宁夏",
    "xinjiang": "新疆",
    "hk": "香港",
    "qinghai": "青海",
    "taiwan": "台湾",
    "macau": "澳门",
    "xizang": "西藏"
}


const News = (props: {areaTree: AreaType[]}) => {
    let [province, setProvince] = useState<string>('hb');
    let [items, setItems] = useState<ItemType []>([])

    let changeArea = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setProvince(e.target.value);
        getNews();
    }

    useEffect(()=>{
        getNews();
    }, [])

    const getNews = ()=>{
        getProvinceNews(province).then((res:any)=>{
            res = res.data;
            if (res.errno === 0){
                setItems(res.data.items);
            }
        })
    }

    console.log('news...', items, props.areaTree);

    let curIndex = props.areaTree.findIndex(item=>item.name === ProvinceList[province]);
    let curPro = props.areaTree[curIndex];

    // 拼接各省份选项
    const provinceHtml = [];
    for (let key in ProvinceList){
        provinceHtml.push(<option value={key}>{ProvinceList[key]}</option>);
    }
    return <div className={styles.new}>
        <div>
            <h3 className={styles.news}>
                <span><span className={styles.city}>{ProvinceList[province]}</span>疫情速报</span>
                <select id="select-area" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>changeArea(e)}>
                <option value="hb">切换城市</option>
                {provinceHtml}
            </select>
            </h3>
        </div>
        <div>
            <dl>
                <dt className={styles.one}>{curPro && curPro.today.confirm}</dt>
                <dd>新增确诊</dd>
            </dl>
            <dl>
                <dt className={styles.two}>{curPro && curPro.total.confirm}</dt>
                <dd>累计确诊</dd>
            </dl>
            <dl>
                <dt className={styles.three}>{curPro && curPro.total.heal}</dt>
                <dd>治愈人数</dd>
            </dl>
            <dl>
                <dt className={styles.four}>{curPro && curPro.total.dead}</dt>
                <dd>死亡人数</dd>
            </dl>
        </div>
        <div>
            {
                items.map((item:any,index:number)=>{
                return <p key={index}><span></span>{item.title}</p>
                })
            }
        </div>
        <div>
        <span>分享{ProvinceList[province]}数据</span>
        <span>关注{ProvinceList[province]}疫情</span>
        </div>
    </div>
}


export default News
