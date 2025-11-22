import { useEffect, useState } from "react";
import "./Filterssliders.css";
import type { Plant } from "../pages/Search.tsx";

// Assuming these functions are correctly defined in PlantList.tsx
import {
	calculateAverageDifficulty,
	getGrowthDifficulty,
	getLightDifficulty,
	getPruningDifficulty,
	getTemperatureDifficulty,
	getWateringDifficulty,
} from "./PlantList.tsx";

const FilterSliders = ({
	plants,
	setDisplayedPlants,
}: { plants: Plant[]; setDisplayedPlants: (plants: Plant[]) => void }) => {
	const [filters, setFilters] = useState({
		light: "0",
		watering: "0",
		temperature: "0",
		growth: "0",
		pruning: "0",
		difficulty: "0",
	});

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	const resetFilters = () => {
		setFilters({
			light: "0",
			watering: "0",
			temperature: "0",
			growth: "0",
			pruning: "0",
			difficulty: "0",
		});
	};

	useEffect(() => {
		const filteredPlants = plants.filter((plant) => {
			if (
				filters.light !== "0" &&
				getLightDifficulty(plant["Light tolered"]) !==
					Number.parseInt(filters.light)
			)
				return false;
			if (
				filters.watering !== "0" &&
				getWateringDifficulty(plant.Watering) !==
					Number.parseInt(filters.watering)
			)
				return false;
			if (
				filters.temperature !== "0" &&
				getTemperatureDifficulty(
					plant["Temperature min"].C,
					plant["Temperature max"].C,
				) !== Number.parseInt(filters.temperature)
			)
				return false;
			if (
				filters.growth !== "0" &&
				getGrowthDifficulty(plant.Growth) !== Number.parseInt(filters.growth)
			)
				return false;
			if (
				filters.pruning !== "0" &&
				getPruningDifficulty(plant.Pruning) !== Number.parseInt(filters.pruning)
			)
				return false;
			if (
				filters.difficulty !== "0" &&
				Math.round(calculateAverageDifficulty(plant)) !==
					Number.parseInt(filters.difficulty)
			)
				return false;
			return true;
		});
		setDisplayedPlants(filteredPlants);
	}, [filters, plants, setDisplayedPlants]);

	return (
		<div className="filters-container">
			<div className="filter-item">
				<label htmlFor="light-filter">Light</label>
				<select
					id="light-filter"
					name="light"
					value={filters.light}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Easy</option>
					<option value="2">Medium</option>
					<option value="3">Hard</option>
				</select>
			</div>
			{/* Repeat for other filters */}
			<div className="filter-item">
				<label htmlFor="watering-filter">Watering</label>
				<select
					id="watering-filter"
					name="watering"
					value={filters.watering}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Easy</option>
					<option value="2">Medium</option>
					<option value="3">Hard</option>
				</select>
			</div>
			<div className="filter-item">
				<label htmlFor="temperature-filter">Temperature</label>
				<select
					id="temperature-filter"
					name="temperature"
					value={filters.temperature}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Easy</option>
					<option value="2">Medium</option>
					<option value="3">Hard</option>
				</select>
			</div>
			<div className="filter-item">
				<label htmlFor="growth-filter">Growth</label>
				<select
					id="growth-filter"
					name="growth"
					value={filters.growth}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Fast</option>
					<option value="2">Regular</option>
					<option value="3">Slow</option>
				</select>
			</div>
			<div className="filter-item">
				<label htmlFor="pruning-filter">Pruning</label>
				<select
					id="pruning-filter"
					name="pruning"
					value={filters.pruning}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Never</option>
					<option value="2">After blooming</option>
					<option value="3">If needed</option>
				</select>
			</div>
			<div className="filter-item">
				<label htmlFor="difficulty-filter">Difficulty</label>
				<select
					id="difficulty-filter"
					name="difficulty"
					value={filters.difficulty}
					onChange={handleFilterChange}
				>
					<option value="0">All</option>
					<option value="1">Easy</option>
					<option value="2">Medium</option>
					<option value="3">Hard</option>
				</select>
			</div>

			<button type="button" onClick={resetFilters} className="reset-button">
				Reset Filters
			</button>
		</div>
	);
};

export default FilterSliders;
