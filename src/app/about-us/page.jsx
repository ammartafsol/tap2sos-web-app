import AboutUs from '@/component/templates/Website/AboutUs'
import React from 'react'
import { getApi } from '@/interceptor/server-side-getApi'

export default async function AboutUsPage() {
  const data = await getApi('cms/page/aboutUsPage')

  return (
    <>
      <AboutUs data={data?.data} />
    </>
  )
}
