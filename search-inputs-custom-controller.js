const isDev = true

;(function () {

  setTimeout(launch, 500)

  function launch() {
    if (isDev !== true) {
      setTimeout(() => {
        console.clear()
      }, 2000)
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
        return
      }
    }
  }
})();

function searchInputsCustomController() {
  const SELECTORS = {
    inputTextDefault: ['input[type="search"]', 'input[type="text"]', '[contenteditable]']
  }

  addKeyboardListeners(SELECTORS)
}

function addKeyboardListeners(SELECTORS) {
  document.addEventListener("keyup", function (event) {

    if (event.keyCode == 8 && event.shiftKey === true && event.ctrlKey === true) {

      return checkAllInputsNotHasFocus() && moveCaretToInput(event, {
        SELECTORS,
        clear: true,
        customClear: true
      }) && event.preventDefault()
    }


    if (event.keyCode == 8 && event.shiftKey === true) {

      return checkAllInputsNotHasFocus() && moveCaretToInput(event, {
        SELECTORS,
        clear: true,
        customClear: false
      }) && event.preventDefault()
    }


    if (event.keyCode == 8 && event.ctrlKey === true) {
      return checkAllInputsNotHasFocus() && moveCaretToInput(event,
        {
          SELECTORS,
          clear: false,
          customClear: false
        }
      ) && event.preventDefault()
    }


    if (event.keyCode == 8) {
      return checkAllInputsNotHasFocus() && moveCaretToInput(event,
        {
          SELECTORS,
          clear: false,
          customClear: false
        }
      ) && event.preventDefault()
    }
  });
}

function checkAllInputsNotHasFocus() {

  const allInputs = getAllInputs()

  let noFocus = true

  allInputs.forEach(input => {
    if (input === document.activeElement) {
      noFocus = false
    }
  })


  function getAllInputs() {
    const allInputs = document.querySelectorAll('input')
    return allInputs
  }

  return noFocus
}

function moveCaretToInput(event, opt = {}) {
  
  console.table(opt)

  const {
    SELECTORS,
    clear,
    customClear
  } = opt

  const input = getInput(SELECTORS)

  if (!input) {
    return
  }

}

function getInput(SELECTORS) {
  const inputElement = getInputTextDefault(SELECTORS)
  // Element finds
  if (!inputElement) {
    isDev && console.warn(`
      [ searchInputsCustomController ]
      NOT FOUND INPUT 
      `)
    return null
  }
  return inputElement

  function getInputTextDefault(SELECTORS) {
    const defSels = SELECTORS.inputTextDefault
    for (const selector of defSels) {
      const found = getElemBySelector(selector)
      if (found !== null) {
        return found
      }
    }
    return null
  }
}

function getElemBySelector(selector, isRequired = false) {
  const element = document.querySelector(selector)
  if (element === null) {
    if (isRequired === true) {
      throw new Error(`Not found element by selector: ${selector}`)
    }
    isDev && console.warn(`Not found element by selector: ${selector}`)
    return null
  }

  isDev && console.warn(`found by: ${selector}`)

  return element
}