import SecurityKey from '@/component/templates/SecurityKey/SecurityKey'
import React from 'react'

export default function page({params}) {
  const {slug} = params;
  return <SecurityKey slug={slug} />
}
