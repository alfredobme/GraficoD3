document.getElementById('update-data').addEventListener('click', function() {
    const input = document.getElementById('data-input').value;

    if (!input || input.trim() === '') {
        alert('Por favor, ingresa algún valor.');
        return;
    }

    const data = input.split(',').map(Number);

    if (data.some(isNaN)) {
        alert('Por favor, ingresa solo números separados por comas.');
        return;
    }

    if (data.some(num => Number(num) <= 0)) {
        alert("Por favor, ingresa solo números mayores a cero.");
        return;
    }
    
    updateChart(data);
});

function updateChart(data) {
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']; 
    const svgWidth = 500;
    const barHeight = 30;
    const barPadding = 5;
    const chartHeight = data.length * (barHeight + barPadding); // Altura total del gráfico

    // Limpiar el gráfico anterior
    d3.select('#chart').html('');

    // Crear el contenedor del SVG con barra de desplazamiento
    const chartContainer = d3.select('#chart')
        .style('width', svgWidth + 'px')
        .style('height', '500px')
        .style('overflow-y', 'auto');

    // Crear el SVG dentro del contenedor
    const svg = chartContainer
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', chartHeight);

    // Escala para el eje X (valores)
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, svgWidth]);

    // Crear las barras horizontales
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * (barHeight + barPadding))
        .attr('width', d => xScale(d))
        .attr('height', barHeight)
        .attr('fill', (d, i) => colors[i % colors.length]);
        
    // Agregar etiquetas de valores
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', d => xScale(d) - 20)
        .attr('y', (d, i) => i * (barHeight + barPadding) + barHeight / 2)
        .attr('dy', '0.35em')
        .attr('fill', 'black')
        .style('font-size', '12px');
}