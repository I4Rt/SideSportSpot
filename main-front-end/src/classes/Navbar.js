import './Navbar.css';

function Navbar({handleClickFunction}) { 
    
  return (
    <div className="navbar">
        <div className="navbarElement">
            <button onClick={handleClickFunction('timesheet')} className="basicButton">Расписание</button>
        </div>
        <div className="navbarElement">
            <button onClick={handleClickFunction('cameras')} className="basicButton">Камеры</button>
        </div>
        <div className="navbarElement">
            <button onClick={handleClickFunction('rooms')} className="basicButton">Комнаты</button>
        </div>
        <div className="targetNavbarElement">
            <button onClick={handleClickFunction('user')} className="basicButton">Пользователь</button>
        </div>
    </div>
  );
}

export default Navbar;