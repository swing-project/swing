# TODO

- Do random wallpaper on system creation, not just that one hardcoded one (code example 3)
- Create a wallpaper switcher that uses the built-in Unsplash wallpapers
  - Since I'm not too good at making galleries like you'd expect here, do dropdowns where the value is the CSS `url()` value to the wallpaper (just like right now) and custom will just read from a text box instead (code example 1)
- Create a system to read HTML contents from external sources to split up the process for larger applications.
  This will be part of the API. (code example 2) This will also create the need for a way to access the client path, since just putting in a relative path will actually be relative to the humanOS path.
- Finish creating a dialogue for every type of input, not just buttons.
  - [ ] File Upload
  - [ ] Text Input
- Make it so that only windows with an option bar have the extra padding at the bottom.
- Create a Welcome app somewhat like KDE's
  - [openSUSE Welcome App](etc/kde_opensuse_welcome.png)
- In-built web browser (ionicon 'globe-outline')
- Create a window playground
- Create a way to pass in parameters on app open
- More versatile storage system with IndexedDB
  - <https://javascript.info/indexeddb>
  - <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB>
- Custom context menu
  - <https://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage>
  - <https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event>
  - <https://www.jqueryscript.net/demo/Simple-jQuery-Right-Click-Context-Menu-Plugin/demo/>
- Try best to remove "Apply" buttons wherever possible
  - <https://stackoverflow.com/questions/6159837/how-to-call-a-javascript-function-onchange-of-a-select-tag>
- Reduce template typing so that class names aren't too long (this is the problem with directly injecting html into the page)
  - `object.content.replace(/class="--/g, 'class="' + windowId + '"')` will probably do the trick
- Compact mode (reduces padding and gap size)
- Tab control
  - <https://jsfiddle.net/samrland/s17bv0t9/11/> (see implementation in `ivy:docs`)
  - <https://www.w3schools.com/howto/howto_js_tabs.asp>

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

## Reference

- <https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-901144>
- <https://popup-no-js--fairies0feast.repl.co/>
