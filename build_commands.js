import { fallback, config, _aliases } from "./config.js"

const createTableRow = function (name, home, aliases) {
  const tr = document.createElement("tr")

  const tdName = document.createElement("td")
  tdName.innerHTML = `<a href="${home}" target="_blank"><strong>${name}</strong></a>`
  tr.appendChild(tdName)

  const tdAliases = document.createElement("td")
  tdAliases.innerHTML = `<code>${aliases}</code>`
  tr.appendChild(tdAliases)

  return tr
}

window.onload = function () {
  // fallback
  const commandsTable = document.getElementById("commands-table")
  commandsTable.appendChild(
    createTableRow(
      `Fallback: ${fallback}`,
      config[fallback]["home"],
      fallback in _aliases ? _aliases[fallback] : []
    )
  )

  // commands
  Object.keys(config)
    .sort()
    .forEach((k, i) => {
      if (k !== fallback) {
        commandsTable.appendChild(
          createTableRow(k, config[k]["home"], k in _aliases ? _aliases[k] : [])
        )
      }
    })
}
