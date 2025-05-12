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
