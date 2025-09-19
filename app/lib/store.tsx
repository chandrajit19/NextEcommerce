   "use client"
  
      import { configureStore } from '@reduxjs/toolkit'
      import { Provider } from 'react-redux'
       import quantitySlice from './cart'
      const store=configureStore({
         reducer:{
            abc:quantitySlice
         }
      })

   export const StoreProvider=({children}:{children:React.ReactNode})=>{
         return(
            <Provider store={store}>
               {children}
            </Provider>
            
         )
      }
 
  export type RootState = ReturnType<typeof store.getState>   