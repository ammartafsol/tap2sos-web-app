import TermsAndConditionTemplate from '@/component/templates/Website/TermsAndConditionTemplate/page'

import React from 'react'
import { getApi } from '@/interceptor/server-side-getApi'

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