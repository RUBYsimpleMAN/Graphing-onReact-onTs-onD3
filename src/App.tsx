import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { nanoid } from 'nanoid';
// import TransitionEx from './TransitionEx'
import 'd3-transition'
import {  easeBounce,
          easeBounceOut,
          easeElastic,
          easeLinear,
          easeQuadInOut
        } from 'd3-ease'
import toExport from './BlockChainAllinOne'

const MapedBchain = toExport.map(e => e)

console.log(MapedBchain)
console.log(MapedBchain[0])

let initialData = [
  {
    tagname: 'beauty01',
    units: 38
  },
  {
    tagname: 'beauty02',
    units: 30
  },
  {
    tagname: 'beauty03',
    units: 40
  },
  {
    tagname: 'beauty04',
    units: 56
  },
  {
    tagname: 'beauty05',
    units: 34
  }
]

const dimentions = {
  width: 900,
  height: 500
}

const App: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null)

  const [selection, setSelection] = useState<null | Selection < SVGSVGElement |
                                                                null,
                                                                unknown,
                                                                null,
                                                                undefined > >
  (null)

  const [data, setData] = useState(initialData)

  let y = scaleLinear()
    .domain([0,max(data, d => d.units)!])
    .range([dimentions.height, 0])

  let x = scaleBand()
    .domain(data.map(d=>d.tagname))
    .range([0,dimentions.width])
    .paddingInner(0.02)

  useEffect(() => {
    if(!selection){
      setSelection(select(ref.current))
    }
    else {
      selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('fill', 'orange')
        .attr('x', d => x(d.tagname)!)

        .attr('height', 0)
        .attr('y', dimentions.height)

        .transition()
        .duration(400)
        // .delay(1000) // задержка
        .delay((_, i) => i*100)
        .ease(easeElastic)

        .attr('height', d => dimentions.height - y(d.units))
        .attr('y', d => y(d.units))
    }
  }, [data, selection, x, y])

  useEffect(() => {
    if(selection) {
      y = scaleLinear()
          .domain([0,max(data, d => d.units)!])
          .range([dimentions.height, 0])

      x = scaleBand()
          .domain(data.map(d=>d.tagname))
          .range([0,dimentions.width])
          .paddingInner(0.02)
  
      const rects = selection.selectAll('rect').data(data)
      
      rects
        .exit()

        .transition()
        .duration(500)

        .attr('y', dimentions.height)
        .attr('height', 0)
        
        .remove()
      
      rects
        .transition()
        .duration(200)
        .delay(100)
        .attr('width', x.bandwidth)
        .attr('height', d => dimentions.height - y(d.units))
        .attr('x', d => x(d.tagname)!)
        .attr('y', d => y(d.units))
        .attr('fill', 'orange')

      rects
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('x', d => x(d.tagname)!)
        .attr('y', dimentions.height)
        .attr('height', 0)

        .transition()
        .duration(500)
        .delay(300)

        .attr('y', d => y(d.units))
        .attr('height', d => dimentions.height - y(d.units))

      }
  }, [data])

  const addRandmToEnd = () => {
    const randomDataToBeAdded = {
      tagname: nanoid(),
      units: Math.floor(Math.random()*(80) + 20)
    }
    setData([...data, randomDataToBeAdded])
  }

  const removeFromEnd = () => {
    if(data.length === 0) {
      return 
    }
    const slicedData = data.slice(0, data.length - 1)
    setData(slicedData)
  }

  return (
    <>
      <div>{JSON.stringify(MapedBchain)}</div>
      <div>
        <svg ref={ref} width={dimentions.width} height={dimentions.height} />
        <button onClick={addRandmToEnd}>RandomAdd</button>
        <button onClick={removeFromEnd}>rmFromEnd</button>
      </div>
      {/* <TransitionEx /> */}
    </>
  );
}

export default App;
