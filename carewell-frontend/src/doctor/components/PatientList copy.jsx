import {patients} from "./PatientDetails"
import { patientsInDetail } from "./ElaboratedDetail"
import "../DoctorDashboard.css"
import {useState} from 'react'

export default function  PatientList(){
  const [isActive,setIsActive]=useState(false)
  const [activeId,setActiveId]=useState(0)
  const [showPrescription,setShowPrescription]=useState(false)
  const newClass= showPrescription?"":"hidden"
  const [showPatient,setShowPatient]=useState([
      {
          "id":1,
          "active":false
      },
      {
          "id":2,
          "active":false,
      
      },
      {
          "id":3,
          "active":false,

      },
      {
      "id":4,
      "active":false,
      },
      {
      "id":5,
      "active":false,
      }
  ])
  function prescriptionHandler(){
    setShowPrescription(true)
    // console.log("prescriptionHandler fired")
  }
  function handlePatient(id) {
      setIsActive((prev)=>{
          return true
      })
      setActiveId(id)
      setShowPatient((prev) =>
        prev.map((patient) => ({
          ...patient,
          active: patient.id === id,
        }))
      );
    }


  function Detail({ isActive,activeId }){
    console.log(`activeId ${activeId}`);
    if(isActive){
        const p=patientsInDetail[activeId-1]
        console.log(patientsInDetail);
        
        // console.log(`activeId ${activeId}`);
        // console.log();
        // console.log(p);
          return <>
        

        <div className="p-6">
  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
    <h2 className="font-semibold text-lg">{p.name} ({p.id})</h2>
    <div className="flex space-x-2">
      <button
        onClick={prescriptionHandler}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      >
        <i className="fas fa-prescription-bottle-alt mr-2"></i> New Prescription
      </button>
      <button className="p-2 text-gray-500 hover:text-blue-600">
        <i className="fas fa-ellipsis-v"></i>
      </button>
    </div>
  </div>

  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="md:col-span-1">
        <div className="flex flex-col items-center">
          <img
            src={p.image}
            alt="Patient"
            className="w-32 h-32 rounded-full border-4 border-blue-100 mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-gray-500">{p.age} years, {p.gender}</p>
          <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
            <i className="fas fa-heartbeat mr-2"></i> {p.condition}
          </span>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
            <i className="fas fa-id-card mr-2 text-blue-500"></i> Contact Information
          </h4>
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <i className="fas fa-envelope mr-2 text-blue-500 w-5"></i> {p.contact.split(' | ')[0]}
          </p>
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <i className="fas fa-phone mr-2 text-blue-500 w-5"></i> {p.contact.split(' | ')[1]}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <i className="fas fa-map-marker-alt mr-2 text-blue-500 w-5"></i> {p.address}
          </p>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
            <i className="fas fa-heartbeat mr-2 text-blue-500"></i> Medical Information
          </h4>
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <i className="fas fa-tint mr-2 text-blue-500 w-5"></i> Blood Type: {p.bloodType}
          </p>
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <i className="fas fa-allergies mr-2 text-blue-500 w-5"></i> Allergies: {p.allergies}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <i className="fas fa-pills mr-2 text-blue-500 w-5"></i> Current Medications: {p.medications.split(', ')[0]}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-heart mr-2 text-blue-500"></i> Vital Signs
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Blood Pressure</p>
                <p className="font-medium">{p.vitals.bp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Heart Rate</p>
                <p className="font-medium">{p.vitals.hr} bpm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="font-medium">{p.vitals.temp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="font-medium">{p.vitals.weight}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
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
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <i className="fas fa-history mr-2 text-gray-500"></i> Medical History
          </h4>
          <p className="text-gray-600">{p.history}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
            <i className="fas fa-calendar-alt mr-2 text-blue-500"></i> Recent Visits
          </h4>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/30 rounded-r">
              <p className="font-medium">Follow-up Consultation</p>
              <p className="text-sm text-gray-500">{p.lastVisit} | Blood Pressure: {p.vitals.bp}</p>
              <p className="text-sm text-gray-600 mt-1">Patient reported feeling better. Medication adjusted slightly.</p>
            </div>
            <div className="border-l-4 border-blue-300 pl-4 py-2">
              <p className="font-medium">Routine Checkup</p>
              <p className="text-sm text-gray-500">2 weeks ago | Blood Pressure: {p.vitals.bp}</p>
              <p className="text-sm text-gray-600 mt-1">Patient stable. Recommended dietary changes.</p>
            </div>
            <div className="border-l-4 border-blue-300 pl-4 py-2">
              <p className="font-medium">Initial Consultation</p>
              <p className="text-sm text-gray-500">1 month ago | Blood Pressure: {p.vitals.bp}</p>
              <p className="text-sm text-gray-600 mt-1">Diagnosed with {p.condition}. Prescribed initial treatment.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
            <i className="fas fa-prescription mr-2 text-purple-500"></i> Current Prescriptions
          </h4>
          <div className="divide-y divide-gray-200">
            {p.medications.split(', ').map((med, index) => (
              <div key={index} className="prescription-item py-3 px-2 hover:bg-blue-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium flex items-center">
                      <i className="fas fa-pills mr-2 text-purple-500"></i> {med}
                    </p>
                    <p className="text-sm text-gray-500 ml-6">
                      {index === 0 ? '500mg, Once daily' : index === 1 ? '40mg, Twice daily' : 'As directed'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 ml-6">For {p.condition} management</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          </>
    }else{
       return  <><div className="p-4 border-b bg-gray-50 flex justify-between items-center">
       <h2 className="font-semibold text-lg">Patient Overview</h2>
       <div className="flex space-x-2">
           <button className="p-2 text-gray-500 hover:text-blue-600">
               <i className="fas fa-print"></i>
           </button>
           <button className="p-2 text-gray-500 hover:text-blue-600">
               <i className="fas fa-share-alt"></i>
           </button>
       </div>
   </div>
   <div className="p-6">
   <div className="text-center mb-6">
       {/* < !-- <img src="https://img.icons8.com/fluency/96/000000/patient.png" alt="Patient" className="w-20 h-20 mx-auto opacity-30"> --> */}
     {   <p className="text-gray-500 mt-2">Select a patient to view detailed information</p> }
  </div>
   </div>
   </>
    }
  }

    return <>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* <!-- Patient List --> */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">Recent Patients</h2>
                                <button className="text-blue-600 text-sm flex items-center">
                                    <i className="fas fa-plus mr-1"></i> New
                                </button>
                            </div>
                            <div className="overflow-y-auto" style={{maxHeight: 500}}>
                                <div className="divide-y divide-gray-200">
                                
                                  {  patients.map((patient)=>{
                                       return <>
                                         <div className="patient-card p-4 hover:bg-gray-50 cursor-pointer transition" onClick={()=>handlePatient(patient.id)}>
                                        <div className="flex items-center space-x-3">
                                            <img src={patient.img} alt="Patient" className="w-12 h-12 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-medium">{patient.name}</p>
                                                <p className="text-sm text-gray-500">ID:{patient.id} | {patient.age}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className={`px-2 py-1 bg-${patient.conditionColor}-100 text-${patient.conditionColor}-800 text-xs rounded-full flex items-center`}>
                                                <i className={patient.conditionIcon}></i>{patient.condition}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center">
                                                <i className="fas fa-clock mr-1"></i> {patient.time}
                                            </span>
                                        </div>
                                    </div>
                                       </>
                                    })
                                }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!-- Patient Details and Analytics --> */}
                    <div className="lg:col-span-2">
                        {/* <!-- Patient Details --> */}
                        <div id="patient-details" className="bg-white rounded-xl shadow overflow-hidden">
                           <Detail isActive={isActive} activeId={activeId}/>
                           
                        </div>
                        
                        {/* <!-- Prescription Form (Hidden by default) --> */}
                        
                          
                        
                        <div id="prescription-form" className={`bg-white rounded-xl shadow mt-6 overflow-hidden ${newClass}`}>
                            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">New Prescription</h2>
                                <button  className="text-gray-500 hover:text-red-600">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="p-6">
                                <form id="new-prescription">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Medication Name*</label>
                                            <div className="relative">
                                                <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                                <button type="button" className="absolute right-3 top-2 text-blue-600">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Dosage*</label>
                                            <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 500mg" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Frequency*</label>
                                            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                                <option value="">Select frequency</option>
                                                <option>Once daily</option>
                                                <option>Twice daily</option>
                                                <option>Three times daily</option>
                                                <option>Four times daily</option>
                                                <option>As needed</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Duration*</label>
                                            <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 7 days" required />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-2">Instructions</label>
                                        <textarea className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Additional instructions..."></textarea>
                                    </div>
                                    <div className="mt-6">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                            <span className="ml-2 text-gray-700">Send prescription to pharmacy</span>
                                        </label>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button type="button" onClick={()=>{setShowPrescription(false)}} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                                            <i className="fas fa-save mr-2"></i> Save Prescription
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    </>
}