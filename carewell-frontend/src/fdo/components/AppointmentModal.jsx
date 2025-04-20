export default function AppointmentModal({setIsModalOpen, isModalOpen}){
    const newClass = isModalOpen?"active" :""
    return <>
     <div className={`modal ${newClass}`}  id="appointmentModal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">Schedule New Appointment</div>
                <button className="modal-close" onClick={()=>{setIsModalOpen(false)}}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="modal-patient">Patient</label>
                            <select id="modal-patient" className="form-control">
                                <option>Select patient</option>
                                <option>John D. Peterson</option>
                                <option>Mary L. Henderson</option>
                                <option>Alice K. Williamson</option>
                                <option>David T. Rodriguez</option>
                                <option>Emma Wilson</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-doctor">Doctor</label>
                            <select id="modal-doctor" className="form-control">
                                <option>Select doctor</option>
                                <option>Dr. Sarah Williams (Cardiology)</option>
                                <option>Dr. Robert Chen (General Surgery)</option>
                                <option>Dr. Michael Brown (Oncology)</option>
                                <option>Dr. Elizabeth Park (Orthopedics)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-date">Date</label>
                            <input type="date" id="modal-date" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-time">Time</label>
                            <input type="time" id="modal-time" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-type">Appointment Type</label>
                            <select id="modal-type" className="form control">
                                <option>Consultation</option>
                                <option>Follow-up</option>
                                <option>Emergency</option>
                                <option>Test</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-priority">Priority</label>
                            <select id="modal-priority" className="form-control">
                                <option>Normal</option>
                                <option>High</option>
                                <option>Emergency</option>
                            </select>
                        </div>
                        <div className="form-group" style={{gridColumn:" span 2"}}>
                            <label htmlFor="modal-notes">Notes</label>
                            <textarea id="modal-notes" rows="3" className="form-control"></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={()=>{setIsModalOpen(false)}} className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">Schedule Appointment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    </>
}