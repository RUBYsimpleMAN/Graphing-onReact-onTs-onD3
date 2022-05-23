import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';

const data = [
  {
    tagname: 'beauty01',
    number: 9000
  },
  {
    tagname: 'beauty02',
    number: 3000
  },
  {
    tagname: 'beauty03',
    number: 5000
  },
  {
    tagname: 'beauty04',
    number: 6000
  },
  {
    tagname: 'beauty05',
    number: 7000
  }
]

const dimentions = {
  width: 800,
  height: 500,
  charWidth: 700,
  charHeight: 400,
  marginLeft: 100
}

const App: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] = useState<null | Selection < SVGSVGElement |
                                                                null,
                                                                unknown,
                                                                null,
                                                                undefined > >
  (null);

  const maxValue = max(data, d=>d.number)

  const y = scaleLinear()
    .domain([0,maxValue!])
    .range([0,dimentions.charHeight])

  const x = scaleBand()
    .domain(data.map(d=>d.tagname))
    .range([0,dimentions.charWidth])
    // .paddingOuter(0.5)
    .paddingInner(0.05)
  
  const yAxis = axisLeft(y)
                .ticks(4)
                // .tickFormat(d=>`$${d}`) // dollar sign forward
                .tickFormat(d=>`${d} units`) // dollar sign forward
                const xAxis = axisBottom(x)

  useEffect(() => {
    if(!selection){
      setSelection(select(ref.current))
    }
    else {
      // console.log('y(0) ', y(0))
      // console.log('y(2050) ', y(2050))
      // console.log('y(4090) ', y(4090))
      // selection
      //   .append('rect')
      //   .attr('width', dimentions.width)
      //   .attr('height', dimentions.height)
      //   .attr('fill', 'blue')  // blue g-inSVG-tag background rectangle

      const xAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimentions.marginLeft},${dimentions.charHeight+8})`)
        .call(xAxis)

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimentions.marginLeft-8},0)`)
        .call(yAxis)

      selection
        .append('g')
        .attr('transform',`translate(${dimentions.marginLeft},0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d=>x(d.tagname)!)
        .attr('fill', 'green')
        .attr('height', d => y(d.number))

    }
  }, [selection])

  return (
    <div>
      <svg ref={ref} width={dimentions.width} height={dimentions.height}>
        {/* <g>
        <rect/>
        <rect/>
        <rect/>
        </g> */}
      </svg>
    </div>
  );
}

export default App;





