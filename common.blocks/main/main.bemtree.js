block('main').content()(function() {
    return this.data.cards.map(function (card) {
        const result = {
            block: 'card',
            mods: { size: card.size },
            content: [],
        };

        const content = result.content;

        const title = {
            elem: 'title',
            elemMods: {size: card.size},
            attrs: { style: `color: ${card.titleColor }`},
            content: card.title,
        };
        content.push(title);


        if (card.image) {
            const img = {
                elem: 'img',
                tag: 'img',
                elemMods: { size: card.size },
                attrs: { src: card.image.replace('.png', '@3x.png')},
                // content: [
                //     {
                //         tag: 'source',
                //         attrs: { srcset: card.image, media: 'screen and (max-width:399px)' },
                //         mix: {block: 'card', elem: 'img'}
                //     },
                //     {
                //         tag: 'source',
                //         attrs: { srcset: card.image.replace('.png', '@2x.png'), media: 'screen and (min-width: 400px) and (max-width:1199px)' },
                //         mix: {block: 'card', elem: 'img'}
                //     },
                //     {
                //         tag: 'source',
                //         mix: {block: 'card', elem: 'img'},
                //         attrs: { srcset: card.image.replace('.png', '@3.png'), media: 'screen and (min-width:1200px)' },
                //     },
                //     {
                //         tag: 'img',
                //         mix: {block: 'card', elem: 'img'},
                //         attrs: { srcset: card.image.replace('.png', '@3.png'), width: '100%'},
                //     }
                // ],
            };

            content.push(img);
        }


        if (card.description) {
            const description = {
                elem: 'description',
                elemMods: { size: card.size },
                content: card.description,
            };

            content.push(description);
        }


        let author;
        if (card.channelName) {
            author = {
                block: 'author',
                content: card.channelName,
            };
        } else {
            author = '';
        }

        const toolbox = {
            elem: 'toolbox',
            elemMods: { size: card.size, down: !!card.channelName },
            content: [
                author,
                {
                    tag: 'img',
                    attrs: { src: 'img/Actions.png'}
                },
                {
                    tag: 'img',
                    attrs: { src: 'img/Heart.png'}
                }
            ]
        };


        content.push(toolbox);

        return result;
    })
});