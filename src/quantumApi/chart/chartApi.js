import { Line, Rose, Column, Pie,TinyColumn } from '@antv/g2plot'
import { Chart } from '@antv/g2';
import {COLORS} from "@/utils/Constants";

export const drawColumn = (container, data, text, configs) => {
    new Column (container, {
        width: 100,
        height: 250,
        title: {
            visible: true,
            text: text,
            style:{
                fontSize: 12,
                fill: 'black',
            }
        },
        forceFit: true,
        data,
        padding: 'auto',
        xField: configs.xfieldName,
        yField: configs.yfieldName,
        colorField: configs.xfieldName,
        xAxis:{
            label:{
                visible: false
            }
        },
        label: {
            visible: false,
            style: {
                fill: '#0D0E68',
                fontSize: 12,
                fontWeight: 600,
                opacity: 0.6,
            },
        },
        color: COLORS,
        // meta:{
        //     configs.xfieldName: {
        //         alias: configs.xalias,
        //     },
        //     configs.yfieldName: {
        //         alias: configs.yalias,
        //     },
        // }
    }).render()
}

export const drawPie = (container, data, text, configs) => {
    new Pie(container, {
        width: 290,
        height: 250,
        forceFit: true,
        title: {
            visible: false,
            style:{
                fontSize: 12,
                fill: 'black',
            }
        },
        radius: 1,
        data,
        angleField: configs.yField,
        colorField: configs.xField,
        label: {
            visible: false,
            type: 'inner',
        },
        legend:{
            visible: true,
            position: 'bottom-center',
            formatter: (data) => {if(configs.format){ return data.split('-')[0];}else{return data}}
        },
        color: COLORS
    }).render();
}
