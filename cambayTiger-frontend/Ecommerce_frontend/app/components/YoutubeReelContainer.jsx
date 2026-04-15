
import Video from './Video'

const YoutubeReelContainer = () => {
  return (
     <div className="mt-8 mx-17">
     <div className="font-bold text-3xl">Cook with Cambay</div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide cursor-pointer">
      <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
        <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
        <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
          <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
          <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
        <Video videoUrl={"https://www.youtube.com/embed/xrp6CbAh-58"}/>
        </div>
        </div>
  )
}

export default YoutubeReelContainer