import ContactUs from '@/component/templates/ContactUs/ContactUs'
import React from 'react'
import { getApi } from '@/interceptor/server-side-getApi'

export default async function ContactUsPage() {
  const data = await getApi('cms/page/contactUsPage')

  return <ContactUs _data={data?.data} />
}
