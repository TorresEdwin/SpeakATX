import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LegalAidChart = () => {
  const svgRef = useRef();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 added loading state

  useEffect(() => {
    const fetchData = async () => {
      let all = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.safeharbortexas.me/legal_aid?page=${page}&size=50`);
        const json = await res.json();
        const items = json.legal_aid || [];

        all = all.concat(items);
        hasNext = json.pagination?.page < json.pagination?.total_pages;
        page++;
      }

      const cleanExp = all
        .map(d => parseInt(d.experience))
        .filter(n => !isNaN(n) && n >= 0);

      setExperiences(cleanExp);
      setLoading(false); // 👈 hide spinner once done
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (experiences.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };

    const x = d3.scaleLinear()
      .domain([0, d3.max(experiences)])
      .nice()
      .range([margin.left, width - margin.right]);

    const histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(10));

    const bins = histogram(experiences);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} yrs`));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid gray')
      .style('border-radius', '4px')
      .style('padding', '8px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '14px');

    svg.append('g')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', d => x(d.x0) + 1)
      .attr('y', d => y(d.length))
      .attr('width', d => x(d.x1) - x(d.x0) - 2)
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', '#e9713a')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.length} lawyer(s)</strong><br/>Experience: ${d.x0}–${d.x1} yrs`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mousemove', event => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => tooltip.style('opacity', 0));
  }, [experiences]);

  // 👇 show spinner if still loading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <div className="spinner-border text-dark" role="status" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <svg
        ref={svgRef}
        width={700}
        height={400}
        style={{ border: '1px solid lightgray' }}
      />
    </div>
  );
};

export default LegalAidChart;
