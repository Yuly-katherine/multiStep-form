import { ref, onMounted } from 'vue'
import type { Props, FileFieldType } from '../types/form.types'
import { useFormData } from './useFormData'
import { useFormValidation } from './useFormValidation'
import { useCountries } from './useCountries'
import { FILE_CONFIG } from '../config/form.constants'

export function useMultiStepForm(props: Props, emit: any) {
 
  const currentStep = ref(1)
  const showSuccessModal = ref(false)

 
  const {
    formData,
    showPassword,
    showConfirmPassword,
    resetForm: resetFormData,
    updateField
  } = useFormData(props)

  const {
    errors,
    fieldValidation,
    realtimeErrors,
    validateStep,
    setupRealtimeValidation
  } = useFormValidation(formData)

  const {
    countries,
    loadingCountries,
    loadCountries
  } = useCountries()

  const nextStep = async () => {
    if (await validateStep(currentStep.value)) {
      if (currentStep.value < 3) {
        currentStep.value++
        emit('stepChange', currentStep.value)
      }
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
      emit('stepChange', currentStep.value)
    }
  }

  const handleFileUpload = (event: Event, field: FileFieldType) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (file) {
      if (FILE_CONFIG.ACCEPTED_TYPES.includes(file.type)) {
        updateField(field, file)
        errors.value[field] = ''
      } else {
        errors.value[field] = 'Solo se permiten archivos JPG'
        target.value = ''
      }
    }
  }

  const submitForm = async () => {
    if (await validateStep(3)) {
      console.log('=== FORMULARIO ENVIADO ===')
      // Paso 1: Información Personal
      console.log('  • País:', formData.value.pais)
      console.log('  • Género:', formData.value.genero)
      console.log('  • Nombres:', formData.value.nombres)
      console.log('  • Apellidos:', formData.value.apellidos)
      console.log('  • Fecha de nacimiento:', formData.value.fechaNacimiento)
      console.log('  • Tipo de documento:', formData.value.tipoDocumento)
      console.log('  • Número de documento:', formData.value.numeroDocumento)
      console.log('  • Foto documento frente:', formData.value.fotoDocumentoFrente?.name || 'No seleccionado')
      console.log('  • Foto documento reverso:', formData.value.fotoDocumentoReverso?.name || 'No seleccionado')
      
      // Paso 2: Información de Contacto
      console.log('  • Correo electrónico:', formData.value.correoElectronico)
      console.log('  • Contraseña:', '***' + formData.value.contrasena.slice(-2)) // Solo mostrar últimos 2 caracteres por seguridad
      console.log('  • Confirmación contraseña:', '***' + formData.value.confirmacionContrasena.slice(-2))
      console.log('  • Número teléfono:', formData.value.numeroTelefono)
      console.log('  • Número celular:', formData.value.numeroCelular)
      
      // Paso 3: Dirección
      console.log('  • Dirección residencia:', formData.value.direccionResidencia)
      console.log('  • Código postal:', formData.value.codigoPostal)
      console.log('=====================================')
      
      showSuccessModal.value = true
      resetForm()
    }
  }

  const resetForm = () => {
    resetFormData()
    errors.value = {}
    currentStep.value = 1
    emit('stepChange', 1)
  }

  const closeSuccessModal = () => {
    showSuccessModal.value = false
  }

  // Helpers para timeline
  const isStepActive = (stepNumber: number) => currentStep.value === stepNumber
  const isStepCompleted = (stepNumber: number) => currentStep.value > stepNumber

  onMounted(() => {
    loadCountries()
    setupRealtimeValidation()
  })

  return {
    // Estado
    currentStep,
    showSuccessModal,
    formData,
    showPassword,
    showConfirmPassword,
    errors,
    fieldValidation,
    realtimeErrors,
    countries,
    loadingCountries,
    
    // Métodos
    nextStep,
    prevStep,
    submitForm,
    resetForm,
    closeSuccessModal,
    handleFileUpload,
    isStepActive,
    isStepCompleted,
    updateField
  }
}
