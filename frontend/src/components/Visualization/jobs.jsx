import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const JobChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const loadAllJobs = async () => {
      let allJobs = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.speakatx.me/get/jobs?page=${page}`);
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.items || [];
        allJobs.push(...items);
        hasNext = json.pagination?.has_next;
        page += 1;
      }

      const langCounts = {};
      allJobs.forEach(job => {
        const langs = (job.language || 'Unknown').split(',').map(l => l.trim());
        langs.forEach(lang => {
          langCounts[lang] = (langCounts[lang] || 0) + 1;
        });
      });

      const data = Object.entries(langCounts).map(([language, count]) => ({ language, count }));

      const width = 700;
      const height = 500;
      const radius = Math.min(width, height) / 2 - 40;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(data.map(d => d.language));

      svg.attr('width', width).attr('height', height);

      const chartGroup = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const pie = d3.pie().value(d => d.count);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = chartGroup.selectAll('path')
        .data(pie(data))
        .enter()
        .append('g');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(d.data.language))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .on('mouseover', function (event, d) {
          d3.select('#tooltip')
            .style('opacity', 1)
            .html(`<strong>${d.data.language}</strong><br/>${d.data.count} job(s)`)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => {
          d3.select('#tooltip').style('opacity', 0);
        });

      const legendWidth = 180;
      const legendPadding = 20;
      const legendX = width - legendWidth - 10;
      const legendY = 20;
      const legendItemHeight = 20;

      const legend = svg.append('g')
        .attr('transform', `translate(${legendX}, ${legendY})`);

      const legendBoxHeight = data.length * legendItemHeight + 10;
      legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendBoxHeight)
        .attr('fill', 'rgba(255, 255, 255, 0.6)')
        .attr('stroke', 'lightgray')
        .attr('rx', 8)
        .attr('ry', 8);

      legend.selectAll('legend-items')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (_, i) => `translate(10, ${i * legendItemHeight + 10})`)
        .each(function (d) {
          d3.select(this)
            .append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', colorScale(d.language));

          d3.select(this)
            .append('text')
            .attr('x', 18)
            .attr('y', 10)
            .text(`${d.language} (${d.count})`)
            .attr('font-size', 12)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'middle')
            .style('white-space', 'nowrap')
            .style('overflow', 'hidden')
            .style('text-overflow', 'ellipsis')
            .style('max-width', `${legendWidth - 30}px`);
        });
    };

    const tooltip = d3.select('body').select('#tooltip');
    if (tooltip.empty()) {
      d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'white')
        .style('border', '1px solid gray')
        .style('border-radius', '4px')
        .style('padding', '8px')
        .style('pointer-events', 'none')
        .style('opacity', 0);
    }

    loadAllJobs();
  }, []);

  return (
    <div>
      <svg ref={svgRef} style={{ border: '1px solid #ccc' }} />
    </div>
  );
};

export default JobChart;
