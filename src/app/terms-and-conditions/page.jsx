import TermsAndConditionTemplate from '@/component/templates/Website/TermsAndConditionTemplate/page'
import { getApi } from '@/interceptor/server-side-getApi';
import React from 'react'


export const dynamic = "force-dynamic"
const page = async () => {
  const { data } = await getApi(`cms/pages/termsAndConditionsPage`);
  return (
    <div>
      <TermsAndConditionTemplate cmsData={data} />
    </div>
  )
}

export default page