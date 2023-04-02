import './Starter.css'
import { Link } from 'react-router-dom'
import Banner from '../../components/banner/Banner'

export default function Starter() {
  return (
    <>
      <Banner />
      <div className='Starter'>
        <button className='Starter-button'>
          <Link to={`/signup`} className='Starter-Link'>
            Get Started
          </Link>
        </button>
      </div>
    </>
  )
}
