const tableWrapper = document.querySelector('#table-wrapper');
let tempInput = null;

const processData = {
    getDataBySelect: function (region, product) {
        return sourceData.filter((data) => region.indexOf(data.region) > -1 && product.indexOf(data.product) > -1);
    }
};

const getTable = {
    displayLineChart: function (salesData) {
        const titles = salesData.map(data => data.region + ' ' + data.product + ' Sale');
        const sales = salesData.map(data => data.sale);
        lineChart.create(sales, titles, true);
    },
    getTableBySelect: function (region, product) {
        this.cleanTable();
        const salesData = processData.getDataBySelect(region, product);
        const table = this.createTable(salesData);
        if (table) {
            tableWrapper.appendChild(table);
            this.displayLineChart(salesData);
        }
    },
    cleanTable: function () {
        if (tableWrapper.firstChild) {
            tableWrapper.removeChild(tableWrapper.firstChild);
        }
    },
    createTable: function (salesData) {
        const processedData = this.separateDataByProduct(salesData);
        let table = null;
        if (processedData.length) {
            table = document.createElement('table');
            table.appendChild(this.appendHeaders(processedData[0].category));
            for (let i = 0; i < processedData.length; i++) {
                for (let j = 0; j < processedData[i].data.length; j++) {
                    const rowSpan = (j === 0) ? processedData[i].data.length : undefined;
                    const row = this.appendRow(processedData[i].data[j], processedData[i].category, rowSpan);
                    table.appendChild(row);
                }
            }
        }
        return table;
    },
    getGroupByCategory: function (salesData) {
        if (salesData.length > 1) {
            const refRegion = salesData[0].region;
            if (salesData.findIndex(data => data.region !== refRegion) === -1) {
                return 'region';
            }
        }
        return 'product';
    },
    separateDataByProduct: function (salesData) {
        const refCategory = this.getGroupByCategory(salesData);
        const result = [];
        let resultEle = {};
        for (let data of salesData) {
            if (data[refCategory] !== resultEle.key) {
                if (resultEle.key) {
                    result.push(resultEle);
                }
                resultEle = { category: refCategory, key: data[refCategory], data: [data] };
            } else {
                resultEle.data.push(data);
            }
        }
        result.push(resultEle);
        return result;
    },
    appendHeaders: function (firstCol) {
        const row = document.createElement('tr');
        row.appendChild(this.getHeader(firstCol));
        const secondCol = firstCol === 'product' ? 'region' : 'product';
        row.appendChild(this.getHeader(secondCol));
        for (let month of months) {
            row.appendChild(this.getHeader(month));
        }
        return row;
    },
    getHeader: function (text) {
        const header = document.createElement('th');
        const headerText = document.createTextNode(text);
        header.appendChild(headerText);
        return header;
    },
    appendRow: function (rowData, spanKey, spanRow) {
        const row = document.createElement('tr');
        row.setAttribute('sales', rowData.product + ' ' + rowData.region);
        if (typeof spanRow !== 'undefined') {
            row.appendChild(this.getRowElement(rowData[spanKey], spanRow));
        }
        const appendKey = (spanKey === 'product') ? 'region' : 'product';
        row.appendChild(this.getRowElement(rowData[appendKey]));
        for (let i = 0; i < rowData['sale'].length; i++) {
            row.appendChild(this.getRowElement(rowData['sale'][i], null, true));
        }
        return row;
    },
    getRowElement: function (text, rowSpan, isInput) {
        const row = document.createElement('td');
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'input-wrapper');
        if (isInput) {
            const input = document.createElement('input');
            input.value = text;
            input.type = 'number';
            input.readOnly = 'true';
            input.addEventListener('click', getTable.allowEditing);
            wrapper.appendChild(input);
            wrapper.appendChild(getTable.getButton('far fa-edit input-edit'));
            
            const saveBtn = getTable.getButton('fas fa-check input-confirm');
            saveBtn.addEventListener('click', getTable.save);
            wrapper.appendChild(saveBtn);
            
            const cancelBtn = getTable.getButton('fas fa-times input-cancel');
            cancelBtn.addEventListener('click', getTable.cancel);
            wrapper.appendChild(cancelBtn);
        } else {
            const rowText = document.createTextNode(text);
            wrapper.appendChild(rowText);
        }
        row.appendChild(wrapper);
        if (rowSpan) {
            row.rowSpan = rowSpan;
        }
        return row;
    },
    getButton: function (className) {
        const btn = document.createElement('i');
        btn.setAttribute('class', className);
        return btn;
    },
    allowEditing: function (event) {
        const input = event.target;
        input.removeAttribute('readonly');
    },
    save: function (event) {

    },
    cancel: function (event) {

    }
};