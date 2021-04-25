import React, {useRef, useEffect} from "react"

type InputProps = {
  placeholder: string,
  name: string,
  disabled: boolean,
  readonly: boolean,
  value: string,
  onChange: (val:string[]) => void
}

const Input:React.FunctionComponent<InputProps> = (props) => {

  const caja = useRef(null)

  useEffect(() => {
    if (caja.current != null){
      //@ts-ignore
      caja.current.value = props.value
    }
  }, [])

  const handleChange = () => {
    if (caja.current != null){
      //@ts-ignore
      props.onChange([props.name, caja.current.value])
    }
  }

  return (
    <input
      ref={caja} 
      type="text"
      placeholder={props.placeholder}
      name={props.name}
      disabled={props.disabled}
      readOnly={props.readonly}
      onChange={handleChange}
    />
  )
}

export default Input