import './RoomsList.css';

const RoomsList = ({rooms, handleClickFoo}) => { 
    return(
        <div id="roomsList" className="list">
            {rooms.map((room) =>(
                <button onClick={()=>{handleClickFoo(room['id'])}} id={'select-room-' + room['id']} key={'select-room-' + room['id']}> 
                    {room['name']} | {room['roomType']['name']}
                </button>
            ))}
        </div>
    );
}

export default RoomsList;