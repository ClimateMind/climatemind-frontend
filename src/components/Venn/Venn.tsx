import React from 'react';
import { VennDiagram, VennSeries } from 'reaviz';

export interface VennProps {}

export const Venn = () => {
  const height = 300;
  const width = 300;
  const data = [
    { key: ['You'], data: 100 },
    { key: ['Steve'], data: 100 },
    { key: ['You', 'Steve'], data: 75 },
  ];
  const scheme = ['red', 'green'];

  return (
    <div>
      <VennDiagram
        height={height}
        width={width}
        data={data}
        series={<VennSeries colorScheme={scheme} />}
      />
      <h2>Data</h2>
      <pre style={{ backgroundColor: 'grey', padding: '5px' }}>
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  );
};
