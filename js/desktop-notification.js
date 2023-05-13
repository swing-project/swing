function desktopNotification(object)
{
    const title = object['title'], description = object['description']
    const action = object['action'] ? object['action'] : function(){}
    const playSound = (object['playSound'] != (null || undefined)) ? object['playSound'] : true

    const notification = document.createElement('div')
    notification.className = 'desktop-notification'
    notification.innerHTML = `<h3>${title}</h3><p>${description}</p>`
    notification.onclick = action
    notification.addEventListener('click', () => notification.remove())
    document.getElementById('notification-area').appendChild(notification)
    playSound ? playInternalSound('pop-2.mp3') : function(){}() // i can't think of a single other way to do this
}

/**
 * Dismiss all notifications on the desktop at the current point in time.
 */
function notificationDismissAll()
{
    document.querySelectorAll('#notification-area > .desktop-notification').forEach(function(currentValue, _currentIndex, _listObj) { currentValue.remove() })
}
