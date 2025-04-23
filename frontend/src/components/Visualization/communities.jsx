import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CommunityChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const loadAllCommunities = async () => {
      let allCommunities = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.speakatx.me/get/communities?page=${page}`);
        const json = await res.json();
        const items = json.items || [];
        allCommunities.push(...items);
        hasNext = json.pagination?.has_next;
        page += 1;
      }

      const data = [];
      allCommunities.forEach(({ language, type }) => {
        if (!language || !type) return;

        const langs = language.split(',').map(l => l.trim().toLowerCase());
        langs.forEach(lang => {
          data.push({ language: lang, type: type.trim() });
        });
      });

      const grouped = d3.rollups(
        data,
        v => v.length,
        d => `${d.language} | ${d.type}`
      ).map(([key, count]) => {
        const [language, type] = key.split(' | ');
        return { language, type, count };
      });

      const width = 1000;
      const height = 600;
      const padding = 60;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const tooltip = d3.select('#tooltip');
      if (tooltip.empty()) {
        d3.select('body')
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

      const uniqueLanguages = Array.from(new Set(grouped.map(d => d.language)));
      const colorScale = d3.scaleOrdinal()
        .domain(uniqueLanguages)
        .range(d3.schemeCategory10.concat(d3.schemeSet2, d3.schemeTableau10).slice(0, uniqueLanguages.length));

      const typePatterns = {
        'online': '2,2',
        'in-person': '5,5',
        'hybrid': '1,4',
        'default': ''
      };

      const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(grouped, d => d.count)])
        .range([10, 50]);

      svg.attr('width', width).attr('height', height);

      const defs = svg.append('defs');
      Object.entries(typePatterns).forEach(([type, dash]) => {
        defs.append('pattern')
          .attr('id', `pattern-${type}`)
          .attr('width', 4)
          .attr('height', 4)
          .attr('patternUnits', 'userSpaceOnUse')
          .append('rect')
          .attr('width', 4)
          .attr('height', 4)
          .attr('fill', '#fff');
      });

      const circles = svg.selectAll('circle')
        .data(grouped)
        .join('circle')
        .attr('r', d => sizeScale(d.count))
        .attr('fill', d => colorScale(d.language))
        .attr('opacity', 0.8)
        .attr('stroke-dasharray', d => typePatterns[d.type.toLowerCase()] || typePatterns['default'])
        .on('mouseover', function (event, d) {
          d3.select('#tooltip')
            .style('opacity', 1)
            .html(`<strong>${d.language}</strong><br/>Type: ${d.type}<br/>Communities: ${d.count}`)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => {
          d3.select('#tooltip').style('opacity', 0);
        });

      const simulation = d3.forceSimulation(grouped)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(d => sizeScale(d.count) + 2))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .on('tick', () => {
          circles
            .attr('cx', d => d.x = Math.max(padding, Math.min(width - padding, d.x)))
            .attr('cy', d => d.y = Math.max(padding, Math.min(height - padding, d.y)));
        });

      const legend = svg.append('g')
        .attr('transform', `translate(${width - 200}, 40)`);

      legend.selectAll('legend-items')
        .data(uniqueLanguages)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (_, i) => `translate(0, ${i * 25})`)
        .each(function(lang) {
          d3.select(this)
            .append('rect')
            .attr('x', 0)
            .attr('width', 14)
            .attr('height', 14)
            .attr('fill', colorScale(lang));

          d3.select(this)
            .append('text')
            .attr('x', 20)
            .attr('y', 12)
            .text(lang.charAt(0).toUpperCase() + lang.slice(1))
            .attr('font-size', 13);
        });
    };

    loadAllCommunities();
  }, []);

  return (
    <div>
      <svg ref={svgRef} style={{ border: '1px solid lightgray' }} />
    </div>
  );
};

export default CommunityChart;
