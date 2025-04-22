import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const SafeHarborCommunityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      let allPrograms = [];
      let currentPage = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.safeharbortexas.me/community_programs?page=${currentPage}`);
        const json = await res.json();
        const items = json.community_programs || [];

        allPrograms = allPrograms.concat(items);
        hasNext = json.pagination?.page < json.pagination?.total_pages;
        currentPage++;
      }

      // Categorize session costs
      const costCategories = {
        'Free': 0,
        '$1 - $20': 0,
        '$21 - $40': 0,
        '$41 - $60': 0,
        '$61 - $80': 0,
        '$81+': 0,
        'Unknown': 0
      };

      allPrograms.forEach((program) => {
        const costStr = program.session_cost || '';
        if (/free/i.test(costStr)) {
          costCategories['Free']++;
        } else if (/\d+/.test(costStr)) {
          const numbers = costStr.match(/\d+/g).map(Number);
          const avgCost = numbers.reduce((a, b) => a + b, 0) / numbers.length;
          if (avgCost <= 20) costCategories['$1 - $20']++;
          else if (avgCost <= 40) costCategories['$21 - $40']++;
          else if (avgCost <= 60) costCategories['$41 - $60']++;
          else if (avgCost <= 80) costCategories['$61 - $80']++;
          else costCategories['$81+']++;
        } else {
          costCategories['Unknown']++;
        }
      });

      const processedData = Object.entries(costCategories).map(([range, count]) => ({
        range,
        count,
      }));

      setData(processedData);
      setLoading(false); // 👈 done loading
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.range))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'middle');

    const yAxis = (g) =>
      g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const tooltip = d3.select('body').append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid gray')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.range))
      .attr('y', (d) => y(d.count))
      .attr('height', (d) => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', 'lightblue')
      .on('mouseover', function (event, d) {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.range}</strong><br/>${d.count} program(s)`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  }, [data]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <div className="spinner-border text-dark" role="status" />
      </div>
    );
  }

  return (
    <div>
      <svg
        ref={svgRef}
        width={700}
        height={400}
        style={{ border: '1px solid lightgray' }}
      ></svg>
    </div>
  );
};

export default SafeHarborCommunityChart;
