const Appointment = () => {
    return (
        <>
            <section className="appointment">
                <div className="container">
                    <div className="appointment-container">
                        <h2 className="section-title text-center">Book an Appointment</h2>
                        <p className="section-subtitle text-center">Fill out the form to schedule your visit with our specialists</p>
                        
                        <form className="appointment-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" className="form-control" placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className="form-control" placeholder="your@email.com" />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" className="form-control" placeholder="+1 234 567 890" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="department">Department</label>
                                    <select id="department" className="form-control">
                                        <option value="">Select Department</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="orthopedics">Orthopedics</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="ophthalmology">Ophthalmology</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="date">Appointment Date</label>
                                    <input type="date" id="date" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="doctor">Doctor</label>
                                    <select id="doctor" className="form-control">
                                        <option value="">Select Doctor</option>
                                        <option value="dr-smith">Dr. Smith (Cardiology)</option>
                                        <option value="dr-johnson">Dr. Johnson (Neurology)</option>
                                        <option value="dr-williams">Dr. Williams (Orthopedics)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="notes">Additional Notes</label>
                                <textarea id="notes" className="form-control" rows="4" placeholder="Describe your symptoms or concerns..."></textarea>
                            </div>
                            
                            <div className="form-submit">
                                <button type="submit" className="btn btn-primary">Submit Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Appointment;