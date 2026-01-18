import useGame from './stores/useGame'

export default function Interface() {
  const isInterfaceOpen = useGame((state) => state.isInterfaceOpen)
  const closeInterface = useGame((state) => state.closeInterface)
  const nearbyObject = useGame((state) => state.nearbyObject)

  return (
    <>
      {/* Interaction Prompt */}
      {nearbyObject && !isInterfaceOpen && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-black/70 text-white px-6 py-3 rounded-lg flex items-center gap-3 backdrop-blur-sm">
            <span className="text-lg font-bold border-2 border-white px-3 py-1 rounded">E</span>
            <span className="text-base">{nearbyObject.prompt || 'Interact'}</span>
          </div>
        </div>
      )}

      {/* Interface Modal */}
      {isInterfaceOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">💻 My Projects</h2>
            <p className="mb-6">Here is a list of my amazing work...</p>
            <button 
              onClick={closeInterface}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}