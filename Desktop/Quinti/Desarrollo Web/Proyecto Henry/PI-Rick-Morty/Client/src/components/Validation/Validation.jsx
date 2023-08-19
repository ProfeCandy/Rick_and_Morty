const validate = (form, setError, error) => {
  const newError = { ...error }

  if (!form.email) {
    newError.email = 'Email is required'
  } else if (!/^\w+([.-_+]?\w+)@\w+([.-]?\w+)(.\w{2,10})+$/.test(form.email)) {
    newError.email = 'Invalid email'
  } else {
    newError.email = ''
  }

  if (!form.password) {
    newError.password = 'Password is required'
  } else if (/\d/.test(form.password)) {
    newError.password = ''
  } else {
    newError.password = 'Invalid password, please enter a number'
  }

  if (!form.name) newError.name = 'Name is required'
  setError(newError)
}

export default validate
