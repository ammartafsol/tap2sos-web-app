import PrivacyPolicyTemplate from '@/component/templates/Website/PrivacyPolicyTemplate/PrivacyPolicyTemplate'
import React from 'react'
import { getApi } from '@/interceptor/server-side-getApi'

export default async function PrivacyPolicyPage() {
  const data = await getApi('cms/page/privacyPolicyPage')
  
  return <PrivacyPolicyTemplate _data={data?.data} />
}
