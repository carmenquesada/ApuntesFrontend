export default function RestaurantDetailScreen ({ route }) { // El componente RestaurantDetailScreen recibe como prop 'route'
  const { id } = route.params // Dentro de route hay un atributo 'params'. El componente sabe qué restaurant mostarr porque se le pasa 'id' como prop
  
  const [restaurant, setRestaurant] = useState({})
  
  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id)) // Obtiene los detalles del restaurant y usa el id de la pantalla anterior
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])

  // Se utiliza para renderizar cada producto dentro de FlatList
  const renderProduct = ({ item }) => { // La función recibe un 'item' que representa un rpoducto individual
    return (
      <Pressable // Cada producto es clickeable
        style={styles.row}
        onPress={() => { }}> // Cuando el usuario presiona el botón...
          <TextRegular>
              {item.name} // se muestra el nombre del producto
          </TextRegular>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
        <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>
        <TextRegular style={styles.text}>{restaurant.description}</TextRegular>
        <TextRegular style={styles.text}>shippingCosts: {restaurant.shippingCosts}</TextRegular>
        <FlatList
          style={styles.container}
          data={restaurant.products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


// El id se pasa en RestaurantsScreen:
navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
// Que llega como route.params en RestaurantDetailScreen
// Concepto	Significado
// props	Son los datos que recibe un componente.
// route	Es una prop que React Navigation pasa automáticamente al componente.
// route.params	Son los parámetros enviados al navegar entre pantallas.
