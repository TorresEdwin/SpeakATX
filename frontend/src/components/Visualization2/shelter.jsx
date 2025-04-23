import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ShelterChart = () => {
  const svgRef = useRef();
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      let allShelters = [];
      let page = 1;
      let hasNext = true;

      while (hasNext) {
        try {
          const res = await fetch(`https://api.safeharbortexas.me/shelters?page=${page}&size=50`);
          const json = await res.json();
          const shelters = json.shelters || [];
          allShelters = allShelters.concat(shelters);
          hasNext = json.pagination?.page < json.pagination?.total_pages;
          page += 1;
        } catch (error) {
          console.error('Error fetching data:', error);
          hasNext = false;
        }
      }

      const cityBeds = {};
      allShelters.forEach(({ city, beds_available }) => {
        const beds = parseInt(beds_available);
        if (city && !isNaN(beds)) {
          cityBeds[city] = (cityBeds[city] || 0) + beds;
        }
      });

      const data = Object.entries(cityBeds).map(([city, count]) => ({
        city,
        count,
      }));

      setCityData(data);
      setLoading(false);
    };

    fetchShelters();
  }, []);

  useEffect(() => {
    if (cityData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 50;

    svg.attr('width', width).attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${radius + 40}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select('body').append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid gray')
      .style('padding', '6px 10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '13px');

    const arcs = chart.selectAll('arc')
      .data(pie(cityData))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.city))
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.data.city}</strong><br/>${d.data.count} beds`)
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

    // Scrollable legend
    svg.append('foreignObject')
      .attr('x', radius * 2 + 60)
      .attr('y', 40)
      .attr('width', 200)
      .attr('height', 300)
      .append('xhtml:div')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml')
      .style('overflow-y', 'auto')
      .style('height', '300px')
      .style('font-size', '13px')
      .style('padding-right', '10px')
      .selectAll('div')
      .data(cityData)
      .join('div')
      .style('margin-bottom', '8px')
      .html(d => `
        <div style="display: flex; align-items: center;">
          <div style="width: 14px; height: 14px; background:${color(d.city)}; margin-right: 8px;"></div>
          <span>${d.city} (${d.count} beds)</span>
        </div>
      `);
  }, [cityData]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <div className="spinner-border text-dark" role="status" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={svgRef} style={{ border: '1px solid lightgray' }} />
    </div>
  );
};

export default ShelterChart;
