local swing = require("SwingAPI")

local information = {}
information.title = "SomeApp"
information.author = "samr"
information.size = "800x500"
information.permissions = [
    "screen.filter"
]

local function main(window)
    swing.setMenuOptions(window, {
        ["Program"] = {
            ["About"] = "openAboutDialog";
            ["SWING_SEPERATOR"] = "";
            ["Quit"] = "SWING_QUIT_APP"
        };
        ["Colors"] = {
            
        }
    })
end

local function reciever(message)
    if (message == "openAboutDialog") then
        
    end
end

swing.new(information, main, reciever)
