import { ref } from 'vue'
import type { FormData, Props } from '../types/form.types'
import { INITIAL_FORM_DATA } from '../config/form.constants'

export function useFormData(props: Props) {

  const formData = ref<FormData>({ 
    ...INITIAL_FORM_DATA, 
    ...props.initialData 
  })

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const resetForm = () => {
    formData.value = { ...INITIAL_FORM_DATA }
    showPassword.value = false
    showConfirmPassword.value = false
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    formData.value[field] = value
  }

  const getFieldValue = <K extends keyof FormData>(field: K): FormData[K] => {
    return formData.value[field]
  }

  return {
    formData,
    showPassword,
    showConfirmPassword,
    resetForm,
    updateField,
    getFieldValue
  }
}
