<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        v-if="type !== 'select'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :max="max"
        class="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="getInputClasses()"
      />
      <select
        v-else
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        class="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="getInputClasses()"
      >
        <option value="">{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Icono de validación -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg v-if="isValid" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <svg v-else-if="modelValue && !isValid" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  isValid?: boolean
  errorMessage?: string
  maxLength?: number
  max?: string
  disabled?: boolean
  options?: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  isValid: false,
  disabled: false,
  options: () => []
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const getInputClasses = () => {
  if (props.isValid) return 'border-green-500'
  if (props.errorMessage) return 'border-red-500'
  return 'border-gray-300'
}
</script>
