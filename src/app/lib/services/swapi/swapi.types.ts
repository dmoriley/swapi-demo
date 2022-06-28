export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SwapiPeople extends SwapiBase {
  birth_year: string;
  eye_color: string;
  /** An array of film resource URLs that this person has been in. */
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  /** Swapi endpoint to relevant world */
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  /** An array of species resource URLs that this person belongs to */
  species: string[];
  /** An array of starship resource URLs that this person has piloted */
  starships: string[];
  /** An array of vehicle resource URLs that this person has piloted */
  vehicles: string[];
}

export interface SwapiFilm extends SwapiBase {
  /** An array of people resource URLs that are in this film */
  characters: string[];
  director: string;
  episode_id: number;
  /** The opening paragraphs at the beginning of this film */
  opening_crawl: string;
  /** An array of planet resource URLs that are in this film */
  planets: string[];
  producer: string;
  /** ISO 8601 date format */
  release_date: string;
  /** An array of species resource URLs that are in this film */
  species: string;
  /** An array of starship resource URLs that are in this film */
  starships: string[];
  title: string;
  /** An array of vehicle resource URLs that are in this film */
  vehicles: string[];
}

export interface SwapiStarship extends SwapiBase {
  /**
   * The Maximum number of Megalights this starship can travel in a standard hour.
   * A "Megalight" is a standard unit of distance and has never been defined before
   * within the Star Wars universe. This figure is only really useful for measuring
   * the difference in speed of starships. We can assume it is similar to AU, the
   * distance between our Sun (Sol) and Earth.
   */
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  /** An array of Film URL Resources that this starship has appeared in */
  films: string[];
  /** An array of People URL Resources that this starship has been piloted by */
  pilots: [];
  starship_class: string;
}

export interface SwapiVehicles extends SwapiBase {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  /** An array of People URL Resources that this vehicle has been piloted by. */
  pilots: [];
  /** An array of Film URL Resources that this vehicle has appeared in. */
  films: string[];
  vehicle_class: string;
}

export interface SwapiSpecies extends SwapiBase {
  average_height: string;
  average_lifespan: string;
  classification: string;
  designation: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  /** An array of People URL Resources that are a part of this species */
  people: string[];
  /** An array of Film URL Resources that this species has appeared in */
  films: string[];
  skin_colors: string;
}

export interface SwapiPlanets extends SwapiBase {
  climate: string;
  diameter: string;
  /** An array of Film URL Resources that this planet has appeared in */
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  /** An array of People URL Resources that live on this planet */
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
}

export interface SwapiBase {
  /** Swapi endpoints to source of this object */
  url: string;
  /** the ISO 8601 date format of the time that this resource was created */
  created: string;
  /** the ISO 8601 date format of the time that this resource was edited */
  edited: string;
}
