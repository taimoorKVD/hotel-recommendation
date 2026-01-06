import { getCities } from "../repositories/hotels.repo.js";

export async function listCities() {
    return await getCities();
}
