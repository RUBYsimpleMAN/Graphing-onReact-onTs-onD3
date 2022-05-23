import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3-selection'
import 'd3-transition'
import { easeBounce, easeBounceOut } from 'd3-ease'

const TransitionEx: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null)

  const [selection, setSelection] = useState<null | Selection < SVGSVGElement |
                                                                null,
                                                                unknown,
                                                                null,
                                                                undefined > >
  (null)

  useEffect(() => {
    if(!selection){
      setSelection(select(ref.current))
    }
    else {
      selection
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', 'gold')

        .transition()
        .duration(2000)
        .ease(easeBounceOut)

        .attr('height', 400)
        .attr('fill', 'orange')
    }
  }, [selection])

  return (
    <div>
      <svg ref={ref} height={400} />
    </div>
  );

}

export default TransitionEx;
