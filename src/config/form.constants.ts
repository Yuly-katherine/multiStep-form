import type { TimelineStep, Country } from '../types/form.types'

export const TIMELINE_STEPS: TimelineStep[] = [
  { number: 1, title: 'Información Personal', description: 'Datos básicos y documento' },
  { number: 2, title: 'Información de Contacto', description: 'Correo, contraseña y teléfonos' },
  { number: 3, title: 'Dirección', description: 'Dirección de residencia' }
]

export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Otro' }
]

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'cedula_ciudadania', label: 'Cédula de ciudadanía' },
  { value: 'pasaporte', label: 'Pasaporte' },
  { value: 'cedula_extranjeria', label: 'Cédula de extranjería' }
]

// Países de respaldo en caso de error en la API
export const FALLBACK_COUNTRIES: Country[] = [
  { name: 'Colombia', code: 'CO' },
  { name: 'México', code: 'MX' },
  { name: 'Argentina', code: 'AR' },
  { name: 'España', code: 'ES' },
  { name: 'Estados Unidos', code: 'US' }
]

// URL de países
export const API_ENDPOINTS = {
  COUNTRIES: 'https://restcountries.com/v3.1/all?fields=name,cca2'
}

export const FILE_CONFIG = {
  ACCEPTED_TYPES: ['image/jpeg'],
  ACCEPTED_EXTENSIONS: '.jpg',
  MAX_SIZE: 5 * 1024 * 1024 // 5MB
}


export const STEP_FIELDS = {
  1: ['pais', 'genero', 'nombres', 'apellidos', 'fechaNacimiento', 'tipoDocumento', 'numeroDocumento', 'fotoDocumentoFrente', 'fotoDocumentoReverso'],
  2: ['correoElectronico', 'contrasena', 'confirmacionContrasena', 'numeroTelefono', 'numeroCelular'],
  3: ['direccionResidencia', 'codigoPostal']
}


export const INITIAL_FORM_DATA = {
  pais: '',
  genero: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: null,
  tipoDocumento: '',
  numeroDocumento: '',
  fotoDocumentoFrente: null,
  fotoDocumentoReverso: null,
  correoElectronico: '',
  contrasena: '',
  confirmacionContrasena: '',
  numeroTelefono: '',
  numeroCelular: '',
  direccionResidencia: '',
  codigoPostal: ''
}
