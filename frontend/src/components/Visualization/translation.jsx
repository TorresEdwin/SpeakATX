import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TranslationChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const fetchAllPages = async () => {
      let allItems = [];
      let currentPage = 1;
      let hasNext = true;

      while (hasNext) {
        const res = await fetch(`https://api.speakatx.me/get/translations?page=${currentPage}`);
        const json = await res.json();
        const items = json.items || [];

        allItems = allItems.concat(items);
        hasNext = json.pagination?.has_next;
        currentPage++;
      }

      // Count ratings from 1 to 5
      const ratingCounts = Array(5).fill(0); // indexes for ratings 1 to 5

      allItems.forEach((item) => {
        const raw = item.rating;
        const rating = Math.round(parseFloat(raw));

        if (!isNaN(rating) && rating >= 1 && rating <= 5) {
          ratingCounts[rating - 1]++; // index 0 = rating 1
        }
      });

      const processedData = ratingCounts.map((count, i) => ({
        rating: i + 1,
        count,
      }));

      setData(processedData);
    };

    fetchAllPages();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.rating))
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
        .call(d3.axisBottom(x).tickFormat((d) => `Rating ${d}`))
        .selectAll('text')
        .style('text-anchor', 'middle');

    const yAxis = (g) =>
      g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // Create tooltip
    let tooltip = d3.select('#bar-tooltip');
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('id', 'bar-tooltip')
        .style('position', 'absolute')
        .style('padding', '6px 10px')
        .style('background', 'white')
        .style('border', '1px solid gray')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('font-size', '14px')
        .style('box-shadow', '0 2px 6px rgba(0,0,0,0.15)');
    }

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.rating))
      .attr('y', (d) => y(d.count))
      .attr('height', (d) => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', 'orange')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`<strong>Rating ${d.rating}</strong><br/>${d.count} count${d.count !== 1 ? 's' : ''}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  }, [data]);

  return (
    <div>
      <h2 className='mt-4'>Service Ratings</h2>
      <svg
        ref={svgRef}
        width={600}
        height={400}
        style={{ border: '1px solid lightgray' }}
      ></svg>
    </div>
  );
};

export default TranslationChart;
