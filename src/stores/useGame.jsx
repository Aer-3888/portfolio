import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => ({
    // What is the player currently looking at? (null = nothing)
    focusedObject: null,
    
    // Is the interface open?
    isInterfaceOpen: false,

    // What interactable object is nearby? (null = nothing, or {name, data})
    nearbyObject: null,

    // Actions to change the state
    focusOn: (objectName) => set({ focusedObject: objectName }),
    clearFocus: () => set({ focusedObject: null }),
    openInterface: () => set({ isInterfaceOpen: true }),
    closeInterface: () => set({ isInterfaceOpen: false }),
    setNearbyObject: (obj) => set({ nearbyObject: obj }),
    clearNearbyObject: () => set({ nearbyObject: null }),
})))