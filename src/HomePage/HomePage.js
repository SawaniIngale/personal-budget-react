import React from 'react';
import axios from 'axios';
import * as d3j from 'd3';
import {scaleOrdinal} from 'd3'
import Chart from 'chart.js/auto';
// import { useEffect } from 'react';

function HomePage() {

    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: ['#ffcd56',
                                '#ff6384',
                                '#36a2eb',
                                '#fd6b19',
                                '#33FFAF',
                                '#FF3339',
                                '#A8ADA9',]}],
        labels: []
    };

    React.useEffect(() => {
        axios.get('http://localhost:3000/budget').then((response) => {
            for (var i = 0; i < response.data.my_monthly_budget.length; i++) {
                dataSource.datasets[0].data[i] = response.data.my_monthly_budget[i].budget;
                dataSource.labels[i] = response.data.my_monthly_budget[i].title;
            }
            console.log(response.data.my_monthly_budget)
            createChart();
            createDonutChart(response.data.my_monthly_budget);
        });
      }, []);

    function createChart() {
        var ctx = document.getElementById('myChart').getContext('2d');
        let chartStatus = Chart.getChart("myChart");

        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }
    
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
    }

    

    function createDonutChart(data) {
        d3j.select('#d3pie').selectAll('*').remove();
    
       
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
    
        
        const svg = d3j.select('#d3pie')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);
    
    
        const color = scaleOrdinal()
            .domain(data.map(d => d.title))
            .range(dataSource.datasets[0].backgroundColor);
    
        // Create a pie chart
        const pie = d3j.pie()
            .value(d => d.budget);
    
        
        const arc = d3j.arc()
            .innerRadius(radius * 0.4) 
            .outerRadius(radius);
    
        
        const path = svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc) 
            .attr('fill', d => color(d.data.title));
    
        
        path.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => `${d.data.title}: $${d.data.budget}`); 
        // Create a legend
        const legend = svg.selectAll('.legend')
            .data(data.map(d => d.title))
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(250, ${i * 20})`);
    
        legend.append('rect')
            .attr('width', 21)
            .attr('height', 21)
            .style('fill', d => color(d));
    
        legend.append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .text(d => d);
    }

    


  return (
    <div className="container center">

        <section>
            <div className="page-area">

                <div className="text-box">
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </div>
        
                <div className="text-box">
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </div>
        
                <div className="text-box">
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </div>

                <div className="text-box">
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </div>
        
                <div className="text-box">
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </div>

                <div className="text-box">
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </div>
        
                <div className="text-box">
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </div>
        
                <div className="text-box">
                    <h1>Monthly Budget Chart</h1>
                    <p>
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </p>
                </div>
                <div id="d3-chart">
                    <h1>D3JS chart</h1>
                    <figure id='d3pie'></figure>
                </div>

            </div>
        </section>

    </div>
  );
}

export default HomePage;