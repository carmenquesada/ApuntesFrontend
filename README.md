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

Ejemplo: ver CreateRestaurantScreen.js

Select/Dropdown: where users can select a value for a field from a given set of options. Typical use cases includes: select some category from the ones that exist, select some status value from a given set of possible values.

In order to populate the options of the DropDownPicker we need:

Import the DropDownPickercomponent:

import DropDownPicker from 'react-native-dropdown-picker'

A state to store the restaurant categories:

const [restaurantCategories, setRestaurantCategories] = useState([])

A boolean state to set if the option list of the DropDownPicker are visible or not:

const [open, setOpen] = useState(false)

A useEffect hook to retrieve the restaurant categories from backend:

    useEffect(() => {
      async function fetchRestaurantCategories () {
        try {
          const fetchedRestaurantCategories = await getRestaurantCategories()
          const fetchedRestaurantCategoriesReshaped = fetchedRestaurantCategories.map((e) => {
            return {
              label: e.name,
              value: e.id
            }
          })
          setRestaurantCategories(fetchedRestaurantCategoriesReshaped)
        } catch (error) {
          showMessage({
            message: `There was an error while retrieving restaurant categories. ${error} `,
            type: 'error',
            style: GlobalStyles.flashStyle,
            titleStyle: GlobalStyles.flashTextStyle
          })
        }
      }
      fetchRestaurantCategories()
    }, [])

Finally, we have to add the component in the return sentence of the CreateRestaurantScreen component. Find below a code snippet to add a DropDownPicker component for restaurant categories:

    <DropDownPicker
      open={open}
      value={values.restaurantCategoryId}
      items={restaurantCategories}
      setOpen={setOpen}
      onSelectItem={ item => {
        setFieldValue('restaurantCategoryId', item.value)
      }}
      setItems={setRestaurantCategories}
      placeholder="Select the restaurant category"
      containerStyle={{ height: 40, marginTop: 20 }}
      style={{ backgroundColor: GlobalStyles.brandBackground }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
    />

Switches: where user is asked between two options that are typically send as a boolean.

First, you have to add the Switch component to the import statement of the react-native components:

import { Image, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'

Find below a code snippet for including a Switch component for the product availability:

    <TextRegular style={styles.switch}>Is it available?</TextRegular>
    <Switch
      trackColor={{ false: GlobalStyles.brandSecondary, true: GlobalStyles.brandPrimary }}
      thumbColor={values.availability ? GlobalStyles.brandSecondary : '#f4f3f4'}
      value={values.availability}
      style={styles.switch}
      onValueChange={value =>
        setFieldValue('availability', value)
      }
    />

And you can add some styling to your StyleSheet:

switch: {
  marginTop: 20
}

# LAB 4
# CreateRestaurant Form validation
Validation should check if the filled data matches the requirements set in the various form inputs. For instance: an input for email should contain a valid email, or password should have a minimum size, or some input is required.

Validation for CreateRestaurantScreen

1. Complete the import sentences of Formik and ErrorMessage from 'formik', and yup from yup as follows:

       import { ErrorMessage, Formik } from 'formik'
       import * as yup from 'yup'
2. Keep in mind that Formik needs to be fed with an object of the initial values of the form inputs as follows. Remember that these names has to match the ones that the backend expects when creating a Restaurant:

       const initialRestaurantValues = { name: null, description: null, address: null, postalCode: null, url: null, shippingCosts: null, email: null, phone: null, restaurantCategoryId: null }

3. Define a new validationSchema object by using yup rules. This validationSchema will be used by Formik to check the validity of the fields. You can use the following code snippet:

        const validationSchema = yup.object().shape({
        name: yup
          .string()
          .max(255, 'Name too long')
          .required('Name is required'),
        address: yup
          .string()
          .max(255, 'Address too long')
          .required('Address is required'),
        postalCode: yup
          .string()
          .max(255, 'Postal code too long')
          .required('Postal code is required'),
        url: yup
          .string()
          .nullable()
          .url('Please enter a valid url'),
        shippingCosts: yup
          .number()
          .positive('Please provide a valid shipping cost value')
          .required('Shipping costs value is required'),
        email: yup
          .string()
          .nullable()
          .email('Please enter a valid email'),
        phone: yup
          .string()
          .nullable()
          .max(255, 'Phone too long'),
        restaurantCategoryId: yup
          .number()
          .positive()
          .integer()
          .required('Restaurant category is required')
        })

   
Notice that:

* There should be a property named after each of the form inputs that needs validation.

* Rules defined above include: a type of data that is expected (string, or number for instance), the length of strings, if a number can be negative or not, and if an input is required .

* If the field does not follow any of these rules, the message passed to each rule should be shown to the user. For instance, if the shippingCosts is not a positive number, the message Please provide a valid shipping cost value will be shown.

4. Remember that the inputs have to be nested under the Formik component. Add the following:
       <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantValues}
      onSubmit={createRestaurant}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          /* Your views, form inputs, submit button/pressable */
        </ScrollView>
      )}
    </Formik>

