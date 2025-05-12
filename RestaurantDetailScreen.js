export default function RestaurantDetailScreen ({ route }) { // El componente RestaurantDetailScreen recibe como prop 'route'
  const { id } = route.params // Dentro de route hay un atributo 'params'. El componente sabe qué restaurant mostarr porque se le pasa 'id' como prop
  return (
        <View style={styles.container}>
            <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Restaurant details. Id: {id}</TextRegular>
        </View>
  )
}

// El id se pasa en RestaurantsScreen:
navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
// Que llega como route.params en RestaurantDetailScreen
// Concepto	Significado
// props	Son los datos que recibe un componente.
// route	Es una prop que React Navigation pasa automáticamente al componente.
// route.params	Son los parámetros enviados al navegar entre pantallas.
