const canvas = document.querySelector('canvas#line-chart');
const lineColors = ['#0082c8', '#f58231', '#aa6e28', '#800000', '#808000',
    '#000080', '#e6beff', '#fabebe', '#46f0f0'];
const lineChartConfig = {
    width: 650,
    height: 0,
    pointRadius: 3,
    xGap: 50,
    textFillStyle: '#000000',
    font: '14px Arial',
    pointFillStyle: '#000000',
    lineFillStyle: '#0082c8',
    lineJoin: 'round',
    lineCap: 'round',
    lineWidth: 2,
    leftMargin: 40,
    bottomMargin: 40,
    rightMargin: 20,
    topMargin: 40,
};

const lineChart = {
    initCanvas: function (data, isMultiple) {
        const maxHeight = (isMultiple) ? data.map(ele => Math.max(...ele)) : data;
        const yHeight = Math.ceil(Math.max(...maxHeight) / 20) * 20;
        lineChartConfig.height = yHeight + lineChartConfig.topMargin + lineChartConfig.bottomMargin;

        canvas.width = lineChartConfig.width;
        canvas.height = lineChartConfig.height;
    },
    initLineContext: function (context) {
        context.lineJoin = lineChartConfig.lineJoin;
        context.lineCap = lineChartConfig.lineCap;
        context.lineWidth = lineChartConfig.lineWidth;
    },
    initTextContext: function (context) {
        context.font = lineChartConfig.font;
        context.fillStyle = lineChartConfig.textFillStyle;
    },
    createMultiple: function (context, data, titles) {
        for (let i = 0; i < data.length; i++) {
            lineChart.createLine(context, data[i], lineColors[i]);
            lineChart.createPoint(context, data[i]);
            // add label by color
            context.beginPath();
            context.strokeStyle = lineColors[i];
            context.moveTo(lineChartConfig.leftMargin + 5, lineChartConfig.topMargin / 2 + i * 20);
            context.lineTo(lineChartConfig.leftMargin + 45, lineChartConfig.topMargin / 2 + i * 20);
            context.stroke();
            context.fillText(titles[i], lineChartConfig.leftMargin + 50, lineChartConfig.topMargin / 2 + i * 20);
        }
    },
    create: function (data, title, isMultiple) {
        this.initCanvas(data, isMultiple);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, lineChartConfig.width, lineChartConfig.height);
        lineChart.createAxes(context, title, isMultiple);
        if (!isMultiple) {
            lineChart.createLine(context, data);
            lineChart.createPoint(context, data);
        } else {
            lineChart.createMultiple(context, data, title);
        }
    },
    createAxes: function (context, title, isMultiple) {
        // x-axis
        context.beginPath();
        context.moveTo(40, lineChartConfig.height - lineChartConfig.bottomMargin);
        context.lineTo(lineChartConfig.width, lineChartConfig.height - lineChartConfig.bottomMargin);
        context.stroke();
        // y-axis
        context.beginPath();
        context.moveTo(lineChartConfig.leftMargin, lineChartConfig.height - lineChartConfig.bottomMargin);
        context.lineTo(lineChartConfig.leftMargin, lineChartConfig.topMargin);
        context.stroke();
        // x-label
        lineChart.initTextContext(context);
        for (let i = 0; i < months.length; i++) {
            context.fillText(months[i], 50 + i * 50, lineChartConfig.height - lineChartConfig.bottomMargin / 2);
        }
        // y-label
        for (let i = 0; i <= (lineChartConfig.height - lineChartConfig.topMargin - lineChartConfig.bottomMargin) / 20; i++) {
            let text = (i * 20).toString();
            context.fillText(text, (lineChartConfig.leftMargin - 5) - context.measureText(text).width, lineChartConfig.height - lineChartConfig.bottomMargin - i * 20);
        }
        // title
        if (!isMultiple) {
            const titleWidth = context.measureText(title);
            context.fillText(title, (lineChartConfig.width - titleWidth.width) / 2, lineChartConfig.topMargin / 2);
        }
    },
    createLine: function (context, data, lineColor) {
        lineChart.initLineContext(context);
        context.beginPath();
        for (let i = 0; i < data.length; i++) {
            let point = { x: 60 + i * 50, y: lineChartConfig.height - lineChartConfig.bottomMargin - data[i] };
            context.strokeStyle = lineColor || lineChartConfig.lineFillStyle;
            if (i === 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
                context.stroke();
            }
        }
    },
    createPoint: function (context, data) {
        for (let i = 0; i < data.length; i++) {
            let point = { x: 60 + i * 50, y: lineChartConfig.height - lineChartConfig.bottomMargin - data[i] };
            context.beginPath();
            context.arc(point.x, point.y, lineChartConfig.pointRadius, 0, 2 * Math.PI);
            context.strokeStyle = lineChartConfig.pointFillStyle;
            context.stroke();
        }
    }
};