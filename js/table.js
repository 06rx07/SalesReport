const tableWrapper = document.querySelector('#table-wrapper');
let tempInput = null;
let tempSourceData = null;

const processData = {
    load: function () {
        const jsonData = localStorage.getItem('sourceData');
        tempSourceData = (jsonData) ? JSON.parse(jsonData) : sourceData;
    },
    getDataBySelect: function (region, product) {
        if (!tempSourceData) { this.load(); }
        return tempSourceData.filter((data) => region.indexOf(data.region) > -1 && product.indexOf(data.product) > -1);
    },
    saveByPosition: function (region, product, index, value) {
        const rowIndex = tempSourceData.findIndex(data => data.region === region && data.product === product);
        if (rowIndex > -1) {
            tempSourceData[rowIndex].sale[index] = value;
            this.save(tempSourceData);
        }
    },
    save: function (data) {
        localStorage.setItem('sourceData', JSON.stringify(data));
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
            row.appendChild(this.getRowElement(rowData['sale'][i], null, true, i));
        }
        return row;
    },
    getRowElement: function (text, rowSpan, isInput, colIndex) {
        const row = document.createElement('td');
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'input-wrapper non-edit');
        if (isInput) {
            const input = document.createElement('input');
            input.value = text;
            input.type = 'number';
            input.readOnly = 'true';
            input.setAttribute('index', colIndex);
            input.addEventListener('click', getTable.allowEditing);
            input.addEventListener('keydown', getTable.keydownInput);
            wrapper.appendChild(input);
            wrapper.appendChild(getTable.getButton('far fa-edit input-edit'));

            const saveBtn = getTable.getButton('fas fa-check input-confirm');
            saveBtn.addEventListener('click', getTable.confirm);
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
        tempInput = input.value;
        input.parentNode.className = 'input-wrapper show-edit';
    },
    keydownInput: function (event) {
        if (event.key === 'Enter') {
            getTable.save(Array.from(event.path).filter(ele => ele.localName === 'tr')[0], event.target);
            event.target.blur();
        } else if (event.key === 'Escape') {
            getTable.revert(event.target);
            event.target.blur();
        }
    },
    confirm: function (event) {
        const tr = Array.from(event.path).filter(ele => ele.localName === 'tr')[0];
        const input = Array.from(event.target.parentNode.childNodes).filter(ele => ele.localName === 'input')[0];
        getTable.save(tr, input);
    },
    cancel: function (event) {
        if (event.target) {
            const input = Array.from(event.target.parentNode.childNodes).filter(ele => ele.localName === 'input')[0];
            getTable.revert(input);
        }
    },
    save: function (tr, input) {
        const value = parseInt(input.value);
        if (!isNaN(value) && value >= 0) {
            const sales = tr.attributes.sales.value;
            const product = sales.split(' ')[0];
            const region = sales.split(' ')[1];
            processData.saveByPosition(region, product, input.attributes.index.value, input.value);
            input.parentNode.className = 'input-wrapper';
        } else {
            input.parentNode.className = 'input-wrapper is-error';
            input.focus();
        }
    },
    revert: function (input) {
        input.value = tempInput;
        input.parentNode.className = 'input-wrapper non-edit';
    }
};