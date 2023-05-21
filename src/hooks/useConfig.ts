import { useLocalStorage } from '@vueuse/core'
import type { config } from '../types/config'
import { unref, computed } from 'vue'

export function useConfig() {
  const KEY = 'mykey3'
  const refConfig = useLocalStorage(KEY, getDefaultConfig(), {
    mergeDefaults: true
  })

  const hasAllConfig = computed(() => {
    if (
      refConfig.value.key &&
      refConfig.value.baseUrl &&
      refConfig.value.model &&
      refConfig.value.systemRole
    ) {
      return true
    } else {
      return false
    }
  })

  function getDefaultConfig(): config {
    return {
      key: 'fk202716-MNMnqle4CeX8RAT3FXUwQp73VQHpEIsn',
      baseUrl: 'https://oa.api2d.net',
      model: 'gpt-3.5-turbo',
      systemRole: '你负责帮用户做作业',
      max_tokens: 1000,
      temperature: 1,
      stream: false
    }
  }

  function setConfig(config: config) {
    localStorage.setItem(KEY, JSON.stringify(config))
  }

  function getUnrefConf() {
    return unref(refConfig)
  }

  return {
    getUnrefConf,
    setConfig,
    refConfig,
    hasAllConfig
  }
}
