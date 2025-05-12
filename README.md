# LAB1 
# Components
Un componente en React es como una pieza reutilizable de una interfaz de usuario. Piensa en ellos como piezas de LEGO: puedes construir una interfaz completa uniendo componentes más pequeños.

Por ejemplo:

Un botón puede ser un componente.

Una pantalla completa (como un menú de restaurantes) también puede ser un componente

Un componente funcional es una función de JavaScript que:
Recibe unos parámetros llamados props y devuelve lo que React debe mostrar en pantalla (eso se llama un elemento React).

Ejemplo: ver RestaurantsScreen

# States
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

# Props

Son la forma en que un componente recibe datos desde otro componente.

Es decir, si el componente A muestra o usa al componente B, puede pasarle información mediante props.

Ejemplo: ver RestaurantDetailScreen
