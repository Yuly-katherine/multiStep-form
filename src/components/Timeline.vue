<template>
  <div class="mb-6 sm:mb-8">
    <!-- Versión móvil (vertical) -->
    <div class="sm:hidden">
      <div 
        v-for="(step, index) in steps" 
        :key="step.number"
        class="flex items-start mb-4 last:mb-0"
      >
        <!-- Círculo del paso -->
        <div 
          :class="getStepClasses(step.number)"
          class="w-8 h-8 flex-shrink-0"
        >
          <span v-if="isStepCompleted(step.number)" class="text-xs">✓</span>
          <span v-else class="text-xs">{{ step.number }}</span>
        </div>
        
        <!-- Información del paso -->
        <div class="ml-3 flex-1">
          <h3 
            :class="getTitleClasses(step.number)"
            class="text-sm font-medium"
          >
            {{ step.title }}
          </h3>
          <p class="text-xs text-gray-400 mt-1">{{ step.description }}</p>
        </div>
        
        <!-- Línea conectora vertical -->
        <div 
          v-if="index < steps.length - 1"
          class="absolute left-4 mt-8 w-0.5 h-4 bg-gray-300"
          :class="{ 'bg-blue-500': isStepCompleted(step.number + 1) }"
        ></div>
      </div>
    </div>
    
    <!-- Versión escritorio (horizontal) -->
    <div class="hidden sm:flex items-center justify-between">
      <div 
        v-for="(step, index) in steps" 
        :key="step.number"
        class="flex items-center"
      >
        <!-- Círculo del paso -->
        <div 
          :class="getStepClasses(step.number)"
        >
          <span v-if="isStepCompleted(step.number)">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        
        <!-- Información del paso -->
        <div class="ml-3 hidden lg:block">
          <h3 
            :class="getTitleClasses(step.number)"
          >
            {{ step.title }}
          </h3>
          <p class="text-xs text-gray-400">{{ step.description }}</p>
        </div>
        
        <!-- Solo título en pantallas medianas -->
        <div class="ml-3 lg:hidden">
          <h3 
            :class="getTitleClasses(step.number)"
            class="text-sm"
          >
            {{ step.title }}
          </h3>
        </div>
        
        <!-- Línea conectora -->
        <div 
          v-if="index < steps.length - 1"
          :class="getConnectorClasses(step.number)"
          class="w-8 sm:w-12 lg:w-16"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineStep } from '../types/form.types'

interface Props {
  steps: TimelineStep[]
  currentStep: number
}

const props = defineProps<Props>()

const isStepActive = (stepNumber: number) => props.currentStep === stepNumber
const isStepCompleted = (stepNumber: number) => props.currentStep > stepNumber

const getStepClasses = (stepNumber: number) => {
  const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2'
  
  if (isStepCompleted(stepNumber)) {
    return `${baseClasses} bg-blue-500 border-blue-500 text-white`
  } else if (isStepActive(stepNumber)) {
    return `${baseClasses} bg-blue-100 border-blue-500 text-blue-500`
  } else {
    return `${baseClasses} bg-white border-gray-300 text-gray-500`
  }
}

const getTitleClasses = (stepNumber: number) => {
  const baseClasses = 'text-sm font-medium'
  
  if (isStepActive(stepNumber)) {
    return `${baseClasses} text-blue-600`
  } else {
    return `${baseClasses} text-gray-500`
  }
}

const getConnectorClasses = (stepNumber: number) => {
  const baseClasses = 'h-0.5 mx-2 sm:mx-4'
  
  if (isStepCompleted(stepNumber + 1)) {
    return `${baseClasses} bg-blue-500`
  } else {
    return `${baseClasses} bg-gray-300`
  }
}
</script>
