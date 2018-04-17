block('root')({
    replace: (node, ctx) => {
        const data = node.data = ctx.data;
        const device = data.device;

        if (ctx.context) return ctx.context;

        return {
            block: 'page',
            title: data.title,
            favicon: 'img/favicon.ico',
            styles: [
                {
                    elem: 'css',
                    url: `/css/index.${device}.min.css`
                }
            ],
            scripts: [
                {
                    elem: 'js',
                    url: `/js/index.${device}.min.js`
                }
            ],
            head: [
                { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
                { elem: 'meta', attrs: { name: 'robots', content: 'noindex'}}
            ],
        };
    }
});
