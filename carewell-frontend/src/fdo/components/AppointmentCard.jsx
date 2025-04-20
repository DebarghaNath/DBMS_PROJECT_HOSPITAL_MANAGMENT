export default function AppointmentCard({apt}){
    return <>
        <tbody>
            <tr className="animate-fadeIn">
                <td>
                    <div className="admission-name">{apt.patientname}</div>
                    {/* <div className="text-[10px]">PAT{apt.patientid}</div> */}
                    {/* <div className="patient-ref">{props.reference}</div> */}
                </td>

                <td>{apt.doctorname}</td>

                <td>
                    <div>{apt.date}</div>
                </td>

                <td>
                    <div>{apt.time}</div>
                    {/* <div className="specialty">{apt.department}</div> */}
                </td>

                <td>
                    {apt.type === "Emergency" ? (
                        <span className={`status-badge badge-emergency`}>{apt.type}</span>
                    ) : apt.type === "Follow-up" ? (
                        <span className={`status-badge badge-followup`}>{apt.type}</span>
                    ) : (
                        <span className={`status-badge badge-normal`}>Consultation</span>
                    )}
                </td>

                <td>
                    {apt.status === "Pending" ? (
                        <span className={`status-badge badge-pending`}>{apt.status}</span>
                    ) : (
                        <span className={`status-badge badge-completed`}>Confirmed</span>
                    )}
                </td>

                {/* <td className="table-actions">
                    <button><i className="fas fa-ellipsis-v"></i></button>
                </td> */}
                <td className="specialty">{apt.departmentname}</td>
            </tr> 
        </tbody>
    </>
}