let db
const request = window.indexedDB.open("Settings")
request.onerror = (event) => {
    window.alert("humanOS requires IndexedDB to run.")
}
request.onsuccess = (event) => {
    db = event.target.result
}
request.onupgradeneeded = (event) => {
    db = event.target.result
    
    const objectStore = db.createObjectStore("settings", { keyPath: "id" })
    
}
