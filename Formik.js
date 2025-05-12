import { Formik } from 'formik'

// Este componente es una pantalla para crear un nuevo restaurante. 
// Muestra un formulario con campos como nombre, descripción, dirección, etc. Y utiliza Formik.

export default function CreateRestaurantScreen () { // Definir los valores iniciales del formulario
  const initialRestaurantValues = { name: null, description: null, address: null, postalCode: null, url: null, shippingCosts: null, email: null, phone: null, restaurantCategoryId: null }

  // Rest of the code of this component
  // ...

  return ( // Formik como componente principal del formulario. Se le pasan los valores iniciales con initialValues
    <Formik
    initialValues={initialRestaurantValues}
    >
      {({ setFieldValue, values }) => ( //setFielValue cambia el valor de un campo específico y values contiene todos los valores actuales del formulario
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem //InputItem es un componente personalizado para mostrar un campo de entrada (como un TextInput) con su etiqueta. 
                name='name' // El atributo name='name' le dice a Formik que ese campo representa el nombre del restaurante.
                label='Name:'
              />

              {/* Any other inputs */}

            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
