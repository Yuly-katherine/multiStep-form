// Tipos e interfaces para el formulario multi-paso

export interface FormData {
  // Paso 1: Información Personal
  pais: string
  genero: string
  nombres: string
  apellidos: string
  fechaNacimiento: Date | null
  tipoDocumento: string
  numeroDocumento: string
  fotoDocumentoFrente: File | null
  fotoDocumentoReverso: File | null
  // Paso 2: Información de Contacto
  correoElectronico: string
  contrasena: string
  confirmacionContrasena: string
  numeroTelefono: string
  numeroCelular: string
  // Paso 3: Dirección
  direccionResidencia: string
  codigoPostal: string
}

export interface Country {
  name: string
  code: string
}

export interface TimelineStep {
  number: number
  title: string
  description: string
}

export interface FieldValidationState {
  [key: string]: boolean
}

export interface FormErrors {
  [key: string]: string
}

export interface Props {
  initialData?: Partial<FormData>
}

export type FormEmits = {
  (event: 'stepChange', step: number): void
}

export type DocumentType = 'cedula_ciudadania' | 'pasaporte' | 'cedula_extranjeria'
export type Gender = 'masculino' | 'femenino' | 'otro'
export type FileFieldType = 'fotoDocumentoFrente' | 'fotoDocumentoReverso'
