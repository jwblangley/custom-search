import { debug, placeholder, fallback, config } from "./config.js"

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
  const lm = longestMatch(config, sanitisedSearchString, SPACE)

  if (!lm) {
    return fallback.replace(
      placeholder,
      sanitisedSearchString.replaceAll(SPACE, ENCODED_SPACE)
    )
  }

  const [command, args] = lm
  return config[command].replace(
    placeholder,
    args.replaceAll(SPACE, ENCODED_SPACE)
  )
}

window.onload = function () {
  const fallbackDOM = document.getElementById("fallback")
  fallbackDOM.innerHTML = fallback
  const configDOM = document.getElementById("config")
  configDOM.innerHTML = JSON.stringify(config)

  const debugTable = document.getElementById("debug-table")

  const searchString = window.location.search
  debugTable.appendChild(createTableRow("Search string", searchString))

  const sanitisedSearchString = searchString
    .replace("?q=", "")
    .replaceAll(ENCODED_SPACE, SPACE)
    .trim()
  debugTable.appendChild(
    createTableRow("Sanitised search string", sanitisedSearchString)
  )

  const redirect = getRedirect(sanitisedSearchString)
  const outputDOM = document.getElementById("output")
  outputDOM.innerHTML = redirect
  outputDOM.setAttribute("href", redirect)

  if (debug) {
    return
  }

  window.location.replace(redirect)
}
