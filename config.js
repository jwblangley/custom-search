const debug = true

const placeholder = "%s"

const fallback = {
  home:"https://www.google.com",
  search:"https://www.google.com/search?q=%s",
}

const config = {
  youtube: {
    home: "https://www.youtube.com",
    search: "https://www.youtube.com/results?search_query=%s",
  },
}

const _aliases = {
  youtube: ["yt"],
}

let aliases = {}
for (const k in _aliases) {
  for (const v of _aliases[k]) {
    aliases[v] = k
  }
}

export { debug, placeholder, fallback, config, aliases, _aliases }
