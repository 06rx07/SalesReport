const barChart = {
    getBarFigure: function(data){
        let figure = '<figure><figcaption>East Phone Sale</figcaption>';
        return figure + barChart.createBarChart(data) + '</figure>';
    },
    createBarChart: function (data) {
        let svg = '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg">';
        let xAxis = '<line x1="30" y1="300" x2="650" y2="300" stroke="black" />';
        let yAxis = '<line x1="30" y1="0" x2="30" y2="300" stroke="black" />';
        for (let i = 0; i < data.length; i++) {
            svg += barChart.getBar(data[i], i);
            svg += barChart.getXLabel(i);
        }
        return svg + xAxis + yAxis + barChart.getYLabel() + '</svg>';
    },
    getBar: function (barData, xRef) {
        return '<rect x="' + (xRef * 50 + 40) + '" y="' + (300 - barData) + '" width="30" height="' + barData + '" class="bar" />';
    },
    getXLabel: function (xRef) {
        return '<text x="' + (xRef * 50 + 40) + '" y="320">' + months[xRef] + '</text>';
    },
    getYLabel: function () {
        let yLabel = '';
        for (i = 0; i < 320 / 40; i++) {
            yLabel += '<text x="0" y="' + (300 - 40 * i) + '">' + (i * 40) + '</text>';
        }
        return yLabel;
    }
};