import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import './Chart.css';
import axios from 'axios';

const Chart = ({ dStart, dEnd, type }) => {
    const [date, setDate] = useState()
    const [data, setData] = useState()
    // console.log(dStart, dEnd);
    // let base = +new Date(1968, 9, 3);
    // let oneDay = 24 * 3600 * 1000;
    // let date = [];
    // let data = [Math.random() * 300];
    // for (let i = 1; i < 20000; i++) {
    //     // date format '1968/10/4' 
    //     var now = new Date((base += oneDay));
    //     date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    //     data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    //     console.log(date);
    // }
    // let date;
    // let data;

    function makeDataZoom(opt) {
        return Object.assign(
            {
                type: 'slider',
                filterMode: 'empty',
                realtime: false
            },
            opt
        );
    }
    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: 'Large Area Chart'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        grid: [{
            left: 70,
            // right: 50,
            // height: '35%'
        }],

        dataZoom: [{
            type: 'inside',
            // realtime: true,
            start: 0,
            end: 20
        }, {
            start: 0,
            end: 20
        }, {
            orient: 'vertical',
            type: 'inside',
            // realtime: true,
            start: 0,
            end: 20,
            width: 18,
            // left: 10,
        }, {
            orient: 'vertical',
            start: 0,
            end: 20
        }],
        series: [
            {
                type: 'scatter',
                symbolSize: 5,
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data
            }
        ]
    };

    useEffect(() => {
        axios.post('http://localhost:3500/api/selectdata', {
            "stat_code": "02",
            "start_date": dStart,
            "end_date": dEnd
        }).then(r => {
            let dd = r.data.data.map(i => i.ts7t)
            let dt = r.data.data.map(i => i[type])
            setDate(dd);
            setData(dt);
            console.log(dd.length);
        })
    }, [dStart, dEnd])

    return (
        <ReactECharts
            option={option}
            style={{ height: 400 }}
        />
    )
}

export default Chart