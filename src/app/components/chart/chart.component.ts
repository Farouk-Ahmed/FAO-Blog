import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #chartContainer class="w-full h-full min-h-[250px] relative overflow-visible">
      <svg #svgElement class="w-full h-full overflow-visible"></svg>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
  `]
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @ViewChild('svgElement', { static: true }) svgElement!: ElementRef;

  @Input() data: { date: string, value: number }[] = [];
  @Input() color: string = '#00FF9D';

  private svg: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.svg) {
      this.updateChart();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChart();
  }

  private createChart() {
    this.svg = d3.select(this.svgElement.nativeElement);
    this.updateChart();
  }

  private updateChart() {
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    if (width === 0 || height === 0) return;

    this.svg.selectAll('*').remove();

    const innerWidth = width - this.margin.left - this.margin.right;
    const innerHeight = height - this.margin.top - this.margin.bottom;

    const g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const parseTime = d3.timeParse('%Y-%m-%d');
    const formattedData = this.data.map(d => ({
      date: parseTime(d.date) as Date,
      value: d.value
    }));

    const x = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.value) as number * 1.2])
      .range([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.05)
      .call(d3.axisLeft(y)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
      );

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .attr('class', 'axis text-high-tech-gray-400')
      .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(10))
      .select('.domain').remove();

    // Y Axis
    g.append('g')
      .attr('class', 'axis text-high-tech-gray-400')
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(10))
      .select('.domain').remove();

    // Area
    const area = d3.area<any>()
      .x(d => x(d.date))
      .y0(innerHeight)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const defs = this.svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.color)
      .attr('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.color)
      .attr('stop-opacity', 0);

    g.append('path')
      .datum(formattedData)
      .attr('fill', `url(#${gradientId})`)
      .attr('d', area);

    // Line
    const line = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', this.color)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Points
    g.selectAll('.dot')
      .data(formattedData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: any) => x(d.date))
      .attr('cy', (d: any) => y(d.value))
      .attr('r', 4)
      .attr('fill', this.color)
      .attr('stroke', '#000')
      .attr('stroke-width', 1);
  }
}
