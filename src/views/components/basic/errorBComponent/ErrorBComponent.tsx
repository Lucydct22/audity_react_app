import './errorBComponent.scss'
import { Link } from 'react-router-dom'

function ErrorBComponent() {
  return (
    <div className='errorPage'>
    <div className='errorPage-container'>
      <div className='errorPage-container__context'>
        <span className='errorPage-container__context__span'>404</span>
        <h1 className='errorPage-container__context__h1'>Oops! It seems like you've hit a wrong note</h1>
        <p className='errorPage-container__context__p'>The page you're looking for doesn't seem to exist in our music app</p> 
        <Link to='/'><button className='errorPage-container__context__btm'>Go to home page</button></Link>
      </div>
    </div>
    </div>
  )
}

export default ErrorBComponent