const fs = require('fs');
const path = require('path');
const nodeEval = require('node-eval');
const helpers = require('./helpers')();

const bundleName = 'index';
const pathToBundle = {
    'desktop': path.resolve(__dirname, '..', 'bundles/desktop.bundles', bundleName),
    'phone': path.resolve(__dirname, '..', 'bundles/phone.bundles', bundleName),
    'tablet': path.resolve(__dirname, '..', 'bundles/tablet.bundles', bundleName),
};

const isDev = process.env.NODE_ENV === 'development';
let templates = getTemplates();

function render(req, res, data, context) {
    const device = data.device;
    const cards = helpers.getData(device);

    const bemtreeCtx = {
        block: 'root',
        context: context,
        data: Object.assign({}, {
            url: req._parsedUrl,
            cards,
            device,
        }, data)
    };

    if (isDev) templates = getTemplates();

    let bemjson;

    try {
        bemjson = templates[device].BEMTREE.apply(bemtreeCtx);
    } catch(err) {
        console.error('BEMTREE error', err.stack);
        console.trace('server stack');
        return res.sendStatus(500);
    }

    let html;

    try {
        html = templates[device].BEMHTML.apply(bemjson);
    } catch(err) {
        console.error('BEMHTML error', err.stack);
        return res.sendStatus(500);
    }

    res.send(html);
}

function evalFile(filename) {
    return nodeEval(fs.readFileSync(filename, 'utf8'), filename);
}

function getTemplates() {
    const tmpl = {};

    Object.keys(pathToBundle).forEach(device => {
        tmpl[device] = {
            BEMTREE: evalFile(path.join(pathToBundle[device], bundleName + '.bemtree.js')).BEMTREE,
            BEMHTML: evalFile(path.join(pathToBundle[device], bundleName + '.bemhtml.js')).BEMHTML
        };
    });

    return Object.assign({}, tmpl);
}

module.exports = {
    render: render,
};
