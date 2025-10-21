import PrivacyPolicyTemplate from '@/component/templates/Website/PrivacyPolicyTemplate/PrivacyPolicyTemplate'
import React from 'react'


export const dynamic = "force-dynamic"
const page = async () => {
    const { data } = await getApi(`cms/pages/privacyPolicyPage`);
  return (
   <PrivacyPolicyTemplate cmsData={data} />
  )
}

export default page