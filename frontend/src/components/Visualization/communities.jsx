import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CommunityChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const fetchAllPages = async () => {
      let allItems = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.speakatx.me/get/communities?page=${page}`);
        const json = await res.json();
        const pageItems = json.items || [];

        allItems = [...allItems, ...pageItems];
        hasNext = json.pagination?.has_next;
        page += 1;
      }

      return allItems;
    };

    const drawChart = (items) => {
      // Split and aggregate member counts by individual languages
      const langCounts = {};

      items.forEach(({ language, member_count }) => {
        if (!language || !member_count) return;

        const langs = language
          .split(',')
          .map(l => l.trim().toLowerCase())
          .filter(l => l.length > 0);

        langs.forEach(lang => {
          langCounts[lang] = (langCounts[lang] || 0) + member_count;
        });
      });

      const data = Object.entries(langCounts).map(([language, count]) => ({
        language,
        count,
      }));

      if (data.length === 0) return;

      const width = 700;
      const height = 500;
      const radius = Math.min(width, height) / 2.5;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const chart = svg
        .attr('width', width)
        .attr('height', height);

      const pieGroup = chart
        .append('g')
        .attr('transform', `translate(${radius + 40}, ${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeTableau10);

      const pie = d3.pie().value(d => d.count);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = pieGroup.selectAll('g')
        .data(pie(data))
        .enter()
        .append('g');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.language))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      arcs.append('title')
        .text(d => `${d.data.language}: ${d.data.count}`);

      // Add legend to the right
      const legend = chart.append('g')
        .attr('transform', `translate(${radius * 2 + 80}, ${40})`);

      legend.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (_, i) => i * 24)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => color(d.language));

      legend.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', 25)
        .attr('y', (_, i) => i * 24 + 14)
        .text(d => `${capitalize(d.language)} (${d.count})`)
        .attr('font-size', 13);

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    };

    const fetchAndDraw = async () => {
      try {
        const items = await fetchAllPages();
        drawChart(items);
      } catch (err) {
        console.error('Error loading community data:', err);
      }
    };

    fetchAndDraw();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className='mt-4'>Community Member Counts per Language</h2>
      <svg ref={svgRef} style={{ border: '1px solid lightgray' }}/>
    </div>
  );
};

export default CommunityChart;
