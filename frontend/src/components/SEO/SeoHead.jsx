// components/SEO/SeoHead.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SeoHead = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
}) => {
  const hasAny = !!(title || description || keywords || ogTitle || ogDescription || ogImage || canonical);
  if (!hasAny) return null;
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SeoHead;