The Formik component is in charge of handling the form values, validation, errors and submission. To this end we have to define the following properties:

validationSchema: the validation rules, usually a yup object.

initialValues: the initial values given to each of the form inputs.

onSubmit: the function to be called when the inserted form values pass the validation. Usually we will call a function that will be in charge of preparing the data and using a creation endpoint for the entity. We will learn how to POST data to the backend later. At this moment we will just print the values in console.

    const createRestaurant = async (values) => {
      //later we will call a method to perform a POST request
      console.log(values)
    }

handleSubmit: is the function that triggers the validation. It has to be called when the user presses the submission button.

values: is the array of elements that represents the state of the form.

setFieldValue: sometimes we will have to manually handle the storage of field values. This is a function that receives as first parameter the name of the field, and as second parameter the value for that field. It will be needed for non standard InputItems such as Imagepickers or Dropdown/select input controls.

5. Next, we need to modify the behaviour of some components so they use the values object properties handled by Formik.

Modify the DropDownPicker so the following properties are defined as:

        <DropDownPicker
          open={open}
          value={values.restaurantCategoryId}
          items={restaurantCategories}
          setOpen={setOpen}
          onSelectItem={ item => {
            setFieldValue('restaurantCategoryId', item.value)
          }}
          setItems={setRestaurantCategories}
          placeholder='Select the restaurant category'
          containerStyle={{ height: 40, marginTop: 20 }}
          style={{ backgroundColor: GlobalStyles.brandBackground }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
        />

InputItem is a component the includes the error handling. However, non-standard input controls from 3rd parties don't handle Formik errors. For instance, Dropdown picker does not handle these errors, so add the following <ErrorMessage> component following the dropdown picker:

        <ErrorMessage name={'restaurantCategoryId'} render={msg => <TextError>{msg}</TextError> }/>

Modify the Imagepickers as follows (example for logo image picker):

        <Pressable
      onPress={() =>
        pickImage(
          async result => {
            await setFieldValue('logo', result)
          }
        )
      }
      style={styles.imagePicker}
    >
      <TextRegular>Logo: </TextRegular>
      <Image style={styles.image} source={values.logo ? { uri: values.logo.assets[0].uri } : restaurantLogo} />
    </Pressable>

6. Next, we need to modify the final <Pressable> component to call the handleSubmit method. Modify the onPress handler definition: onPress={handleSubmit}

# POST Request to create a restaurant

Backend provides a POST endpoint to create a restaurant. Notice that handling of images and files is already solved at frontend and backend in various provided artifacts. To include the POST request to your project, you can follow these steps:

1. Add new endpoint In order to create a restaurant, we have to perform a POST request to /restaurants. ApiRequestHelper includes a post function that help us with this, we just need to provide the route and the data to be posted. To this end, include the following at the RestaurantEndpoints.js file:

       function create (data) {
        return post('restaurants', data)
       }

Remember to import the post function from ApiRequestHelper and export the create function as well.

2. Implement createRestaurant function at CreateRestaurantScreen.js file. In the previous exercise we just printed the values in the console. Now we need to make the API POST request. To this end keep in mind that:

Errors can occur at backend, so we need to handle the backend response to check if some errors ocurred.

I/O operations can freeze the interface so we need to handle with promises. The cleanest way of doing so is to declare the function async and using await when calling to the API.

Once the restaurant is created we may navigate to the RestaurantsScreen. You will need to declare the {route} param at the component level, and you will need to navigate including some information, so the RestaurantScreen will refresh the restaurant list and therefore the newly created restaurant is listed. To address these issues, we propose the following code snippet:

        const createRestaurant = async (values) => {
          setBackendErrors([])
          try {
            const createdRestaurant = await create(values)
            showMessage({
              message: `Restaurant ${createdRestaurant.name} succesfully created`,
              type: 'success',
              style: GlobalStyles.flashStyle,
              titleStyle: GlobalStyles.flashTextStyle
            })
            navigation.navigate('RestaurantsScreen', { dirty: true })
          } catch (error) {
            console.log(error)
            setBackendErrors(error.errors)
          }
        }

Moreover, we will need to store backend errors that eventually are returned in a state variable:
        const [backendErrors, setBackendErrors] = useState()

And finally, we will need to show backendErrors if present. To do so, we can add the following at the end of the form, just before the Save last Pressable:

        {backendErrors &&
          backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
        }

# Create product validation and POST

Follow the same steps to validate the create product form and to perform the post request.

Notice that when creating a new product, we will need to include the restaurantId where it belongs. This restaurant id should be received as: route.params.id when navigating from RestaurantDetailScreen to the CreateProductScreen.
