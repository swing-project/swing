// welcome!
export const client = {
    id: 'ivy--welcome',
    title: 'Welcome',
    size: {
        height: '500px',
        width: '800px',
        rigid: true,
    },
    pref: {
        noPadding: true,
    },
    icon: 'information-circle-outline',
    content: `
    <div class="%human%-body">
        <h2 class="%human%-title">Welcome to <span class="accent">humanOS</span></h2>

        <div class="%human%-columns">
            <div class="%human%-column">
                <h3>Start here</h3>
                
                <button style="--bg-color: 255 215 0; --fg-color: 0 0 0;"><ion-icon name="book-outline"></ion-icon>Read me</button>
            </div>
        </div>
    </div>

    <div class="%human%-bottom-bar">
        <button class="%human%-closebutton"><ion-icon name="close-circle-outline"></ion-icon>Close</button>
    </div>
    
    <style>
    [class="%human%-body"] {
        padding-left: 32px;
        padding-right: 32px;
        padding-top: 16px;
        padding-bottom: 16px;
        height: 100%;
    }

    [class="%human%-body"] > [class="%human%-title"] {
        font-size: 4rem;
    }

    [class="%human%-body"] > [class="%human-columns"] {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }

    [class="%human%-body"] > [class="%human%-columns"] > [class="%human%-column"] {
        flex: 1;
        height: 100%;
    }

    [class="%human%-body"] > [class="%human%-columns"] > [class="%human%-column"] > h3 {
        font-size: 2rem;
    }

    [class="%human%-body"] > [class="%human%-columns"] > [class="%human%-column"] button {
        font-size: 1rem;
        border: none !important;
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
        justify-content: center;
        color: rgba(var(--fg-color) / 100%) !important;
        background-color: rgba(var(--bg-color) / 100%) !important;
    }

    [class="%human%-body"] > [class="%human%-columns"] > [class="%human%-column"] button:hover {
        background-color: rgba(var(--bg-color) / 85%) !important;
    }

    [class="%human%-bottom-bar"] {
        position: absolute;
        bottom: 0;
        background-color: rgba(0 0 0 / 10%);
        width: 100%;
        padding: 8px;
        display: flex;
        flex-direction: row-reverse;
    }

    [class="%human%-closebutton"] {
        background-color: rgba(210 50 0 / 100%) !important;
        color: white;
        display: inline-flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
        justify-content: center;
        border: none !important;
        font-size: 1rem;
    }

    [class="%human%-closebutton"]:hover {
        background-color: rgba(210 50 0 / 85%) !important;
    }
    </style>
    `
}
