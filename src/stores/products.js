import { defineStore } from 'pinia'

import products from '@/data/productlist.json'

const STORE_NAME = 'products'
const STORE_LOCAL_STORAGE_KEY = 'products'

const getDefaultState = () => products
const getCurrentState = () => {
    const localData = localStorage.getItem(STORE_LOCAL_STORAGE_KEY)
    return localData ? JSON.parse(localData) : getDefaultState()
}

export const useProductStore = defineStore(STORE_NAME, {
    state: () => {
        return {
            products: getCurrentState(),
            editProductMode: false,
            productToEditId: null
        }
    },
    getters: {
        getProducts: (state) => state.products,
        getEitProductMode: (state) => state.editProductMode,
        getProductToEditId: (state) => state.productToEditId,
        getProductById: (state) => (id) => {
            return state.products.find(product => product.id == id)
        }
    },
    actions: {
        updateLocalStorage() {
            localStorage.setItem(STORE_LOCAL_STORAGE_KEY, JSON.stringify(this.products))
        },
        addProduct(product) {
            this.products.push(product)
            this.updateLocalStorage()
        },
        updateProduct(product){
            const index = this.products.findIndex(el => {
                return el.id == product.id
            })
            this.products[index] = product
            this.updateLocalStorage()
            this.resetEditionMode()
        },
        deleteProduct(productyId) {
            this.products = this.products.filter(el => el.id != productId)
            this.updateLocalStorage()    
        },
        setEditProductMode(mode) {
            this.editProductMode = mode
        },
        setProductToEditId(id) {
            this.productToEditId = id
        },
        resetEditionMode() {
            this.productToEditId = null
            this.editProductMode = false
        }
    }
})
