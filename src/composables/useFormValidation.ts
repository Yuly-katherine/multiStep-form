import { ref, watch, type Ref } from 'vue'
import type { FormData, FieldValidationState, FormErrors } from '../types/form.types'
import { validationSchemas } from '../config/validation.schemas'
import { STEP_FIELDS } from '../config/form.constants'

export function useFormValidation(formData: Ref<FormData>) {
  const errors = ref<FormErrors>({})
  const fieldValidation = ref<FieldValidationState>({})
  const realtimeErrors = ref<FormErrors>({})

  const validateStep = async (step: number): Promise<boolean> => {
    const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS]
    if (fields) {
      fields.forEach(field => {
        errors.value[field] = ''
        if (field === 'fechaNacimiento') {
          realtimeErrors.value.fechaNacimiento = ''
        }
      })
    }
    
    try {
      const schema = validationSchemas[step as keyof typeof validationSchemas]
      
      if (!schema || !fields) {
        console.error(`No se encontró configuración para el paso ${step}`)
        return false
      }

      // Extraer solo los datos del paso actual
      const stepData = fields.reduce((acc, field) => {
        let value = formData.value[field as keyof FormData]
        acc[field] = value
        return acc
      }, {} as any)

      await schema.validate(stepData, { abortEarly: false })
      return true
      
    } catch (validationErrors: any) {
      if (validationErrors.inner) {
        validationErrors.inner.forEach((error: any) => {
          if (error.path) {
            errors.value[error.path] = error.message
          }
        })
      }
      return false
    }
  }

  const validateField = async (field: string, value: any): Promise<boolean> => {
    try {
      let schema
      let stepNumber = 0
      
      for (const [step, fields] of Object.entries(STEP_FIELDS)) {
        if (fields.includes(field)) {
          stepNumber = parseInt(step)
          schema = validationSchemas[stepNumber as keyof typeof validationSchemas]
          break
        }
      }

      if (!schema) return false

      const fieldSchema = (schema as any).pick([field])
      
      if (field === 'confirmacionContrasena') {
        await fieldSchema.validate({ 
          contrasena: formData.value.contrasena,
          confirmacionContrasena: value 
        })
      } else {
        let validationValue = value
        await fieldSchema.validate({ [field]: validationValue })
      }
      
      return true
    } catch (error) {
      return false
    }
  }

  const validateSingleField = async (field: string) => {
    const value = formData.value[field as keyof FormData]
    const isValid = await validateField(field, value)
    fieldValidation.value[field] = isValid
    
    if (isValid) {
      errors.value[field] = ''
      if (field === 'fechaNacimiento') {
        realtimeErrors.value.fechaNacimiento = ''
      }
    } else {
      if (field === 'fechaNacimiento' && value !== null) {
        try {
          await validationSchemas[1].pick(['fechaNacimiento']).validate({ fechaNacimiento: value })
        } catch (error: any) {
          realtimeErrors.value.fechaNacimiento = error.message
        }
      }
    }
  }

  // Configurar watchers para validación en tiempo real
  const setupRealtimeValidation = () => {
    // Paso 1
    watch(() => formData.value.pais, () => validateSingleField('pais'))
    watch(() => formData.value.genero, () => validateSingleField('genero'))
    watch(() => formData.value.nombres, () => validateSingleField('nombres'))
    watch(() => formData.value.apellidos, () => validateSingleField('apellidos'))
    watch(() => formData.value.fechaNacimiento, () => validateSingleField('fechaNacimiento'))
    watch(() => formData.value.tipoDocumento, () => validateSingleField('tipoDocumento'))
    watch(() => formData.value.numeroDocumento, () => validateSingleField('numeroDocumento'))
    watch(() => formData.value.fotoDocumentoFrente, () => validateSingleField('fotoDocumentoFrente'))
    watch(() => formData.value.fotoDocumentoReverso, () => validateSingleField('fotoDocumentoReverso'))
    
    // Paso 2
    watch(() => formData.value.correoElectronico, () => validateSingleField('correoElectronico'))
    watch(() => formData.value.contrasena, () => {
      validateSingleField('contrasena')
      if (formData.value.confirmacionContrasena) {
        validateSingleField('confirmacionContrasena')
      }
    })
    watch(() => formData.value.confirmacionContrasena, () => validateSingleField('confirmacionContrasena'))
    watch(() => formData.value.numeroTelefono, () => validateSingleField('numeroTelefono'))
    watch(() => formData.value.numeroCelular, () => validateSingleField('numeroCelular'))
    
    // Paso 3
    watch(() => formData.value.direccionResidencia, () => validateSingleField('direccionResidencia'))
    watch(() => formData.value.codigoPostal, () => validateSingleField('codigoPostal'))
  }

  return {
    errors,
    fieldValidation,
    realtimeErrors,
    validateStep,
    validateField,
    validateSingleField,
    setupRealtimeValidation
  }
}
