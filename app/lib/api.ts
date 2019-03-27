import IPlace from './models/place';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: { API_HOST } } = getConfig() as any;

export async function getPlaces(lat: Number, lng: Number, radius: Number): Promise<IPlace[]> {
  let places: IPlace[] = []
  try {
    const res = await fetch(`${API_HOST}/place?lat=${lat}&lng=${lng}&r=${radius}`);
    const data = await res.json();
    places = data.data.places;
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
  }
  return places;
}


export async function getPlace(id: String): Promise<IPlace> {
  
  try {
    const res = await fetch(`${API_HOST}/place/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    return null;
  }  
}