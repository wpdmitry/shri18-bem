module.exports = () => {
    const _data = require('./data');

    return {
        getData(device) {
            // клонирование и полный обход всех данных происходит на каждый запрос
            // вместо этого можно при старте приложения подготавливать данные на каждый девайс один раз
            const transition = this.transition(device);

            let newData = _data.slice();
            newData.forEach(d => {
                d.size = transition[d.size]
            });

            return newData;
        },

        transition(device) {
            return Object.assign({ s: 's', m: 'm', l: 'l' }, {
                phone: { m: 's', l: 's', },
                tablet: { l: 'm' }
            }[device]);
        }
    }
};
