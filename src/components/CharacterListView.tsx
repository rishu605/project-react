import { useEffect, useState } from "react"
import Character from "./Character"
import axios from "axios"
import { Link } from "react-router-dom"

const CharacterListView = () => {

  const [chars, setChars] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const baseUrl = `https://swapi.dev/api/people/?page=${page}`

  const fetchCharacters = () => {
    axios.get(baseUrl)
    .then(res => {
      console.log(res.data)
      setChars(res.data.results)
      setCount(res.data.count)
      setTotalPages(Math.trunc(res.data.count/10) + 1)
    })
  }

  const nextPage = () => {
    console.log("page: ", page)
    console.log("totalPages: ", totalPages)
    console.log("count: ", count)
    if(page < totalPages)
    setPage(page => page+1)
  }
  
  const prevPage = () => {
    if(page>1) {
      setPage(page => page-1)
    }
  }

  useEffect(() => {
    fetchCharacters()
  },[page])

  const characterList = chars.map((character: any, index) => {
    console.log("character:", character)
    const elements = character.url.split('/')
    const personId = elements[elements.length-2]
    console.log("personId: ", personId)
    return (
      <div key={index + 1}>
        <Link to={String(personId)} key={index}>
          <Character order={index} character={character} />
        </Link>
        <button>Add TO Favourites</button>
      </div>
    )
  })

  const [searchTerm, setSearchTerm] = useState("")

  const searchCharacters = () => {
    const result = chars.filter((char: any) => {
      return char.name.toLowerCase().includes(searchTerm)
    })

    setChars(result)
  }

  return(
    <div>
      Character List View
      <div>
        <input type="text" name="search" placeholder="Enter Character name" onChange={(e) => setSearchTerm(e.target.value)}/>
        <button onClick={searchCharacters}>Search</button>
        Searching for: {searchTerm}
      </div>
      {characterList}
      <div onClick={prevPage}>
        Previous Page
      </div>
      <div>
        {page}
      </div>
      <div onClick={nextPage}>
        Next Page
      </div>
    </div>
  )
}
export default CharacterListView