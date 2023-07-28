import './Content.css';

const CamerasSectorList = ({header, cameras, handleClickFunction}) => { 
    
    return (
        <div className="cameras">
            <div className="title" >{header}</div>
            <div className="list" >
                {cameras.map((cam) => (
                <div className="list" id={'cam' + cam['id']} key={'cam' + cam['id']}>
                    <div >{cam['name']} {cam['sectors'].length}</div>
                    {cam['sectors'].map((sector) => (
                        <button onClick={() => {handleClickFunction(sector['id'])}}id={'sec' + sector['camId'] + '-' + sector['id']} key={'sec' + sector['camId'] + '-' + sector['id']}>{sector['id']} {sector['name']} ({sector['sectorType']})</button>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}

export default CamerasSectorList;