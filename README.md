# LAB1 
# 1 Components
Un componente en React es como una pieza reutilizable de una interfaz de usuario. Piensa en ellos como piezas de LEGO: puedes construir una interfaz completa uniendo componentes más pequeños.

Por ejemplo:

Un botón puede ser un componente.

Una pantalla completa (como un menú de restaurantes) también puede ser un componente

Un componente funcional es una función de JavaScript que:
Recibe unos parámetros llamados props y devuelve lo que React debe mostrar en pantalla (eso se llama un elemento React).

Ejemplo: ver RestaurantsScreen

# 2 States
Cuando un componente necesita recordar información entre renders (entre que se dibuja y se vuelve a dibujar en pantalla), esa información se guarda en lo que se llama el estado.

Por ejemplo:

Una lista de restaurantes cargada desde el servidor.

El número de veces que un botón fue presionado.

Si un menú está abierto o cerrado

Para crear un estado, React nos da una herramienta llamada hook que se llama useState.

const [state, setState] = useState(valorInicial)

Donde state es la variable que contiene el valor actual y setState la fucnión para cambiar ese valor. 

useState(valorInicial) crea ese estado y le da un valor al principio

Ejemplo: const [restaurants, setRestaurants] = useState([])

restaurants es una variables que va a contener una lista de restaurantes

setRestaurants es la función para cambiar esa lista

useState[] es que el valor inicial es una lista vacía

Al principio, restaurants está vacío [], cuando llamas a una API para cargar los restaurantes (ejemplo, getAll()), recibes los datos.

Llamas a setRestaurants(datos) y React actualiza la pantalla para mostrar los nuevos datos

# 3 Props

Son la forma en que un componente recibe datos desde otro componente.

Es decir, si el componente A muestra o usa al componente B, puede pasarle información mediante props.

Ejemplo: ver RestaurantDetailScreen

# 4 Hooks

Los hooks son funciones especiales que React nos da para:

Agregar comportamiento a componentes funcionales (sin necesidad de clases).

1. useState → Guardar y actualizar datos del componente (ver en el punto 2)
2. useEffect → Ejecutar código en momentos específicos (como cargar datos al iniciar)
3. useContext → Compartir datos entre muchos componentes (lo verás más adelante)

useEffect

    useEffect(() => {

     //code to be executed
   
    }, [object1, object2, ...]) // se ejecuta cada vez que cambien estas variables, si está vacío se ejecuta solo al inicio y si no está se ejecuta siempre tras cada render

Ejemplo: 

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
      getAll().then(data => setRestaurants(data))
    }, []) // se ejecuta una vez al inicio

1. El componente se muestra por primera vez
2. useEffect se ejecuta solo al inicio '[]'
3. getAll() obtiene los restaurantes
4. setRestaurants(data) guarda los datos

# 5 FlatList

Muestra listas de elementos (como un scroll de tarjetas).

Solo renderiza en pantalla lo necesario (mejor rendimiento).

Necesita unos props obligatorios: data, renderItem y keyExtractor.

1. data: es el array que contiene los datos que vas a mostrar (en este caso, los restaurantes).

    data={restaurants}

2. renderItem: es la función que define cómo se ve cada elemento de la lista.

     const renderRestaurant = ({ item }) => { // item es el restaurante renderizando
   
       return (
           <Pressable
              style={styles.row}
              onPress={() => { // Al pulsar el boton...
                navigation.navigate('RestaurantDetailScreen', { id: item.id }) // se navega a RestaurantDetailScreen pasando id del restaurante como parámetro
              }}
            >
              <TextRegular>{item.name}</TextRegular>
            </Pressable>
       )
     }

3. keyExtractor: sive para darle a cada elemento una clave única que React usa para identificarlo

   keyExtractor={item => item.id.toString()}

Ejemplo: 

    return (
      <FlatList
        style={styles.container}
        data={restaurants} // Restaurants como fuente de datos
        renderItem={renderRestaurant} // Mostrar cada restaurante
        keyExtractor={item => item.id.toString()} // id como clave única para cada item
      />
    )

# LAB 2
# RESTful API Requests
# Context
En React (y React Native), un Contexto es una forma de compartir datos globales entre componentes sin tener que pasarlos manualmente de componente en componente mediante props.

AuthorizationContext

