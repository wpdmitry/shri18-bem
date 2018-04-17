({
    shouldDeps: [
        {
            block: 'card',
            mods: { size: ['s', 'm', 'l'] },
            elems: [
                {
                    elem: 'title',
                    mods: { size: ['s', 'm', 'l'] },
                },
                {
                    elem: 'img',
                    mods: { size: ['s', 'm', 'l'] },
                },
                {
                    elem: 'description',
                    mods: { size: ['s', 'm', 'l'] },
                },
                {
                    elem: 'toolbox',
                    mods: { size: ['s', 'm', 'l'], down: true },
                }
            ]
        },
        {
            block: 'author',
        }
    ]
})