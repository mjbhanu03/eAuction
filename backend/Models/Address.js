import db from "../Config/db.js";

export const getCitiesWithHierarchy = async () => {
   const result = await db.query(
      `
  SELECT 
    cities.id AS city_id,
    cities.name AS city_name,
    states.name AS state_name,
    countries.name AS country_name,
    subregions.name AS subregion_name,
    regions.name AS region_name
  FROM cities
  INNER JOIN states ON cities.state_id = states.id
  INNER JOIN countries ON states.country_id = countries.id
  INNER JOIN subregions ON countries.subregion_id = subregions.id
  INNER JOIN regions ON subregions.region_id = regions.id;
`,
      { type: db.QueryTypes.SELECT }
    );

    return result
  }
export default getCitiesWithHierarchy