import { debug, placeholder, fallback, config, aliases } from "./config.js"

const SPACE = " "
const ENCODED_SPACE = "%20"

const createTableRow = function (key, value) {
  const tr = document.createElement("tr")

  const tdKey = document.createElement("td")
  tdKey.innerHTML = `<strong>${key}:</strong>`
  tr.appendChild(tdKey)

  const tdValue = document.createElement("td")
  tdValue.innerHTML = `<code>${value}</code>`
  tr.appendChild(tdValue)

  return tr
}

const longestMatch = function (validKeys, key, delimeter) {
  let i = key.length
  while (i > 0) {
    const subCommand = key.substring(0, i + 1)
    if (subCommand in validKeys) {
      const args = key.substring(i + 1).startsWith(delimeter)
        ? key.substring(i + 1 + delimeter.length)
        : key.substring(i + 1)
      return [subCommand, args]
    }

    i = key.lastIndexOf(delimeter, i)
    i--
  }

  return null
}

const getRedirect = function (sanitisedSearchString) {
  const maybeAlias = sanitisedSearchString.split(SPACE)[0]
  if (maybeAlias in aliases) {
    sanitisedSearchString = sanitisedSearchString.replace(
      maybeAlias,
      aliases[maybeAlias]
    )
  }

  const lm = longestMatch(config, sanitisedSearchString, SPACE)

  if (!lm) {
    return config[fallback]["search"].replace(
      placeholder,
      sanitisedSearchString.replaceAll(SPACE, ENCODED_SPACE)
    )
  }

  const [command, args] = lm
  if (args === "") {
    return config[command]["home"]
  }
  return config[command]["search"].replace(
    placeholder,
    args.replaceAll(SPACE, ENCODED_SPACE)
  )
}

window.onload = function () {
  const searchString = window.location.search
  const sanitisedSearchString = searchString
    .replace("?q=", "")
    .replaceAll(ENCODED_SPACE, SPACE)
    .trim()
  const redirect = getRedirect(sanitisedSearchString)

  if (!debug) {
    window.location.replace(redirect)
    return
  }

  const fallbackDOM = document.getElementById("fallback")
  fallbackDOM.innerHTML = fallback

  const debugTable = document.getElementById("debug-table")

  debugTable.appendChild(createTableRow("Search string", searchString))

  debugTable.appendChild(
    createTableRow("Sanitised search string", sanitisedSearchString)
  )

  const outputDOM = document.getElementById("output")
  outputDOM.innerHTML = redirect
  outputDOM.setAttribute("href", redirect)
}
