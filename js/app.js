const regionSelect = document.querySelector('#region-select');
const productSelect = document.querySelector('#product-select');

const action = {
    init: function () {
        getTable.getTableBySelect(regionSelect.value, productSelect.value);
    },
    selectRegion: function (event) {
        getTable.getTableBySelect(event.target.value, productSelect.value);
    },
    selectProduct: function (event) {
        getTable.getTableBySelect(regionSelect.value, event.target.value);
    }
};