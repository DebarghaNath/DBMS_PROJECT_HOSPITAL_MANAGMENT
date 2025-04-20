export default function VacatedRoomItem({room}){
    return <>
        <div className="vacated-item">
      <div className={`vacated-icon ${room.status}`}>
        <i className={room.iconClass}></i>
      </div>
      <div className="vacated-info">
        <h4>{room.roomNumber}</h4>
        <p>{room.description}</p>
      </div>
    </div>
    </>
}