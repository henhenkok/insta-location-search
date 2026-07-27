export interface GetLocationsRequest {
  latitude: number;
  longitude: number;
}

export const getLocations = (request: GetLocationsRequest) => fetch(`https://www.instagram.com/location_search/?latitude=${request.latitude}&longitude=${request.longitude}&__a=1`, {
    credentials: 'include',
  })
  .then((r) => r.json());