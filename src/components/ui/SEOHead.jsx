import { Helmet } from 'react-helmet-async'

export default function SEOHead({
  title,
  description,
  canonical,
  type = 'website',
  noIndex = false,
}) {
  const siteUrl = 'https://vio-it.de'
  const fullTitle = title ? `${title} | VIO-IT` : 'VIO-IT – Digitale Lösungen für moderne Unternehmen'
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'VIO-IT – Viorel Ghiurca, Fachinformatiker & IT-Experte. KI-Automatisierung, Website-Erstellung, IT-Support und Digitalisierung für KMU.'} />
      <link rel="canonical" href={fullCanonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'VIO-IT – Ihr IT-Partner für Digitalisierung, KI und moderne Websites.'} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="VIO-IT" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'VIO-IT – Digitale Lösungen für moderne Unternehmen.'} />
    </Helmet>
  )
}
