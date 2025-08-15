import * as yup from 'yup'

// Esquemas de validación reutilizables
export const baseStringSchema = (fieldName: string) => 
  yup.string().trim().required(`${fieldName} es obligatorio`)

export const emailSchema = yup
  .string()
  .trim()
  .required('El correo electrónico es obligatorio')
  .email('El formato del correo electrónico no es válido')

export const passwordSchema = yup
  .string()
  .required('La contraseña es obligatoria')
  .min(6, 'La contraseña debe tener al menos 6 caracteres')

export const confirmPasswordSchema = yup
  .string()
  .required('La confirmación de contraseña es obligatoria')
  .oneOf([yup.ref('contrasena')], 'Las contraseñas no coinciden')

export const numericStringSchema = (fieldName: string, minLength?: number) => {
  let schema = yup
    .string()
    .trim()
    .required(`${fieldName} es obligatorio`)
    .matches(/^\d+$/, 'Solo se permiten dígitos numéricos')
  
  if (minLength) {
    schema = schema.min(minLength, `El número debe tener al menos ${minLength} dígitos`)
  }
  
  return schema
}

export const dateOfBirthSchema = yup
  .date()
  .required('La fecha de nacimiento es obligatoria')
  .test('edad', 'Debes ser mayor de 18 años', function(value) {
    if (!value) return false
    const today = new Date()
    const birth = new Date(value)
    
    // Verificar que no sea fecha futura
    if (birth > today) {
      return this.createError({ message: 'La fecha de nacimiento no puede ser en el futuro' })
    }
    
    // Calcular edad exacta
    const eighteenthBirthday = new Date(birth)
    eighteenthBirthday.setFullYear(birth.getFullYear() + 18)
    
    if (today < eighteenthBirthday) {
      const currentAge = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return this.createError({ message: `Debes ser mayor de 18 años. Tu edad actual es ${currentAge - 1} años` })
      } else {
        return this.createError({ message: `Debes ser mayor de 18 años. Tu edad actual es ${currentAge} años` })
      }
    }
    
    return true
  })

export const fileSchema = (fieldName: string) => 
  yup
    .mixed()
    .required(`${fieldName} es obligatoria`)
    .test('fileType', 'Solo se permiten archivos JPG', (value) => {
      if (!value) return false
      return value instanceof File && value.type === 'image/jpeg'
    })

// Esquemas por paso
export const step1Schema = yup.object({
  pais: baseStringSchema('El país'),
  genero: baseStringSchema('El género'),
  nombres: baseStringSchema('Los nombres'),
  apellidos: baseStringSchema('Los apellidos'),
  fechaNacimiento: dateOfBirthSchema,
  tipoDocumento: baseStringSchema('El tipo de documento'),
  numeroDocumento: numericStringSchema('El número de documento', 5),
  fotoDocumentoFrente: fileSchema('La foto del frente'),
  fotoDocumentoReverso: fileSchema('La foto del reverso')
})

export const step2Schema = yup.object({
  correoElectronico: emailSchema,
  contrasena: passwordSchema,
  confirmacionContrasena: confirmPasswordSchema,
  numeroTelefono: numericStringSchema('El número de teléfono'),
  numeroCelular: numericStringSchema('El número de celular')
})

export const step3Schema = yup.object({
  direccionResidencia: baseStringSchema('La dirección de residencia'),
  codigoPostal: numericStringSchema('El código postal')
})

// Esquemas exportados para uso externo
export const validationSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema
} as const
