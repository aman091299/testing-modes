import Image from 'next/image'

const MembershipBanner = () => {
  return (
    <div className="px-4 py-2 flex justify-center mt-10 ">
    <div className="h-[200px] w-[1180px]  relative">
        <Image src="https://res.cloudinary.com/dgnp4dfhy/image/upload/v1773745175/1611x241_px_CT_App_Download_Placeholder_Banner_-3036fe6601bc_bkfvcp.png"
        fill alt="membership Banner" className="rounded-lg" />
    </div>
    </div>
  )
}

export default MembershipBanner