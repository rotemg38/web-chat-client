import './screenChat.css'
function Message(msgInfo) {

    return (
        <>
        {msgInfo.from === msgInfo.connectedUser ?(
        <div className='w-100'>
        <div className="alert alert-primary msg msg-from">
            <p className=''>
                {msgInfo.type === "text"?(
                    msgInfo.text
                ):(<></>)}
                {msgInfo.type === "image" ?(
                    <img src={msgInfo.imgSrc} width="300" height="200"></img>
                ):(<></>)}
                <br/>
                <label>{msgInfo.date}</label>
            </p>
        </div> 
       
        </div>
        ):(
        <div className='w-100'>
        <div className="alert alert-info msg">
            <p>
                {msgInfo.text}
                <br/>
                <label>{msgInfo.date}</label>
            </p>
        </div>
       
        </div>)
        }
        </>
    
    );
}
export default Message;