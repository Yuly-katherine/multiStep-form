<template>
  <div class="min-h-screen bg-gray-50 py-4 sm:py-8">>
    <MultiStepForm 
      :initial-data="formData"
      @step-change="handleStepChange"
    />
  </div>
</template>

<script setup lang="ts">
import MultiStepForm from './views/MultiStepForm.vue'
import { ref } from 'vue'

const formData = ref({
  // Paso 1: Información Personal
  pais: '',
  genero: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: null,
  tipoDocumento: '',
  numeroDocumento: '',
  fotoDocumentoFrente: null,
  fotoDocumentoReverso: null,
  // Paso 2: Información de Contacto
  correoElectronico: '',
  contrasena: '',
  confirmacionContrasena: '',
  numeroTelefono: '',
  numeroCelular: '',
  // Paso 3: Dirección
  direccionResidencia: '',
  codigoPostal: '',
})

const currentStep = ref(1)

const handleStepChange = (step: number) => {
  currentStep.value = step
}
</script>

