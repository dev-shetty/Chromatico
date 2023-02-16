type Props = {
  text: string
}

function PrimaryBtn({ text }: Props) {
  return (
    <button className="w-[75%] md:w-72 lg:w-96 bg-primary-800 py-2 rounded-xl shadow-md focus:outline-primary-800 hover:bg-primary-500 transition-colors hover:border-2 hover:border-primary-800 hover:shadow-none">
      {text}
    </button>
  )
}

export default PrimaryBtn
