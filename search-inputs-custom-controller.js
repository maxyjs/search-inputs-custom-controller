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
        return alert(message)
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

  const checkAllInputsNotHasFocusBinded = checkAllInputsNotHasFocus.bind(null, SELECTORS.inputTextDefault)

  document.addEventListener("keyup", function (event) {

    if (event.keyCode == 8 && event.shiftKey === true && event.ctrlKey === true) {
      return checkAllInputsNotHasFocusBinded() && moveCaretToInput(SELECTORS) && event.preventDefault()
    }


    if (event.keyCode === 8 && event.shiftKey === true) {
      return checkAllInputsNotHasFocusBinded() && moveCaretToInput(SELECTORS) && event.preventDefault()
    }


    if (event.keyCode === 8 && event.ctrlKey === true) {
      return checkAllInputsNotHasFocusBinded() && moveCaretToInput(SELECTORS, clearInput) && event.preventDefault()
    }


    if (event.keyCode === 8) {
      return checkAllInputsNotHasFocusBinded() && moveCaretToInput(SELECTORS, moveCaretToEnd) && event.preventDefault()
    }
  });
}

function checkAllInputsNotHasFocus(selectorsTextInputs) {

  const allInputs = getAllInputs(selectorsTextInputs)

  let noFocus = true

  for (const input of allInputs) {
    if (input === document.activeElement) {
      return false
    }
  }

  function getAllInputs(selectorsTextInputs) {
    const allInputs = []
    for (const selector of selectorsTextInputs) {
      if (checkSelectorValid(selector)) {
        const input = document.querySelector(selector)
        if (input) {
          allInputs.push(input)
        }

      }
    }
    return allInputs
  }

  return noFocus
}

function checkSelectorValid(selector) {
  try {
    document.createDocumentFragment().querySelector(selector)
  } catch (error) {
    if (isDev) {
      const message = `
          Error [ checkSelectorValid ]
          ${error.message || ''}
          `
      alert(message)
    }
    return false
  }
  return true
}

function moveCaretToInput(SELECTORS, callback = moveCaretToEnd) {
  const input = getInput(SELECTORS)

  if (!input) {
    return
  }

  input.focus()
  callback(input)
}

function moveCaretToEnd(input) {
  isDev && console.log('Action: moveCaretToInput default')
  input.selectionStart = input.value.length;
}

function clearInput(input) {
  isDev && console.log('Action: clearInput')
  input.value = ''
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