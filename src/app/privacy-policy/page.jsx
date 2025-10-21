import PrivacyPolicyTemplate from '@/component/templates/Website/PrivacyPolicyTemplate/PrivacyPolicyTemplate'
import { getApi } from '@/interceptor/server-side-getApi';
import React from 'react'


export const dynamic = "force-dynamic"
const page = async () => {
    const { data } = await getApi(`cms/pages/privacyPolicyPage`);
  return (
   <PrivacyPolicyTemplate cmsData={data} />
  )
}

export default page