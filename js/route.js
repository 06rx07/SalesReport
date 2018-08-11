const salesStateKeys = ['region', 'product'];

const route = {
    load: function () {
        const hash = location.hash.substring(1).split('&&');
        const result = {};
        for (let i = 0; i < salesStateKeys.length; i++) {
            result[salesStateKeys[i]] = route.getSelectedValue(hash[i]);
        }
        return result;
    },
    getSelectedString: function (selected) {
        if (Array.isArray(selected) && selected.length > 0) {
            let resultStr = '';
            for (const val of selected) {
                resultStr += val + ',';
            }
            return resultStr.substring(0, resultStr.length - 1);
        }
        return '';
    },
    getSelectedValue: function (hashStr) {
        return hashStr ? hashStr.split('=')[1].split(',') : [];
    },
    save: function (result) {
        let hashString = '';
        for (let key in result) {
            hashString += key + '=' + route.getSelectedString(result[key]) + '&&';
        }
        location.hash = hashString.substring(0, hashString.length - 2);
    }
};

