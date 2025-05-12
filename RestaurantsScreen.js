import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantsScreen({ navigation }) { // Crea un componente funcional: RestaurantsScreen que recibe un prop: navigation (cambiar de pantalla)
  const [restaurants, setRestaurants] = useState([]) // At first render, the restaurants state object will be empty

  // Need to load restaurants in the state: useEffect
  useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll) // getAll function has to be imported
      console.log('Restaurants loaded')
    }, 2000) // Esperar 2000 ms, es decir, 2 segundos
  }, []) // Se ejecuta una sola vez porque dependencies está vacío []

  const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }
  
  return (
    <View style={styles.container}> // View: agrupar cosas visualmente
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Random Restaurant</TextRegular> // TextRegular: mostrar texto con estilo común en pantalla
      <Pressable // Pressable: ejecutar algo cuando lo tocas (botón)
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) }) // Cambio de pantalla muestra id aleatorio para mostrar detalles de restaurante aleatorio
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed // El botón cambia de color al estar presionado
              ? GlobalStyles.brandBlueTap // Color al tocar
              : GlobalStyles.brandBlue // Color normal
          },
          styles.actionButton // Añadir estilos adicionales
        ]}
      >
        <TextRegular textStyle={styles.text}>
          Go to Random Restaurant Details // Texto del botón
        </TextRegular>
      </Pressable>
      <FlatList
        style={styles.container}
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}


