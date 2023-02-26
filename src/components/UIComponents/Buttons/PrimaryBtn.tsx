type Props = {
  text: string | JSX.Element
  type?: "submit" | "button"
  onClick?: () => void
}

function PrimaryBtn({ text, onClick, type }: Props) {
  return (
    <button
      className="w-[75%] md:w-72 lg:w-96 bg-primary-800 py-2 rounded-xl shadow-md border-2 border-primary-100 focus:outline-primary-100 bg-accent-500 transition-colors hover:shadow-none text-primary-100"
      type={type || "button"}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PrimaryBtn
