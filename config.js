const debug = false

const placeholder = "%s"

const fallback = "https://www.google.com/search?q=%s"

const config = {
  youtube: "https://www.youtube.com/results?search_query=%s",
}

const _shortcuts = {
  youtube: ["yt"],
}

let shortcuts = {}
for (const k in _shortcuts) {
  for (const v of _shortcuts[k]) {
    shortcuts[v] = k
  }
}

export { debug, placeholder, fallback, config, shortcuts }
