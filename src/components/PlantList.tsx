import './PlantList.css'
import type { Plant } from '../pages/Search.tsx'

// Helper functions to calculate difficulty scores
export const getLightDifficulty = (lightType: string): number => {
  if (lightType.includes('Full sun')) return 3
  if (lightType.includes('Strong light')) return 2
  if (lightType.includes('Diffuse light')) return 1
  return 0
}

export const getWateringDifficulty = (wateringType: string): number => {
  if (wateringType.includes('Change water regularly')) return 3
  if (wateringType.includes('Keep moist')) return 2
  if (
    wateringType.includes('half dry') ||
    wateringType.includes('only when dry')
  )
    return 1
  return 0
}

export const getTemperatureDifficulty = (
  minTemp: number,
  maxTemp: number,
): number => {
  const range = maxTemp - minTemp
  if (range < 15) return 3
  if (range >= 15 && range < 25) return 2
  if (range >= 25) return 1
  return 0
}

export const getGrowthDifficulty = (growthType: string): number => {
  if (growthType === 'Slow') return 3
  if (growthType === 'Regular' || growthType === 'Seasonal') return 2
  if (growthType === 'Fast') return 1
  return 0
}

export const getPruningDifficulty = (pruningType: string): number => {
  if (pruningType === 'If needed') return 3
  if (pruningType === 'After blooming') return 2
  if (pruningType === 'Never') return 1
  return 0
}

export const calculateAverageDifficulty = (plant: Plant): number => {
  const difficulties = [
    getLightDifficulty(plant['Light tolered']),
    getWateringDifficulty(plant.Watering),
    getTemperatureDifficulty(
      plant['Temperature min'].C,
      plant['Temperature max'].C,
    ),
    getGrowthDifficulty(plant.Growth),
    getPruningDifficulty(plant.Pruning),
  ]
  const totalDifficulty = difficulties.reduce((acc, cur) => acc + cur, 0)
  return totalDifficulty / difficulties.length
}

interface PlantListProps {
  plant: Plant
}

const PlantList = ({ plant }: PlantListProps) => {
  const averageDifficulty = calculateAverageDifficulty(plant)

  return (
    <div className='plant-card'>
      <div className='plant-card-img-container'>
        <img
          src={plant.Img}
          alt={plant['Common name']}
          className='plant-card-img'
        />
      </div>
      <div className='plant-card-content'>
        <h3 className='plant-card-name'>{plant['Common name']}</h3>
        <p className='plant-card-family'>{plant.Family}</p>
        <div className='plant-card-info'>
          <div className='info-item'>
            <span className='info-label'>Light:</span>
            <span className='info-value'>{plant['Light tolered']}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Watering:</span>
            <span className='info-value'>{plant.Watering}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Temp:</span>
            <span className='info-value'>
              {plant['Temperature min'].C}°C - {plant['Temperature max'].C}°C
            </span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Growth:</span>
            <span className='info-value'>{plant.Growth}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Pruning:</span>
            <span className='info-value'>{plant.Pruning}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Difficulty:</span>
            <span className='info-value'>
              {averageDifficulty.toFixed(1)} / 3
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantList
