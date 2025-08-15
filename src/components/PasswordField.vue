<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ allProps.label }}
      <span class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :value="allProps.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="allProps.showPassword ? 'text' : 'password'"
        :placeholder="allProps.placeholder"
        class="w-full px-3 py-2 pr-20 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="getInputClasses()"
      />
      
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
        <!-- Icono de mostrar/ocultar contraseña -->
        <button
          type="button"
          @click="togglePassword"
          class="p-1 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          :title="allProps.showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        >
          <!-- Icono de ojo abierto (mostrar) -->
          <svg v-if="!allProps.showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          <!-- Icono de ojo cerrado (ocultar) -->
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
          </svg>
        </button>
        
        <!-- Icono de validación -->
        <div>
          <svg v-if="allProps.isValid" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="allProps.modelValue && !allProps.isValid" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>

    <p v-if="allProps.errorMessage" class="text-red-500 text-sm mt-1">
      {{ allProps.errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  placeholder?: string
  isValid?: boolean
  errorMessage?: string
}

interface AllProps extends Props {
  showPassword: boolean
}

const allProps = withDefaults(defineProps<AllProps>(), {
  placeholder: '',
  isValid: false,
  showPassword: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:showPassword': [show: boolean]
}>()

const togglePassword = () => {
  emit('update:showPassword', !allProps.showPassword)
}

const getInputClasses = () => {
  if (allProps.isValid) return 'border-green-500'
  if (allProps.errorMessage) return 'border-red-500'
  return 'border-gray-300'
}
</script>
