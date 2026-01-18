import useGame from './stores/useGame'

export default function Interface() {
  // 1. Ask the "Brain": Is the interface open?
  const isInterfaceOpen = useGame((state) => state.isInterfaceOpen)
  const closeInterface = useGame((state) => state.closeInterface)

  // 2. If closed, show nothing (return null)
  if (!isInterfaceOpen) return null

  // 3. If open, show the card
  return (
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
  )
}