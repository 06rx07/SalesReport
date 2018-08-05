const figure = document.querySelector('figure#bar-chart');
const barChartConfig = {
    width: 650,
    height: 0,
    xGap: 50,
    textFillStyle: '#000000',
    font: '14px Arial',
    lineFillStyle: '#0082c8',
    leftMargin: 40,
    bottomMargin: 40,
    rightMargin: 20,
    topMargin: 40,
};

const barChart = {
    initContainer: function (data) {
        if (figure.firstChild) {
            figure.removeChild(figure.firstChild);
        }
        const yHeight = Math.ceil(Math.max(...data) / 20) * 20;
        barChartConfig.height = yHeight + barChartConfig.topMargin + barChartConfig.bottomMargin;
    },
    create: function (data, title) {
        barChart.initContainer(data);
        figure.appendChild(barChart.createBarChart(data, title));
    },
    createBarChart: function (data, title) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 ' + barChartConfig.width + ' ' + barChartConfig.height);
        barChart.createAxes(svg, title);
        barChart.createBar(svg, data);
        return svg;
    },
    createAxes: function (svg, title) {
        // x-axis
        const xAxis = document.createElementNS(svg.namespaceURI, 'line');
        xAxis.setAttribute('x1', barChartConfig.leftMargin);
        xAxis.setAttribute('y1', barChartConfig.height - barChartConfig.bottomMargin);
        xAxis.setAttribute('x2', barChartConfig.width);
        xAxis.setAttribute('y2', barChartConfig.height - barChartConfig.bottomMargin);
        xAxis.setAttribute('class', 'axis');
        // y-axis
        const yAxis = document.createElementNS(svg.namespaceURI, 'line');
        yAxis.setAttribute('x1', barChartConfig.leftMargin);
        yAxis.setAttribute('y1', barChartConfig.topMargin);
        yAxis.setAttribute('x2', barChartConfig.leftMargin);
        yAxis.setAttribute('y2', barChartConfig.height - barChartConfig.bottomMargin);
        yAxis.setAttribute('class', 'axis');
        // x-label
        const xLabels = document.createElementNS(svg.namespaceURI, 'g');
        for (let i = 0; i < months.length; i++) {
            let text = document.createElementNS(svg.namespaceURI, 'text');
            text.setAttribute('x', barChartConfig.leftMargin + 5 + i * 50);
            text.setAttribute('y', barChartConfig.height - barChartConfig.bottomMargin / 2);
            text.appendChild(document.createTextNode(months[i]));
            xLabels.appendChild(text);
        }
        xLabels.setAttribute('class', 'x-label');
        // y-label
        const yLabels = document.createElementNS(svg.namespaceURI, 'g');
        for (let i = 0; i <= (barChartConfig.height - barChartConfig.topMargin - barChartConfig.bottomMargin) / 20; i++) {
            let text = document.createElementNS(svg.namespaceURI, 'text');
            let textWidth = (i * 20).toString().length * 8;
            text.appendChild(document.createTextNode(i * 20));
            text.setAttribute('x', barChartConfig.leftMargin - 5 - textWidth);
            text.setAttribute('y', barChartConfig.height - barChartConfig.bottomMargin - i * 20);
            yLabels.appendChild(text);
        }
        yLabels.setAttribute('class', 'y-label');
        // title
        const titleWidth = title.length * 8;
        const caption = document.createElementNS(svg.namespaceURI, 'text');
        caption.appendChild(document.createTextNode(title));
        caption.setAttribute('x', (barChartConfig.width - titleWidth) / 2);
        caption.setAttribute('y', barChartConfig.topMargin / 2);

        svg.appendChild(xAxis);
        svg.appendChild(yAxis);
        svg.appendChild(xLabels);
        svg.appendChild(yLabels);
        svg.appendChild(caption);
    },
    createBar: function (svg, data) {
        for (let i = 0; i < data.length; i++) {
            let bar = document.createElementNS(svg.namespaceURI, 'rect');
            bar.setAttribute('x', barChartConfig.leftMargin + 5 + i * 50);
            bar.setAttribute('y', barChartConfig.height - barChartConfig.bottomMargin - data[i]);
            bar.setAttribute('width', 30);
            bar.setAttribute('height', data[i]);
            svg.appendChild(bar);
        }
    }
};