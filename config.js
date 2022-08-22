const debug = false

const placeholder = "%s"

const fallback = "google"

const config = {
  commands: {
    home: "./commands.html",
    search: "./commands.html#%s"
  },
  google: {
    home: "https://www.google.com",
    search: "https://www.google.com/search?q=%s",
    aliases: ["g"],
  },
  youtube: {
    home: "https://www.youtube.com",
    search: "https://www.youtube.com/results?search_query=%s",
    aliases: ["yt"],
  },
}

let aliases = {}
for (const k in config) {
  if (! ("aliases" in config[k])) {
    break
  }
  for (const v of config[k]["aliases"]) {
    aliases[v] = k
  }
}

export { debug, placeholder, fallback, config, aliases }
