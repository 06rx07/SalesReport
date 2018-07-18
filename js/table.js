const tableWrapper = document.querySelector('#table-wrapper');

const processData = {
    getDataBySelect: function (region, product) {
        return sourceData.filter((data) => region.indexOf(data.region) > -1 && product.indexOf(data.product) > -1);
    }
};

const getTable = {
    getTableBySelect: function (region, product) {
        this.cleanTable();
        const salesData = processData.getDataBySelect(region, product);
        const table = this.createTable(salesData);
        if (table) {
            tableWrapper.appendChild(table);
        }
    },
    cleanTable: function () {
        if (tableWrapper.firstChild) {
            tableWrapper.removeChild(tableWrapper.firstChild);
        }
    },
    createTable: function (salesData) {
        const productsCat = (Array.isArray(salesData)) ? salesData.length : 0;
        let table = null;
        if (productsCat) {
            table = document.createElement('table');
            table.appendChild(this.appendHeaders());
            for (let i = 0; i < productsCat; i++) {
                table.appendChild(this.appendRow(salesData[i]));
            }
        }
        return table;
    },
    appendHeaders: function () {
        const row = document.createElement('tr');
        row.appendChild(this.getHeader('Product'));
        row.appendChild(this.getHeader('Region'));
        row.appendChild(this.getHeader('Jan'));
        row.appendChild(this.getHeader('Feb'));
        row.appendChild(this.getHeader('Mar'));
        row.appendChild(this.getHeader('Apr'));
        row.appendChild(this.getHeader('May'));
        row.appendChild(this.getHeader('Jun'));
        row.appendChild(this.getHeader('Jul'));
        row.appendChild(this.getHeader('Aug'));
        row.appendChild(this.getHeader('Sep'));
        row.appendChild(this.getHeader('Oct'));
        row.appendChild(this.getHeader('Nov'));
        row.appendChild(this.getHeader('Dec'));
        return row;
    },
    getHeader: function (text) {
        const header = document.createElement('th');
        const headerText = document.createTextNode(text);
        header.appendChild(headerText);
        return header;
    },
    appendRow: function (rowData) {
        const row = document.createElement('tr');
        row.appendChild(this.getRowElement(rowData['product']));
        row.appendChild(this.getRowElement(rowData['region']));
        for (let i = 0; i < rowData['sale'].length; i++) {
            row.appendChild(this.getRowElement(rowData['sale'][i]));
        }
        return row;
    },
    getRowElement: function (text) {
        const row = document.createElement('td');
        const rowText = document.createTextNode(text);
        row.appendChild(rowText);
        return row;
    },
};