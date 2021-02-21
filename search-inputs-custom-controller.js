;(function () {

  const isDev = true

  setTimeout(launch, 500)

  function launch() {
    if (isDev !== true) {
      searchInputsCustomController()
    } else {
      try {
        searchInputsCustomController()
      } catch (err) {
        const message = `
          Error [ searchInputsCustomController ]
          ${err.message || ''}
          `
        alert(message)
      }
    }
  }
})();

function searchInputsCustomController() {
console.log('launch')
}