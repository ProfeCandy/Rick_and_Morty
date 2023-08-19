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
  <form onSubmit={submitHandler}>
    <div className={style.formContainer}>
      <div className= {style.formgroup} >
          <label className={style.formlabel} htmlFor='username'>email:</label>
          <input className= {style.forminput}
            type="text"
            name= "email"
            value = {form.email}
            onChange={handleChange}
            placeholder='example@mail.com'
        />
      <span> {errors.email} </span>
      </div>
        <div className={style.formgroup}>
          <label className={style.formlabel} htmlFor='password'>Password:</label>
          <input className={style.forminput}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}/>
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </div>
  </form>
  )
}

export default form
