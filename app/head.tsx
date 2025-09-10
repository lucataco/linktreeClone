import data from "../data.json";

export default function Head() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    description: data.desc,
    url: siteUrl,
    image: `${siteUrl}${data.avatar}`,
    sameAs: data.socials?.map((s) => s.href) || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}


