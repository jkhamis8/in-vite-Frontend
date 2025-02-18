import { Link } from 'react-router-dom'

const SuccessButton = ({ to, text }) => {
  return (
    <Link to={to}>
      <button className="inline-flex items-center justify-center bg-success py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10">
        {text}
      </button>
    </Link>
  )
}

export default SuccessButton
