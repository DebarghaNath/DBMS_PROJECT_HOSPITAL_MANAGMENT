export default function Pagination(){
    return <>
     <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> users
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</button>
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">2</button>
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">3</button>
                            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">4</button>
                            <button className="px=3 py-1 border rounded-md hover:bg-gray-100">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
    </>
}