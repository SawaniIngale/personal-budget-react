import React from 'react';
import axios from 'axios';
import * as d3j from 'd3';
import Chart from 'chart.js/auto';

function HomePage() {

    var dataSource  = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    '#33FFAF',
                    '#FF3339',
                    '#A8ADA9',
                ]
        }
        ],
          labels: []
      };
      var data;
      var svg;
    //   var color;
      var height = 450;
      var width = 960;
      var radius = Math.min(width, height) / 2;

      var cId = React.useRef(null);

      function createChart(dataSource) {
        //var ctx = document.getElementById("myChart").getContext("2d");
        var ctx = document.getElementById("myChart");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
      }

      function getBudget() {
        
        axios.get('http://localhost:3000/budget')
        .then(function (res) {
        

            data = res.data.my_monthly_budget;
            
            // createColors();
            createSvg();
            drawChart();

            for (var i = 0; i < res.data.my_monthly_budget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.my_monthly_budget[i].budget;
                dataSource.labels[i] = res.data.my_monthly_budget[i].title
            }

                createChart(dataSource);
            
        });
    }

    
        const color = d3j
          .scale.ordinal()
          .domain(data.map(d => d.title))
          .range(dataSource.datasets[0].backgroundColor);
      
    
      function createSvg() {
        svg = d3j
          .select("figure#d3pie")
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr(
            'transform',
            'translate(' + width / 2 + ',' + height / 2 + ')'
          );
      }

      function drawChart(){
        const pie = d3j.pie().value((d) => Number(d.budget));


      svg
        .selectAll('p')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', d3j.arc().innerRadius(0).outerRadius(radius))
        .attr('fill', (d, i) => color(i))
        .attr('stroke', '#FFFFFF')
        .style('stroke-width', '1px');


      const labelArc = d3j.arc()
        .innerRadius(radius - 30)
        .outerRadius(radius - 30);

      svg
        .selectAll('p')
        .data(pie(data))
        .enter()
        .append('text')
        .text((d) => d.data.title)
        .attr('transform', (d) => 'translate(' + labelArc.centroid(d) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', 12);
      }

      React.useEffect(() => {
        if(!cId.current !== null){
            getBudget();
        }

    }, []);



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
                        <canvas ref={cId} id="myChart" width="400" height="400"></canvas>
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