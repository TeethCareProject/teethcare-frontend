import { Pie } from '@ant-design/plots';
import { Typography } from 'antd';
import { measureTextWidth } from '@ant-design/charts';
import React from 'react';

const { Title } = Typography;

export const GenericDonutChart = ({ data, config = {}, title = '' }) => {
  const { defaultTitle = 'Average', defaultValue = '0.0', contentSuffix = '' } = config;

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth)
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'normal'};">${text}</div>`;
  }

  const internalConfig = {
    appendPadding: 10,
    data,
    autoFit: true,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        fontSize: 20,
        textAlign: 'center'
      },
      autoRotate: false,
      content: '{value}'
    },
    statistic: {
      title: {
        offsetY: 0,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow((height + 10) / 2, 2));
          const text = datum ? datum.type : defaultTitle;
          return renderStatistic(d, text, {
            fontSize: 20
          });
        }
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px'
        },
        customHtml: (container, view, datum) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}${contentSuffix}` : defaultValue;
          return renderStatistic(width, text, {
            fontSize: 32
          });
        }
      }
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      },
      {
        type: 'pie-statistic-active'
      }
    ],
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      itemName: { style: { fontSize: 14 } },
      itemSpacing: 10
    },
    ...config
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Pie {...internalConfig} />
      <Title level={2}>{title}</Title>
    </div>
  );
};
