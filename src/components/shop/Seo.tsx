import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  keywords?: string;
};

const SITE = "https://vasavistores.lovable.app";

export default function Seo({ title, description, canonical, image, jsonLd, keywords }: Props) {
  const url = canonical ? (canonical.startsWith("http") ? canonical : `${SITE}${canonical}`) : SITE;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
