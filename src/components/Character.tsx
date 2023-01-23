import axios from "axios"
import { useEffect, useState } from "react"

interface Props {
  character: {
    name: string
    gender: string
    homeworld: string
  }
  order: number
}

const Character = (props: Props) => {
  console.log(props.character)

  const [planet, setPlanet] = useState("")
  const fetchPlanet = () => {
    axios.get(props.character.homeworld)
    .then(res => setPlanet(res.data.name))
  }

  useEffect(() => {
    fetchPlanet()
  }, [])

  return(
    <div>
      Character {props.order}
      <br/>
      Name: {props.character.name}
      <br/>
      Gender: {props.character.gender}
      <br/>
      Planet: {planet}
    </div>
  )
}

export default Character