En tu caso, el AuthorizationContext es un contexto que guarda la información del usuario que ha iniciado sesión (logged-in user). De ahí sacas una variable muy importante:

const { loggedInUser } = useContext(AuthorizationContext)

useContext() es un hook que te permite acceder a los valores globales definidos en un contexto.

Al llamar a useContext(AuthorizationContext), estás accediendo al objeto que contiene el estado del usuario autenticado. De ese objeto, extraes la propiedad loggedInUser.

Ejemplo: ver RestaurantsScreenLab2.js

# RestaurantDetail implementation
Now we need to modify our code to retrieve restaurant details. To this end, modify your code to:

Change getDetail(id) function of RestaurantEndpoints.js

Change useEffect function of RestaurantDetailScreen.js

Notice that we do not need to check if a user is logged in, as the details of restaurants are public.

Check that restaurant details and products are retrieved from the backend and listed at RestaurantDetailScreen component.

Ver RestaurantsEndpointsLab2.js y RestaurantDetailScreenFetch.js

# LAB 3
# FlexBox

React Native usa Flexbox como sistema de diseño para organizar cómo se posicionan y dimensionan los componentes hijos dentro de un componente contenedor

Supongamos que tienes una View que contiene varios elementos hijos (como botones, textos, imágenes...). Puedes controlar cómo se posicionan estos hijos dentro del contenedor con las siguientes propiedades:

* flexDirection: define la dirección principal en la que se organizan los hijos:

column (por defecto): los hijos se colocan uno debajo del otro (verticalmente).

row: los hijos se colocan uno al lado del otro (horizontalmente).

    <View style={{ flexDirection: 'row' }}>
      <Text>Uno</Text>
      <Text>Dos</Text>
    </View>

* justifyContent: controla la distribución de los elementos en la dirección principal (eje principal):

flex-start (por defecto): los hijos se agrupan al inicio del eje.

center: los hijos se agrupan en el centro del eje.

flex-end: los hijos se agrupan al final del eje.

space-between: espacio igual entre los elementos.

space-around: espacio igual alrededor de cada elemento.

    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Izquierda</Text>
      <Text>Centro</Text>
      <Text>Derecha</Text>
    </View>

* alignItems: controla la alineación de los hijos en el eje secundario (el eje perpendicular al flexDirection):

flex-start: alineados al principio del eje secundario.

center: centrados en el eje secundario.

flex-end: alineados al final del eje secundario.

stretch (por defecto): los hijos se estiran para ocupar todo el espacio disponible.

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Elemento centrado verticalmente</Text>
    </View>

Ejemplo: mostrará los tres elementos horizontalmente (por row), centrados verticalmente (alignItems: center) y espaciados uniformemente (space-around)

    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 100,
      backgroundColor: '#eee'
    }}>
      <Text>🔵</Text>
      <Text>🟢</Text>
      <Text>🔴</Text>
    </View>

# Views as containers

View es un contenedor que agrupa otros elementos y controla su posición, tamaño, márgenes y comportamiento con Flexbox.

Ejemplo: ver CreateRestaurantScreen.js

# ScrollViews

Encargado de resolver este problema: cuando tu pantalla tiene más elementos que el alto del dispositivo permite ver, no puedes verlos todos ni hacer scroll si usas un simple View.

Add  <ScrollView
    </ScrollView>

# Forms

Cuando hacés un formulario en React o React Native (por ejemplo, un formulario para crear un restaurante), hay que:

Crear estados para cada campo (useState)

Manejar los cambios (onChange)

Validar los datos (que no esté vacío, que sea un email válido, etc.)

Mostrar errores si hay problemas

Manejar el envío del formulario

Hacer todo eso a mano es mucho trabajo. Formik automatiza todo eso.

Ejemplo: ver Formik.js

Forms present to the user various input fields. The most popular are:

Text inputs: where user introduces some kind of text. It is usually the most general input, we can use it so users can include information such as: names, surnames, emails, descriptions, urls, addresses, prices, postal codes or telephones. You have been provided the src/components/InputItem.js component that returns: a) a TextInput, b) a label for the input and c) some elements needed for validation that we will use in the next lab.

Image/File pickers: where user can select an image/file from its gallery or file system in order to upload them.

Select/Dropdown: where users can select a value for a field from a given set of options. Typical use cases includes: select some category from the ones that exist, select some status value from a given set of possible values.

Switches: where user is asked between two options that are typically send as a boolean.

