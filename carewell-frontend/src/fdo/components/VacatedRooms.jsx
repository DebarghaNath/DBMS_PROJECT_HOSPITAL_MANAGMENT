
import VacatedRoomItem from "./VacatedRoomItem"
export default function VacatedRooms({rooms}){
    return <>
   <div className="vacated-rooms">
      <div className="vacated-header">Recently Vacated Rooms</div>
      <div className="vacated-list">
        {rooms.map((room) => {
               return( <VacatedRoomItem key={room.id} room={room} />)
        }
        
        )}
      </div>
    </div>

    </>
}