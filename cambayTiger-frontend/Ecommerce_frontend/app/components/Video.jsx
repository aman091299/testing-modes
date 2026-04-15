import Heading from "./Heading"


const Video = ({videoUrl}) => {
  return (
    <div >
        <div className="mt-8">
       <iframe width="212" height="373" src={videoUrl} 
       className="rounded-lg"
       title="Forget basic, this Salmon’s got Miso-tude!🤌🏽#salmon #norwegiansalmon #recipe #misosalmon"
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         referrerPolicy="strict-origin-when-cross-origin" 
         allowFullScreen>

         </iframe>
        </div>
    </div>
  )
}

export default Video