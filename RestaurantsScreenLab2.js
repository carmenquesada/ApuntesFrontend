/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
import ImageCard from '../../components/ImageCard'
import TextSemiBold from '../../components/TextSemibold'
import { API_BASE_URL } from '@env'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import { showMessage } from 'react-native-flash-message'

export default function RestaurantsScreen ({ navigation }) {
  const [restaurants, setRestaurants] = useState([])

  const { loggedInUser } = useContext(AuthorizationContext) // Acceder al objeto que contiene el estado de usuario autenticado
// De ese objeto extraes la propiedad loggedInUser
  useEffect(() => {
    async function fetchRestaurants () {
      try {
        const fetchedRestaurants = await getAll() // Llama a la función que recupera los restaurantes desde el backend
        setRestaurants(fetchedRestaurants) // Guarda los datos recibidos 
      } catch (error) { // En caso de error muestra un mensaje
        showMessage({
          message: `There was an error while retrieving restaurants. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    if (loggedInUser) {
      fetchRestaurants() // Solo se hace la petición si usuario logueado
    } else {
      setRestaurants(null) // Si no hay usuario se limpia
    }
  }, [loggedInUser, route]) // Se ejecuta siempre que cambie loggedInUser o route
