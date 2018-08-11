const regionSelect = document.querySelectorAll('input[name="region"]');
const productSelect = document.querySelectorAll('input[name="product"]');
const regionAll = document.querySelector('input[name="region-all"]');
const productAll = document.querySelector('input[name="product-all"]');

const init = function () {
    action.loadState(route.load());

    for (let node of regionSelect) {
        node.addEventListener('change', action.selectRegion);
    }
    for (let node of productSelect) {
        node.addEventListener('change', action.selectProduct);
    }
    regionAll.addEventListener('change', action.selectAll);
    productAll.addEventListener('change', action.selectAll);
    tableWrapper.addEventListener('mouseover', action.showGraphs);
    tableWrapper.addEventListener('mouseout', action.resetLineCharts);
};

const action = {
    getValue: function (parentNodes, getAll) {
        return Array.from(parentNodes)
            .filter(node => node.checked || getAll)
            .map(checkbox => checkbox.value);
    },
    loadState: function (result) {
        action.setChecked(regionSelect, result['region']);
        action.setChecked(productSelect, result['product']);
        getTable.getTableBySelect(result['region'], result['product']);
    },
    setChecked: function (parentNodes, values) {
        for (const node of Array.from(parentNodes)) {
            node.checked = values.indexOf(node.value) > -1;
        }
    },
    keepChecked: function (target) {
        target.checked = true;
    },
    selectRegion: function (event) {
        const regionValue = action.getValue(regionSelect);
        if (regionValue.length) {
            (regionValue.length < 3) ? action.checkSelectAllRegion(false) :
                action.checkSelectAllRegion(true);
            const productValue = action.getValue(productSelect);
            getTable.getTableBySelect(regionValue, productValue);
            route.save({ region: regionValue, product: productValue });
        } else if (event) {
            action.keepChecked(event.target);
        }
    },
    selectProduct: function (event) {
        const productValue = action.getValue(productSelect);
        if (productValue.length) {
            (productValue.length < 3) ? action.checkSelectAllProduct(false) :
                action.checkSelectAllProduct(true);
            const regionValue = action.getValue(regionSelect);
            getTable.getTableBySelect(regionValue, productValue);
            route.save({ region: regionValue, product: productValue });
        } else if (event) {
            action.keepChecked(event.target);
        }
    },
    selectAll: function (event) {
        switch (event.target.name) {
            case 'region-all':
                action.selectAllRegions(); break;
            case 'product-all':
                action.selectAllProducts(); break;
        }
    },
    selectAllRegions: function () {
        if (regionAll.checked) {
            const nodes = Array.from(regionSelect)
                .forEach(select => select.checked = true);
            action.selectRegion();
        }
    },
    selectAllProducts: function () {
        if (productAll.checked) {
            const nodes = Array.from(productSelect)
                .forEach(select => select.checked = true);
            action.selectProduct();
        }
    },
    checkSelectAllRegion: function (status) {
        regionAll.checked = status;
    },
    checkSelectAllProduct: function (status) {
        productAll.checked = status;
    },
    showGraphs: function (event) {
        const row = event.path.find(ele => ele.localName === 'tr');
        if (row) {
            const sales = Array.from(row.attributes).find(attr => attr.localName === 'sales');
            if (sales) {
                const constraint = sales.nodeValue.split(' ');
                const data = processData.getDataBySelect(constraint[1], constraint[0]);
                barChart.create(data[0].sale, data[0].region + ' ' + data[0].product + ' Sale');
                lineChart.create(data[0].sale, data[0].region + ' ' + data[0].product + ' Sale');
            }
        }
    },
    resetLineCharts: function (event) {
        const salesData = processData.getDataBySelect(action.getValue(regionSelect), action.getValue(productSelect));
        getTable.displayLineChart(salesData);
    }
};

window.addEventListener('popstate', function (event) {
    action.loadState(route.load());
});