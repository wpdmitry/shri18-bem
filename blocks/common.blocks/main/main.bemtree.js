block('main').content()(node => node.data.cards.map(card => ({
    block: 'card',
    mods: { size: card.size },
    content: [
        {
            elem: 'title',
            elemMods: {size: card.size},
            attrs: { style: `color: ${card.titleColor }`},
            content: card.title,
        },
        card.image ? {
            elem: 'img',
            tag: 'img',
            elemMods: { size: card.size },
            attrs: { src: card.image.replace('.png', '@3x.png')}
        } : '',
        card.description ? {
            elem: 'description',
            elemMods: { size: card.size },
            content: card.description,
        } : '',
        {
            elem: 'toolbox',
            elemMods: { size: card.size, down: !!card.channelName },
            content: [
                card.channelName ? {
                    block: 'author',
                    content: card.channelName,
                } : '',
                {
                    tag: 'img',
                    attrs: { src: 'img/Actions.png'}
                },
                {
                    tag: 'img',
                    attrs: { src: 'img/Heart.png'}
                }
            ]
        }
    ]
})));
