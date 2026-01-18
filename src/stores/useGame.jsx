import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => ({
    // What is the player currently looking at? (null = nothing)
    focusedObject: null,
    
    // Is the interface open?
    isInterfaceOpen: false,

    // Actions to change the state
    focusOn: (objectName) => set({ focusedObject: objectName }),
    clearFocus: () => set({ focusedObject: null }),
    openInterface: () => set({ isInterfaceOpen: true }),
    closeInterface: () => set({ isInterfaceOpen: false }),
})))