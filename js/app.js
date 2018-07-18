const regionSelect = document.querySelector('#region-select');
const productSelect = document.querySelector('#product-select');

const action = {
    init: function () {
        getTable.getTableBySelect(this.getValue(regionSelect), this.getValue(productSelect));
    },
    selectRegion: function (event) {
        if (event.target.localName === 'input') {
            const regionValue = this.getValue(regionSelect);
            if (regionValue.length) {
                getTable.getTableBySelect(regionValue, this.getValue(productSelect));
            } else {
                this.keepLastSelection(event.target);
            }
        }
    },
    selectProduct: function (event) {
        if (event.target.localName === 'input') {
            const productValue = this.getValue(productSelect);
            if (productValue.length) {
                getTable.getTableBySelect(this.getValue(regionSelect), productValue);
            } else {
                this.keepLastSelection(event.target);
            }
        }
    },
    getValue: function (parentNode) {
        return Array.from(parentNode.childNodes)
            .filter(node => node.localName === 'input' && node.checked)
            .map(checkbox => checkbox.value);
    },
    keepLastSelection: function (target) {
        target.checked = true;
    }
};