export default function ApplicationDetailsModal(){
    return (
        <div id="applicationModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Application Details</h3>
            <div id="modalContent" className="space-y-4">
              {/* Application details will be loaded here */}
            </div>
            <div className="mt-5 flex justify-end gap-4">
              <button id="closeModal" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Close</button>
              <button id="updateStatus" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Status</button>
            </div>
          </div>
        </div>
      </div>

    )
}