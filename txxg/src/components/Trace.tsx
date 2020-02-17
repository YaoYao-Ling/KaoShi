import React, { useState, useEffect } from 'react'
import { getTrace } from '../services/index'
import styles from './Hospital.module.scss'
interface TraceType {
    time: string,
    create_time: string,
    source: string,
    desc: string,
    title: string
}

const Trace = () => {
    // 定义最新进展
    let [trace, setTrace] = useState<TraceType[]>([]);

    // 获取最新进展数据
    useEffect(() => {
        getTrace().then((res: any) => {
            let data = JSON.parse(res.data) as TraceType[];
            data.sort((a, b) => {
                if (a.time > b.time) {
                    return -1;
                } else {
                    return 1;
                }
            })
            let list = data.splice(0, 6)
            setTrace(list);
        }).catch(e => {
            console.log('e...', e);
        })
    }, []);

    console.log('trace...', trace);
    return <>
        <h3 className={styles.title}>
            最新进展
            <span>追踪进展</span>
            <span>查看更多报道</span>
            </h3>
        {
            trace.map((item: any, index: number) => {
                return <div className={styles.box} key={index}>
                    <div className={styles.time}>
                        <span></span>
                        {item.time}
                        </div>
                    <div className={styles.cont}>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <h3>来源：{item.source}</h3>
                    </div>
                </div>
            })
        }
    </>
}


export default Trace
