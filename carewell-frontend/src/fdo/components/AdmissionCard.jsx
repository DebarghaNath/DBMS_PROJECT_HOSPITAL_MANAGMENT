export default function AdmissionCard(props){
    const badgeClassAdmitted = "badge-admitted";
    const badgeClassDischarged = "badge-discharged";

    const admitStatus = !props.dischargedate ? "Admitted" : "Discharged";
    const badgeClass = admitStatus === "Admitted" ? badgeClassAdmitted : badgeClassDischarged;
    return (
       <>
        <div className="admission-item">  
            <div className="admission-header">
                <div>
                    <div className="admission-name">{props.name}</div>
                    {/* <div className="admission-meta">{props.gender}, {props.age} years</div> */}
                </div>
                <span className={`status-badge ${badgeClass}`}>{admitStatus}</span>
            </div>
            <div className="admission-details">
                <div className="detail-item">
                    <i className="fas fa-bed"></i>
                    <span>{"Ward "}{props.room} &rarr;{" Bed "}{props.bedno}</span>
                </div>
                <div className="detail-item">
                    <i className="fas fa-user-md"></i>
                    <span>{props.doctor} {"("}{props.departmentname}{")"}</span>
                </div>
            </div>
        </div>  
       </>
    )
}