import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const JobChart = () => {
  const svgRef = useRef();
  const [loading, setLoading] = useState(true);

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

      const filtered = allJobs.filter(j => j.title);

      const titleCounts = {};
      filtered.forEach(job => {
        const title = job.title || 'Unknown';
        titleCounts[title] = (titleCounts[title] || 0) + 1;
      });

      const langCounts = {};
      filtered.forEach(job => {
        const lang = job.language || 'Unknown';
        langCounts[lang] = (langCounts[lang] || 0) + 1;
      });

      const data = Object.entries(titleCounts).map(([title, count]) => {
        const example = filtered.find(j => j.title === title);
        return {
          title,
          count,
          company: example?.name || 'Unknown',
          language: example?.language || 'Unknown',
        };
      });

      const width = 1000;
      const height = 600;
      const padding = 60;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      let tooltip = d3.select('#tooltip');
      if (tooltip.empty()) {
        tooltip = d3.select('body')
          .append('div')
          .attr('id', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'white')
          .style('border', '1px solid gray')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('pointer-events', 'none')
          .style('opacity', 0);
      }

      const colorScale = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(Object.keys(langCounts));

      const maxRadius = Math.min((width - padding * 2) / Math.sqrt(data.length), 50);

      const sizeScale = d3
        .scaleSqrt()
        .domain([1, d3.max(data, d => d.count)])
        .range([10, maxRadius]);

      svg.attr('width', width).attr('height', height);

      const circles = svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', d => sizeScale(d.count))
        .attr('fill', d => colorScale(d.language))
        .attr('opacity', 0.85)
        .on('mouseover', function (event, d) {
          tooltip
            .style('opacity', 1)
            .html(`<strong>${d.title}</strong><br/>
                   ${d.company}<br/>
                   ${d.count} listing(s)<br/>
                   ${d.language}`)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => {
          tooltip.style('opacity', 0);
        });

      const simulation = d3.forceSimulation(data)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(d => sizeScale(d.count) + 2))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .on('tick', () => {
          circles
            .attr('cx', d => d.x = Math.max(padding, Math.min(width - padding, d.x)))
            .attr('cy', d => d.y = Math.max(padding, Math.min(height - padding, d.y)));
        });

      // Scrollable HTML-based Legend
      svg.append('foreignObject')
      .attr('x', width - 210)
      .attr('y', 40)
      .attr('width', 200)
      .attr('height', 500)
      .append('xhtml:div')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml')
      .style('overflow-y', 'auto')
      .style('max-height', '480px')
      .style('font-size', '13px')
      .style('padding', '10px')
      .style('background', 'rgba(255, 255, 255, 0.6)') // ✅ 50% opacity background
      .style('box-shadow', '0 0 5px rgba(0,0,0,0.1)')
      .selectAll('div')
      .data(Object.entries(langCounts))
      .join('div')
      .style('margin-bottom', '6px')
      .html(([lang, count]) => `
        <div style="display: flex; align-items: center;">
          <div style="width: 14px; height: 14px; background:${colorScale(lang)}; margin-right: 8px;"></div>
          <span>${lang} (${count})</span>
        </div>
      `);


      setLoading(false);
    };

    loadAllJobs();
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <svg ref={svgRef} style={{ border: '1px solid #ccc' }} />
      )}
    </div>
  );
};

export default JobChart;
