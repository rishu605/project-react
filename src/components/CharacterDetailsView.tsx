import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const CharacterDetails = () => {
  const {id} = useParams()
  const [charDetails, setCharDetails]: any = useState({})
  const [planet, setPlanet] = useState("")
  const [filmList, setFilmList] = useState([])
  const [starshipList, setStarshipList] = useState([])

  const baseUrl = 'https://swapi.dev/api/people'

  const fetchCharacter = () => {
    axios.get(`${baseUrl}/${id}`)
    .then(res => {
      console.log(res.data)
      setCharDetails(res.data)
      const homeworld = res.data.homeworld
      axios.get(homeworld)
      .then(res => {
        console.log(res.data)
        setPlanet(res.data.name)
      })
      const films = res.data.films
      const allFilms: any = []
      for( let item of films) {
        console.log(item)
        axios.get(item)
        .then(res => {
          console.log("film data: ", res.data)
          allFilms.push(res.data.title)
        })
        setFilmList(allFilms)
      }
      const starships = res.data.starships
      const allStarships: any = []
      for(let item of starships) {
        console.log(item)
        axios.get(item)
        .then(res => {
          console.log("film data: ", res.data)
          allStarships.push(res.data.name)
        })
        setStarshipList(allStarships)
      }
    })
  }

  const displayFilms = filmList.map(film => {
    console.log("film: ", film)
    return (
      <div key={film}>
        {film}
      </div>
    )
  })

  const displayStarships = starshipList.map(starship => {
    console.log("starship: ", starship)
    return(
      <div key={starship}>
        {starship}
      </div>
    )
  })

  const addToFavourites = () => {

  }

  useEffect(() => {
    fetchCharacter()
  }, [])
  return(
    <div>
      CharacterDetails
      <br/>
      <button onClick={addToFavourites}>Add to Favoutites:</button>
      Name: {charDetails.name}
      <br/>
      Hair Color: {charDetails.hair_color}
      <br/>
      Eye Colour: {charDetails.eye_color}
      <br/>
      Gender: {charDetails.gender}
      <br/>
      Home Planet: {planet}
      <br/>
      List of films: {displayFilms}
      <br/>
      List of starships: {displayStarships}
    </div>
  )
}

export default CharacterDetails