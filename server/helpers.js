module.exports = () => {
    const _data = require('./data');

    return {
        getData(device) {
            const transition = this.transition(device);

            let newData = _data.slice();
            newData.forEach(d => {
                d.size = transition[d.size]
            });

            return newData;
        },

        transition(device) {
            let transition;

            switch (device) {
                case 'phone': {
                    transition = {
                        's': 's',
                        'm': 's',
                        'l': 's',
                    };
                    break;
                }
                case 'tablet': {
                    transition = {
                        's': 's',
                        'm': 'm',
                        'l': 'm',
                    };
                    break;
                }
                case 'desktop': {
                    transition = {
                        's': 's',
                        'm': 'm',
                        'l': 'l',
                    };
                    break;
                }
            }

            return transition;
        }
    }
};