
export default function RoomCard(props){
    const roomColor = 
        props.type === "ICU" ? "#e63946" : 
        props.type === "General" ? "#457b9d" :
        props.type === "Emergency" ? "#f4a261" : 
        props.type === "Pediatrics" ? "#2a9d8f" : 
        props.type === "Maternity" ? "#e9c46a" : 
        props.type === "Surgical" ? "#f19933" :
        "#6b7280"; 

    const roomDescription = 
        props.type === "ICU" ? "Critical Care" : 
        props.type === "General" ? "Standard Care" : 
        props.type === "Emergency" ? "Special Care" : 
        props.type === "Pediatrics" ? "Children's Care" : 
        props.type === "Surgical" ? "Surgical Care" :
        props.type === "Maternity" ? "Mother & Baby" : "Unknown Type";

    return (
        <>
            <div className="room-card icu">
                <div className="room-header">
                    <div>
                        <div className="room-title">{props.type}</div>
                        <div className="room-desc">{roomDescription}</div>
                    </div>
                    <div className="room-count" style={{color:roomColor}}>{props.remcapacity}/{props.occupancy}</div>
                </div>
            </div>
        </>
    )
}
