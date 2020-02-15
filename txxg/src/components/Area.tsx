import React, {useState, useEffect, Children} from 'react'
import {AreaType} from '../utils/types'
import styles from './Hospital.module.scss'
const Area = (props: {areaTree:AreaType []})=>{

    console.log('area...', props.areaTree);
    let list:any = [];
    let data:any = [];
   props.areaTree.map((item:any,index:number)=>{
       if(item.name=="中国"){
          list = item.children
       }else{
           data.push(item) 
       }
   })
   console.log('list......',list);
   
    return <>
        <div>
            <h3 className={styles.china}>中国疫情(包括港澳台)</h3>
            <p className={styles.chinap}>7:00-10:00为更新高峰,数据如有滞后请谅解。</p>
            <div className={styles.carea}>
                <span>地区</span>
                <span>新增确诊</span>
                <span>累计确诊</span>
                <span>治愈</span>
                <span>死亡</span>
            </div>
            {
                list.map((item:any,index:number)=>{
                    return <div className={styles.careabox} key={index}>
                            <span>{item.name}</span>
                            <span>{item.today.confirm}</span>
                            <span>{item.total.confirm}</span>
                            <span>{item.total.heal}</span>
                            <span>{item.total.dead}</span>
                    </div>
                })
            }
        </div>
        <p className={styles.text}>数据来源：各地卫健委每日公开数据</p>
        <div>
            <h3 className={styles.haiwai}>海外疫情</h3>
            <div className={styles.hcarea}>
                <span>地区</span>
                <span>确诊</span>
                <span>治愈</span>
                <span>死亡</span>
            </div>
            {
                data.map((item:any,index:number)=>{
                    return <div className={styles.hwbox} key={index}>
                    <span>{item.name}</span>
                    <span>{item.total.confirm}</span>
                    <span>{item.total.heal}</span>
                    <span>{item.total.dead}</span>
            </div>
                })
            }
        </div>
    </>
}


export default Area
