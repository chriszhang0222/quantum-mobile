import { Line, Rose, Column, Pie } from '@antv/g2plot'
import { Chart } from '@antv/g2';
import {COLORS} from "@/utils/Constants";

export const drawColumn = (container, data, text, configs) => {
    new Column(container, {
        title: {
            visible: true,
            text: text
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
            visible: true,
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
