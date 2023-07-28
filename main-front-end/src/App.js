import logo from './logo.svg';
import './App.css';
import CamerasSectorList from './classes/CamerasSectorList'
import Navbar from './classes/Navbar'
import RoomsList from './classes/RoomsList';

import {useState, useEffect} from 'react'


function App() {
  const [inUseCameras, setInUseCameras] = useState({});
  const [unusedCameras, setUnusedCameras] = useState({});
  const [roomList, setRoomList] = useState([])

  const [area, setArea] = useState('rooms')

  const [currentRoomId, setCurrentRoomId] = useState(null)


  function updateRooms(){
    let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg4NTQ3ODI1LCJqdGkiOiIwZDQ1NzRhMC1lNTc0LTRiOGQtYWEzZS0xZjM3MTQyZjUwM2EiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODg1NDc4MjUsImV4cCI6MTY4ODU0ODcyNX0.NUUwZovyMJ9D8udfnErfT-gYexa4TLVgKMVKIGO9lgo'
    fetch('http://127.0.0.1:5000/getRooms', {
      method: 'GET',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    .then(response => response.text())
    .then(text => {
      setRoomList(JSON.parse(text))
    })
  }

  function changeCameras(id){

    let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg4NTQ3ODI1LCJqdGkiOiIwZDQ1NzRhMC1lNTc0LTRiOGQtYWEzZS0xZjM3MTQyZjUwM2EiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODg1NDc4MjUsImV4cCI6MTY4ODU0ODcyNX0.NUUwZovyMJ9D8udfnErfT-gYexa4TLVgKMVKIGO9lgo'
    fetch('http://127.0.0.1:5000/getCameraSectorsByRoomId?roomId=' + id, {
      method: 'GET',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    .then(response => response.text())
    .then(text => {
      setInUseCameras(JSON.parse(text))
    })

    fetch('http://127.0.0.1:5000/getUnusedCameraSectorsByRoomId?roomId=' + id, {
      method: 'GET',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    .then(response => response.text())
    .then(text => {
      setUnusedCameras(JSON.parse(text))
      console.log(unusedCameras)
    })
    setCurrentRoomId(id) 
  }
  
  function setSectorToRoom( sectorId){
    console.log(`setting sector ${currentRoomId} to ${currentRoomId}`)
    let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg4NTQ3ODI1LCJqdGkiOiIwZDQ1NzRhMC1lNTc0LTRiOGQtYWEzZS0xZjM3MTQyZjUwM2EiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODg1NDc4MjUsImV4cCI6MTY4ODU0ODcyNX0.NUUwZovyMJ9D8udfnErfT-gYexa4TLVgKMVKIGO9lgo'
    fetch('http://127.0.0.1:5000/setSectorToRoom?sectorId=' + sectorId + '&roomId=' + currentRoomId, {
      method: 'GET',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    .then(
      response => response.text())
    .then(text => {
      console.log(text)
      alert('Сектор добавлен')
      changeCameras(currentRoomId)
    })
  }

  function removeSector(sectorId){
    console.log(`setting sector ${currentRoomId} to ${currentRoomId}`)
    let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg4NTQ3ODI1LCJqdGkiOiIwZDQ1NzRhMC1lNTc0LTRiOGQtYWEzZS0xZjM3MTQyZjUwM2EiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODg1NDc4MjUsImV4cCI6MTY4ODU0ODcyNX0.NUUwZovyMJ9D8udfnErfT-gYexa4TLVgKMVKIGO9lgo'
    fetch('http://127.0.0.1:5000/removeSectorFromRoomLsit?sectorId=' + sectorId, {
      method: 'GET',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    .then(
      response => response.text())
    .then(text => {
      alert('Сектор удален')
      changeCameras(currentRoomId)
    })
  }

  useEffect(() => {
    const interval = setInterval(
      updateRooms,
      3000);
    return () => clearInterval(interval);
  }, []);

  function getRoomsPage(){
    return (
          <div className='row'>
            <RoomsList rooms={roomList} handleClickFoo={changeCameras}/>
            <CamerasSectorList header={'Связаные камеры'} handleClickFunction={removeSector} cameras={inUseCameras['camerasList'] ? inUseCameras['camerasList'] : []}/>
            <CamerasSectorList header={'Неиспользованные камеры'} handleClickFunction={setSectorToRoom} cameras={unusedCameras['camerasList'] ? unusedCameras['camerasList'] : []}/>
          </div>
  )}

  function getCamerasPage(){
    return (
          <div className='row'>
            <h1>Камеры</h1>
          </div>
  )}

  function getUserPage(){
    return (
          <div className='row'>
            <h1>User</h1>
          </div>
  )}
  function getTimesheetPage(){
    return (
          <div className='row'>
            <h1>Timesheet</h1>
          </div>
  )}
  function getWTFPage(){
    return (
          <div className='row'>
            <h1>WTF</h1>
          </div>
  )}
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar handleClickFunction={setArea}></Navbar>
      <div style={{marginTop: 80 + 'px'}}>
        {getRoomsPage()}
      </div>
    </div>
  );
}

export default App;
