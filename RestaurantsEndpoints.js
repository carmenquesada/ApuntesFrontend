import { get } from './helpers/ApiRequestsHelper'
function getAll () {
  return get('/users/myrestaurants')
}

function getAll() {
  return restaurantsMock
}

function getDetail(id) {
  return get(`restaurants/${id}`) // usa la función get() ya definida para hacer una petición HTTP GET a la ruta
  // {id} es el identificador del restaurante
}

export { getAll, getDetail }
