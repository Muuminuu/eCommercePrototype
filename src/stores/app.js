import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORE_NAME = 'app'
const STORE_LOCAL_STORAGE_KEY = 'app'

const getDefaultState = () => {
    return {
        isAuthenticated: false,
        isAdmin: false
    }
}
const getCurrentState = ()  => {
    const localData = localStorage.getItem(STORE_LOCAL_STORAGE_KEY)
    return localData ? JSON.parse(localData) : getDefaultState()
}

export const useAppStore = defineStore(STORE_NAME, () =>{
    const isAuthenticated = ref(getCurrentState().isAuthenticated)
    const isAdmin = ref(getCurrentState().isAdmin)

    function updateLocalStorage() {
        let data = {
            isAuthenticated: isAuthenticated.value,
            isAdmin: isAdmin.value
        }
        localStorage.setItem(STORE_NAME_STORAGe_KEY, JSON.stringify(data))
    }

    const getIsAuthenticated = computed(() => isAuthenticated.value)
    function setIsAuthenticated(val) {
        if (!val) {
            setIsAdmin(false)
        }
        isAuthenticated.value = val
        updateLocalStorage()
    }

    const getIsAdmin = computed(() => isAdmin.value)
    function setIsAdmin(val){
        isAdmin.value = val
        updateLocalStorage()
    }

    return {
        isAuthenticated, isAdmin,
        getIsAuthenticated, setIsAuthenticated,
        getIsAdmin, setIsAdmin
    }
})