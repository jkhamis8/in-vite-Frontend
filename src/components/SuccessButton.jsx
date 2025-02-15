const SuccessButton = ({ to, onClick, text }) => {
  onClick ? onClick : () => {}

  return (
    <button
      onClick={() => {}}
      className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      Button
    </button>
  )
}

export default SuccessButton
