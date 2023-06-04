import { Notify, Loading } from 'quasar'

export function showErrorMessage(errorMessage){
    Loading.hide()
    Notify.create({
      type: 'negative',
      position: 'top',
      message: 'Oops! The email or password is invalid!'
    })
}
