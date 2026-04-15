import CollectionPage from '@/app/components/CollectionPage'
import React from 'react'

export async function generateMetadata({ params }) {
  let formatedCollectionName =await params;
  formatedCollectionName.slug[0]
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = `Buy Fresh ${formatedCollectionName} Online - Cambay Tiger`;

  return {
    title,
       icons: {
      icon: [
        {
          rel: "icon",
          url: "/favicon.svg", 
          type: "image/svg+xml",
        },
      ],
    },
  };
}

const page = () => {
  console.log("inside collection page")
  return (
    <div>
      <CollectionPage/>
    </div>
  )
}

export default page