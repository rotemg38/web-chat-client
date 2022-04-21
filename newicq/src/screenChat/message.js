import './messages.css'

/* This function is responisable about the message component */

function Message(msgInfo) {
    return (
        <>
        {msgInfo.from === msgInfo.connectedUser ?(
        <div className='msg right alert'>
        <div className="text">
            <p>
                {msgInfo.type === "text"?(
                    msgInfo.text
                ):(<></>)}
                {msgInfo.type === "image" ?(
                    <img alt="" src={msgInfo.imgSrc} width="250" height="200"></img>
                ):(<></>)}
                {msgInfo.type === "video" ?(
                    <video controls="controls" src={msgInfo.videoSrc} width="250" height="200"></video>
                ):(<></>)}
                {msgInfo.type === "audio" ?(
                   <audio src={msgInfo.audioSrc} controls></audio>
                ):(<></>)}

                <br/>
                <span className='time'>
                    <label>{msgInfo.date}</label>
                </span>
            </p>
        </div> 
       
        </div>
        ):(
        <div className='msg left alert'>
        <div className="text">
            <p>
                {msgInfo.type === "text"?(
                    msgInfo.text
                ):(<></>)}
                {msgInfo.type === "image" ?(
                    <img alt="" src={msgInfo.imgSrc} width="250" height="200"></img>
                ):(<></>)}
                {msgInfo.type === "video" ?(
                    <video controls="controls" src={msgInfo.videoSrc} width="250" height="200"></video>
                ):(<></>)}
                {msgInfo.type === "audio" ?(
                   <audio src={msgInfo.audioSrc} controls></audio>
                ):(<></>)}

                <br/>
                <span className='time'>
                    <label>{msgInfo.date}</label>
                </span>
            </p>
        </div>
       
        </div>)
        }
        </>
    
    );
}
export default Message;