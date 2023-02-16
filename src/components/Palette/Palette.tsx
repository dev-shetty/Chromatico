interface Props {
  color: string
}

function Palette({ color }: Props) {
  return (
    <div className="flex flex-col lg:basis-1/5 bg-white rounded-lg">
      <div
        className="color w-full h-24 lg:h-96 cursor-pointer"
        style={{ backgroundColor: color }}
      ></div>
      <div className="color-code flex justify-center border-t-2 py-2 bg-slate-50 rounded-b-lg cursor-pointer">
        {color}
      </div>
    </div>
  )
}

export default Palette
