import { ref } from 'vue'
import type { Country } from '../types/form.types'
import { API_ENDPOINTS, FALLBACK_COUNTRIES } from '../config/form.constants'

export function useCountries() {
  const countries = ref<Country[]>([])
  const loadingCountries = ref(true)
  const error = ref<string | null>(null)

  const loadCountries = async () => {
    try {
      loadingCountries.value = true
      error.value = null
      
      const response = await fetch(API_ENDPOINTS.COUNTRIES)
      const data = await response.json()
      
      countries.value = data
        .map((country: any) => ({
          name: country.name.common,
          code: country.cca2
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
        
    } catch (err) {
      console.error('Error cargando países:', err)
      error.value = 'Error al cargar la lista de países'
      countries.value = FALLBACK_COUNTRIES
    } finally {
      loadingCountries.value = false
    }
  }

  return {
    countries,
    loadingCountries,
    error,
    loadCountries
  }
}
