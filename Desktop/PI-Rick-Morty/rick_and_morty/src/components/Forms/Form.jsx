import { useState } from 'react'
import style from './Form.module.css'
import validate from '../Validation/Validation'

const form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const property = event.target.name
    const value = event.target.value

    setUserData({ ...userData, [property]: value })
    validate({ ...userData, [property]: value }, setErrors, errors)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    login(userData)
  }

  return (
<div className={style.formContainer}>
  <form onSubmit={submitHandler}>
      <div>
        <label htmlFor='username'>email:</label>
          <input
            type="text"
            name= "email"
            value = {form.email}
            onChange={handleChange}
            placeholder='example@mail.com'
            className= {errors.email ? style.error : style.success}
        />
      <span> {errors.email} </span>
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}/>
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
  </form>
</div>
  )
}

export default form
