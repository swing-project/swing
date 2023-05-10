const record = {
    '1': {
        'title': 'Maximizing windows does not pay attention to options bar',
        'description': 'function was written before implementation of the options bar',
        'function': 'toggleMaximize',
        'gmtdate': '2023-04-30 02:33',
        'localdate': 'pst 2023-04-29 18:33',
        'solved': false,
        'fix': {
            'title': '',
            'description': '',
            'gmtdate': '',
            'localdate': ''
        }
    },
    '2': {
        'title': 'Maximizing windows does not properly move the window back to its original spot',
        'description': 'After restoring windows, they should be moved back to the original position, but they do not',
        'function': 'restoreWindow',
        'gmtdate': '2023-04-30 03:56',
        'localdate': 'pst 2023-04-29 19:56',
        'solved': false,
        'fix': {
            'title': '',
            'description': '',
            'gmtdate': '',
            'localdate': ''
        }
    }
}

export const client = {
    'title': 'Bugmanner',
    'id': 'ivy:bugmanner',
    'icon': 'build-outline',
    'size': {
        'preset': 'small'
    },
    'content': `
    <div class="flex gap-1 flexdir-row">
        <input type="text" id="%human%-search" inputmode="numeric" pattern="[0-9]*" placeholder="Bug ID" />
        <button id="%human%-search-button" type="button">Go</button>
    </div>

    <div id="%human%-content" class="mw-600 radii-8 m-auto">
        <h3 class="title"></h3>
        <p class="description"></p>
        <p class="function"><code class="monospace"></code></p>
        <div class="date">
            <span class="gmt"></span>
            <span class="local fg-darkgrey"></span>
        </div>
        <p class="tag ta-center fg-white p-4 radii-4"></p>
    </div>
    `,
    'onload': function (clientId, _api) {
        return function () {
            const button = document.getElementById(`${clientId}-search-button`)
            button.addEventListener('click', function () {
                const bugobject = record[document.getElementById(`${clientId}-search`).value]

                const content = document.getElementById(`${clientId}-content`)
                content.querySelector('.title')          .innerText = bugobject.title
                content.querySelector('.description')    .innerText = bugobject.description
                content.querySelector('.function > code').innerText = bugobject.function
                content.querySelector('.date > .gmt')    .innerText = bugobject.gmtdate
                content.querySelector('.date > .local')  .innerText = bugobject.localdate

                const tag = content.querySelector('.tag')
                if (bugobject.solved) {
                    tag.innerText = 'solved'
                    tag.style.backgroundColor = 'limegreen'
                } else {
                    tag.innerText = 'unsolved'
                    tag.style.backgroundColor = 'red'
                }
            })
        }
    }
}
