export default function JobApplicationModal(
    { isOpen, onClose, positions }: 
    { 
        isOpen: boolean; 
        onClose: () => void; 
        positions: Array<string> 
    }){
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Application Form</h2>
          <form>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1 "
                required
              />
            </div>
            <div className="mb-2">
              <select
                name="position"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
                required
              >
                <option value="" disabled selected>
                  Choose Position
                </option>
                {positions.map((pos, idx) => (
                  <option key={idx} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="number"
                placeholder="Contact Number"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 font-bold rounded-md p-2 w-1/2 mr-2"
              >
                Close
              </button>
              <button type="submit" className="bg-blueTheme text-white font-bold rounded-md p-2 w-1/2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  