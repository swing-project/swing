# The Swing Filesystem

NOTE: Most of this isn't implemented yet. The notes directory is just for future stuff and stuff.

## File Structure

The file structure is somewhat modeled off of how Amiga did file paths: prefixes.

It was tempting to do something Unix-ish, "everything's a file" mentality, but this makes a bit more sense.

Here are some example paths:

- `Objects:NULL`
- `User:config/custom.css`
- `System:resources/sounds/pop-2.mp3`

## Organization

Files will be stored in local storage.
Simple enough, right?

To keep track of what's a file and what isn't, there will be an item with a list of all of the current working files and metadata.
We'll have `localStorage['filesystem']`:

```json
[
    {
        "type": "text",
        "mime": "text/plain",
        "name": "My Text File",
        "properties": {},
        "attributes": {
            "write-last-open": "",
            "organization-document-type": "work"
        }
    },
    {
        "type": "directory",
        "name": "config",
        "properties": {
            "no-touch": true
        },
        "contents": [
            {
                "type": "text",
                "mime": "text/css",
                "name": "custom.css",
                "properties": {
                    "category-customization": true
                },
                "attributes": {}
            }
        ]
    }
]
```

`properties` can only be directly set by the system, nothing else.
This includes information like hard properties that shouldn't be messed with such as no deletion for system folders.

`attributes` can be set by the user or applications, and can be custom to store special metadata.
There may be a customizable sorting feature in the file manager in the future.

That `no-touch` property means no deleting or creating new files/directories inside,
but the user is welcome to edit the contents of the files inside.

## Interface

There will be a few functions to work with files (filesystem access is not OO, so no 'file' objects; you have to pass in the filename every time):

### Getters

- `api.fs.getFile(filename)` will be used to get all the information for a file/directory (everything in the filesystem object and the contents under a key called, well, `content`. however, if it is a directory, it will not list the content for all files inside; see `getDirectoryContents`) This is what applications should use.
- `api.fs.getContent(filename)` will be used to get the content of a file (just the content, no metadata)
- `api.fs.getMetadata(filename)` will be used to get just the metadata
- `api.fs.getDirectoryContents(directoryname)` will be used to get the content for all files inside a directory, but not the metadata. This should be used in conjunction with `getFile`.

### Setters

- `api.fs.writeFile(filename)` will be used to write to the file. This will take into account if non-system interfaces are allowed to write to the file, and if not, will just stop. This will overwrite the current content.

### Modifiers

- `api.fs.delete(filename)` will be used to delete a file (excluding directories). This will take into account if non-system interfaces are allowed to write to the file, and if not, will just stop. This completes without any warning to the user, so make sure to implement your own warning box.
- `api.fs.deleteDirectory(filename)` will be used to delete a directory. This follows all the same principles as `delete` above. The reason this is a different function is because deleting a directory can be far more dangerous than deleting only a file.
- `api.fs.setAttribute(filename, attributeName, attributeContent)` will be used to set attribute values. This should be used in conjunction with `api.fs.getMetadata`.

### Handler

There will probably also be a handler like `with open as` in Python, that lets you pass in how you're going to modify the file (read, write, append, etc.) and a function with the actions on the file.
Something like:

```js
const object      = document.getElementById(`${clientId}-textObject`)
const dateObject  = new Date()
const currentDate = `${ dateObject.getFullYear() }-${ dateObject.getMonth() }-${ dateObject.getDate() }`

api.fs.commit("User:My Cool Text File", "write", function (f) {
    object.innerText = api.sanitize(  // api.sanitize isn't introduced yet, but will be used to sanitize HTML strings
        f.read()
    )
    f.write(f.read() + currentDate)
})
```
