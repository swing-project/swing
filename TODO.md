# TODO

- Do random wallpaper on system creation, not just that one hardcoded one (code example 3)
- Make it possible to completely edit the app grid
- Make the search bar in the app grid actually do something
  - <https://jsfiddle.net/samrland/jLha4xr6/>
- Create an app list which appears mostly the same as the app grid (same part of the screen, same search bar), but uses a scrolling list rather than a grid of icons
- Create a wallpaper switcher that uses the built-in Unsplash wallpapers
  - Since I'm not too good at making galleries like you'd expect here, do dropdowns where the value is the CSS `url()` value to the wallpaper (just like right now) and custom will just read from a text box instead (code example 1)
- Figure out a way to completely capture user input until they press some button
  - Until I figure that out, make sure to only use working shorcuts
    - <https://www.w3schools.com/tags/ref_keyboardshortcuts.asp>
- Create a system to read HTML contents from external sources to split up the process for larger applications.
  This will be part of the API. (code example 2) This will also create the need for a client path template, since just putting in a relative path will actually be relative to the humanOS path.
- Make it so that only windows with an option bar have the extra padding at the bottom.
- Create a Welcome app somewhat like KDE's
  - [openSUSE Welcome App](etc/kde_opensuse_welcome.png)
- In-built web browser (ionicon 'globe-outline')
- Create a window playground
- Context system
  - Remove access to everything else by resetting window. This can be done by removing the wrapping from the definition, and instead wrapping on creation.
    - Here's how onload would work in this new system: `windowObject.onload = () => { let window = {}; object.onload(windowId, api, args) }`
    - However, this will be hard to do since the API doesn't currently give access to everything needed, and it will need a major refactoring of basically all current built-in apps (settings!)
  - `%url%` template
  - Create a way to style stuff inside of `#window > .content` (code example 4)
  - Reduce template typing so that class names aren't too long (this is the problem with directly injecting html into the page)
    - `object.content.replace(/id="--/g, 'id="' + windowId)` will probably do the trick, along with a handler for single-quotes
- More versatile storage system with IndexedDB
  - <https://javascript.info/indexeddb>
  - <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB>
- Custom context menu
  - <https://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage>
  - <https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event>
  - <https://www.jqueryscript.net/demo/Simple-jQuery-Right-Click-Context-Menu-Plugin/demo/>
- Try best to remove "Apply" buttons wherever possible
  - Use non-text input options as often as possible, like `onclick` on a checkbox or select menu will automatically apply the settings.
    Only use text input options when necessary and include the necessary Apply buttons there, but these will be behind advanced options
    - <https://stackoverflow.com/questions/6159837/how-to-call-a-javascript-function-onchange-of-a-select-tag>
- Compact mode (reduces padding and gap size)
- Tab control
  - <https://jsfiddle.net/samrland/s17bv0t9/11/> (see implementation in docs)
  - <https://www.w3schools.com/howto/howto_js_tabs.asp>
- Create a proper API rather than just stuffing inline HTML without even supporting JSX due to the front-end nature of humanOS
  - The Be API is a good role-model here, not just because it's actually fun to use, but also because Haiku rules!

## Code Examples

### Code Example 1

```html
<select id="%human%-wallpaper-selector">
  <option value="url('/wallpapers/unsplash-collection/....jpg')">Wallpaper Description</option>
  <!-- ... -->
  <option value="custom" onclick="ivySettingsToggleCustom('%human%')">Custom</option>
</select>

<div id="%human%-wallpaper-custom-container">
  <label for="%human%-wallpaper-custom">Custom Wallpaper URL</label>
  <input type="text" id="%human%-wallpaper-custom" />
</div>
```

```js
function ivySettingsToggleCustom(givenWindowId) {
  // if (givenWindowId === clientId) { // check if this is coming from the same window // commented out because this may cause errors with other settings windows, need to test
  const isValueCustom = (document.getElementById(`${givenWindowId}-wallpaper-selector`).value === 'custom')
  const customInputContainer = document.getElementById(`${givenWindowId}-wallpaper-custom-container`)
  if (isValueCustom) {
    customInputContainer.style.display = 'block'
  } else {
    customInputContainer.style.display = 'none'
  }
  /* work on this later
  if (customInputContainer.style.diplay === 'block') {
    customInputContainer.style.display === 'none'
  } else {
    customInputContainer.style.display === 'block'
  }
  */
// }
}
```

### Code Example 2

```js
export const client = {
  /* ... */
  'content': function (clientId, api) {
    return /* await? */ api.readOut(`${api.clientPath}/main.html`)
  }
}
```

### Code Example 3

```js
const builtInWallpaperCollection = [
  "jeremy-bishop-cEeEtjedNls-unsplash.jpg",
  "jeremy-bishop-KFIjzXYg1RM-unsplash.jpg",
  "rex-pickar-DoZcHV5t9Bw-unsplash.jpg",
  "photo-1544892504-5a42d285ab6f.jpeg",
  "photo-1458501534264-7d326fa0ca04.jpeg",
  "photo-1465147264724-326b45c3c59b.jpeg",
  "photo-1470137430626-983a37b8ea46.jpeg",
  "photo-1472396961693-142e6e269027.jpeg"
]
```

### Code Example 4


```js
const windowObject = {
  content: `
  <div class="wrapper">
    <button type="button">Hey!</button>
  </div>
  `,
  styles: [
    {
      selector: '.wrapper', // will be applied to `#window > .content .wrapper`
      rules: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px'
      }
    },
    {
      selector: '.wrapper > button', // will be applied to `#window > .content .wrapper > button`
      rules: {
        color: 'var(--accent)'
      }
    }
  ]
}
```

## Reference

- <https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-901144>
- <https://popup-no-js--fairies0feast.repl.co/>
