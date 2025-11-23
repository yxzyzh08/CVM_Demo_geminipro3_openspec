import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Kpi } from '../../../types/kpi';

interface KpiTrendChartProps {
  kpi: Kpi;
}

const KpiTrendChart: React.FC<KpiTrendChartProps> = ({ kpi }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      
      const data = kpi.history.map(h => ({
          value: [h.timestamp, h.value]
      }));

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
              const date = new Date(params[0].value[0]).toLocaleDateString();
              return `${date}<br/>${params[0].seriesName}: ${params[0].value[1]}`;
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [
          {
            name: kpi.name,
            type: 'line',
            data: data,
            markLine: {
                data: [{ yAxis: kpi.targetValue, name: 'Target' }],
                lineStyle: { color: 'red', type: 'dashed' }
            },
            areaStyle: {}
          }
        ],
        grid: {
            top: 30,
            bottom: 30,
            left: 40,
            right: 20
        }
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [kpi]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default KpiTrendChart;
