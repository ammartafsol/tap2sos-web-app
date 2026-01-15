import PropTypes from "prop-types";
import SecurityKey from '@/component/templates/SecurityKey/SecurityKey';
import React from 'react';

export default function page({ params }) {
  const { slug } = params;
  return <SecurityKey slug={slug} />;
}

page.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
