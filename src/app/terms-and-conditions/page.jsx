import TermsAndConditionTemplate from '@/component/templates/Website/TermsAndConditionTemplate/page'

import React from 'react'
import { getApi } from '@/interceptor/server-side-getApi'

export default async function TermsAndConditionsPage() {
  const data = await getApi('cms/page/termsAndConditionsPage')

  return <TermsAndConditionTemplate _data={data?.data} />
}
