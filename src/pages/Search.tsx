import { useEffect, useState } from 'react'
import FilterSliders from '../components/Filterssliders'
import PlantList from '../components/PlantList'
import SearchBar from '../components/SearchBar'
import './Search.css'
import plantsData from '../data/plants.json' // Import local data

export type Plant = {
  id: number
  index: number
  Family: string
  'Light tolered': string
  Watering: string
  'Temperature max': { C: number; F: number }
  'Temperature min': { C: number; F: number }
  Growth: string
  Pruning: string
  Difficulties: string
  C: string
  Img: string
  'Common name': string
  'Latin name': string
}

const Search = () => {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayedPlants, setDisplayedPlants] = useState<Plant[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    try {
      const formattedData = plantsData.map((plant: Plant) => ({
        ...plant,
        'Common name': Array.isArray(plant['Common name'])
          ? plant['Common name'][0]
          : plant['Common name'],
      }))
      setPlants(formattedData)
      setDisplayedPlants(formattedData)
      setLoading(false)
    } catch (err) {
      setError('Failed to load plant data.')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const filtered = plants.filter((plant) =>
      plant['Common name'].toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setDisplayedPlants(filtered)
  }, [searchTerm, plants])

  if (loading) return <div className='loading-message'>Loading plants...</div>
  if (error) return <div className='error-message'>Error: {error}</div>

  return (
    <div className='search'>
      <SearchBar
        onSearch={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      {showFilters && (
        <FilterSliders
          plants={plants} // Pass all plants to filters
          setDisplayedPlants={setDisplayedPlants}
        />
      )}
      <div className='plant-list-container'>
        {displayedPlants.map((plant) => (
          <PlantList key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  )
}

export default Search
