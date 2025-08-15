<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    
    <input
      type="file"
      :accept="accept"
      @change="handleFileChange"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="errorMessage ? 'border-red-500' : 'border-gray-300'"
    />
    
    <p class="text-xs text-gray-500 mt-1">{{ formatHint }}</p>
    
    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </p>
    
    <p v-if="modelValue" class="text-green-600 text-sm mt-1">
      ✓ Archivo cargado: {{ modelValue.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: File | null
  label: string
  accept?: string
  formatHint?: string
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  accept: '.jpg',
  formatHint: 'Formato aceptado: JPG'
})

const emit = defineEmits<{
  'update:modelValue': [value: File | null]
  'fileChange': [event: Event]
}>()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  
  emit('update:modelValue', file)
  emit('fileChange', event)
}
</script>
