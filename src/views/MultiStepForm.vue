<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-2">Registro</h1>
      <p class="text-sm sm:text-base text-gray-600 px-2">Por favor ingresar todos los datos en el formulario</p>
    </div>

    <!-- Línea de tiempo -->
    <Timeline 
      :steps="timelineSteps" 
      :current-step="currentStep" 
    />

    <!-- Contenido del formulario -->
    <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <!-- Paso 1: Información Personal -->
      <div v-if="currentStep === 1">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Información Personal</h2>
        
        <div class="mb-8">
          <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Datos Personales</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              v-model="formData.pais"
              label="País"
              type="select"
              placeholder="Selecciona un país"
              :options="countryOptions"
              :disabled="loadingCountries"
              :is-valid="fieldValidation.pais"
              :error-message="errors.pais"
              required
            />
            
            <FormField
              v-model="formData.genero"
              label="Género"
              type="select"
              placeholder="Selecciona género"
              :options="genderOptions"
              :is-valid="fieldValidation.genero"
              :error-message="errors.genero"
              required
            />
            
            <FormField
              v-model="formData.nombres"
              label="Nombres"
              placeholder="Ingresa tus nombres"
              :is-valid="fieldValidation.nombres"
              :error-message="errors.nombres"
              required
            />
            
            <FormField
              v-model="formData.apellidos"
              label="Apellidos"
              placeholder="Ingresa tus apellidos"
              :is-valid="fieldValidation.apellidos"
              :error-message="errors.apellidos"
              required
            />
            
            <FormField
              :model-value="formData.fechaNacimiento?.toISOString().split('T')[0] || ''"
              @update:model-value="(value) => formData.fechaNacimiento = value ? new Date(value) : null"
              label="Fecha de nacimiento"
              type="date"
              :max="maxDate"
              :is-valid="fieldValidation.fechaNacimiento"
              :error-message="realtimeErrors.fechaNacimiento || errors.fechaNacimiento"
              required
            />
          </div>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-4">Documento de Identidad</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              v-model="formData.tipoDocumento"
              label="Tipo de documento"
              type="select"
              placeholder="Selecciona tipo de documento"
              :options="documentTypeOptions"
              :is-valid="fieldValidation.tipoDocumento"
              :error-message="errors.tipoDocumento"
              required
            />
            
            <FormField
              v-model="formData.numeroDocumento"
              label="Número de documento"
              placeholder="Solo números, mínimo 5 dígitos"
              :max-length="20"
              :is-valid="fieldValidation.numeroDocumento"
              :error-message="errors.numeroDocumento"
              required
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FileUploadField
              v-model="formData.fotoDocumentoFrente"
              label="Foto documento - Frente"
              :error-message="errors.fotoDocumentoFrente"
              @file-change="(event) => handleFileUpload(event, 'fotoDocumentoFrente')"
            />
            
            <FileUploadField
              v-model="formData.fotoDocumentoReverso"
              label="Foto documento - Reverso"
              :error-message="errors.fotoDocumentoReverso"
              @file-change="(event) => handleFileUpload(event, 'fotoDocumentoReverso')"
            />
          </div>
        </div>
      </div>

      <!-- Paso 2: Información de Contacto -->
      <div v-if="currentStep === 2">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Información de Contacto</h2>
        
        <div class="space-y-4 sm:space-y-6">
          <FormField
            v-model="formData.correoElectronico"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            :is-valid="fieldValidation.correoElectronico"
            :error-message="errors.correoElectronico"
            required
          />
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <PasswordField
              v-model="formData.contrasena"
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              :show-password="showPassword"
              :is-valid="fieldValidation.contrasena"
              :error-message="errors.contrasena"
              @update:show-password="showPassword = $event"
            />
            
            <PasswordField
              v-model="formData.confirmacionContrasena"
              label="Confirmación de Contraseña"
              placeholder="Repite tu contraseña"
              :show-password="showConfirmPassword"
              :is-valid="fieldValidation.confirmacionContrasena"
              :error-message="errors.confirmacionContrasena"
              @update:show-password="showConfirmPassword = $event"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              v-model="formData.numeroTelefono"
              label="Número teléfono"
              type="tel"
              placeholder="Solo números"
              :is-valid="fieldValidation.numeroTelefono"
              :error-message="errors.numeroTelefono"
              required
            />
            
            <FormField
              v-model="formData.numeroCelular"
              label="Número celular"
              type="tel"
              placeholder="Solo números"
              :is-valid="fieldValidation.numeroCelular"
              :error-message="errors.numeroCelular"
              required
            />
          </div>
        </div>
      </div>

      <!-- Paso 3: Dirección -->
      <div v-if="currentStep === 3">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Dirección</h2>
        
        <!-- Sección de Dirección -->
        <div class="mb-6 sm:mb-8">
          <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Dirección de Residencia</h3>
          <div class="space-y-4 sm:space-y-6">
            <FormField
              v-model="formData.direccionResidencia"
              label="Dirección residencia"
              placeholder="Calle, número, apartamento, etc."
              :is-valid="fieldValidation.direccionResidencia"
              :error-message="errors.direccionResidencia"
              required
            />
            
            <FormField
              v-model="formData.codigoPostal"
              label="Código postal"
              placeholder="Solo números"
              :max-length="10"
              :is-valid="fieldValidation.codigoPostal"
              :error-message="errors.codigoPostal"
              required
            />
          </div>
        </div>
        
        <!-- Resumen de datos -->
        <div class="bg-gray-50 p-3 sm:p-4 rounded-md">
          <h3 class="text-sm sm:text-base font-medium text-gray-900 mb-3">Resumen de datos:</h3>
          <div class="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
              <p><strong>País:</strong> {{ formData.pais }}</p>
              <p><strong>Género:</strong> {{ formData.genero }}</p>
              <p><strong>Nombres:</strong> {{ formData.nombres }}</p>
              <p><strong>Apellidos:</strong> {{ formData.apellidos }}</p>
              <p><strong>Fecha nacimiento:</strong> {{ formData.fechaNacimiento }}</p>
              <p><strong>Tipo documento:</strong> {{ formData.tipoDocumento }}</p>
              <p><strong>Número documento:</strong> {{ formData.numeroDocumento }}</p>
              <p><strong>Correo electrónico:</strong> {{ formData.correoElectronico }}</p>
              <p><strong>Número teléfono:</strong> {{ formData.numeroTelefono }}</p>
              <p><strong>Número celular:</strong> {{ formData.numeroCelular }}</p>
              <p><strong>Dirección residencia:</strong> {{ formData.direccionResidencia }}</p>
              <p><strong>Código postal:</strong> {{ formData.codigoPostal }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de navegación -->
      <div class="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-3 sm:gap-0">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm sm:text-base order-2 sm:order-1"
        >
          Anterior
        </button>
        <div v-else class="hidden sm:block"></div>
        
        <button
          v-if="currentStep < 3"
          @click="nextStep"
          class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm sm:text-base order-1 sm:order-2"
        >
          Siguiente
        </button>
        
        <button
          v-if="currentStep === 3"
          @click="submitForm"
          class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer text-sm sm:text-base order-1 sm:order-2"
        >
          Enviar Formulario
        </button>
      </div>
    </div>
    
    <!-- Modal -->
    <SuccessModal 
      :is-open="showSuccessModal"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Props, FormEmits } from '../types/form.types'
import { TIMELINE_STEPS, GENDER_OPTIONS, DOCUMENT_TYPE_OPTIONS } from '../config/form.constants'
import { useMultiStepForm } from '../composables/useMultiStepForm'
// Componentes
import Timeline from '../components/Timeline.vue'
import FormField from '../components/FormField.vue'
import PasswordField from '../components/PasswordField.vue'
import FileUploadField from '../components/FileUploadField.vue'
import SuccessModal from '../components/SuccessModal.vue'

// Props y emits
const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({})
})

const emit = defineEmits<FormEmits>()

// Configuración de pasos
const timelineSteps = TIMELINE_STEPS

// Lógica principal del formulario
const {
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
  closeSuccessModal,
  handleFileUpload
} = useMultiStepForm(props, emit)

const genderOptions = GENDER_OPTIONS
const documentTypeOptions = DOCUMENT_TYPE_OPTIONS

const countryOptions = computed(() => {
  return countries.value.map(country => ({
    value: country.name,
    label: country.name
  }))
})

const maxDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})
</script>
