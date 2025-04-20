{/* <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                        <i className="fas fa-flask mr-2 text-green-500"></i> Recent Lab Results
                      </h4>
                      <div className="space-y-2">
                        {p.labResults.map((lab, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-sm">{lab.test}</span>
                            <span className={`text-sm font-medium ${
                              lab.status === 'normal' ? 'text-green-600' :
                              lab.status === 'elevated' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {lab.result}
                              <span className={`text-xs ${
                                lab.status === 'normal' ? 'bg-green-100' :
                                lab.status === 'elevated' ? 'bg-yellow-100' :
                                'bg-red-100'
                              } px-2 py-0.5 rounded-full ml-1`}>
                                {lab.status}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div> */}