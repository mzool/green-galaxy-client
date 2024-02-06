import logo from "../../assets/Green Galaxy.png";
function JSONLtd() {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    url: "https://green-galaxy.net",
    name: "Green Galaxy Online Store",
    description:
      "Discover a world of high-quality products at unbeatable prices. Our online store offers a diverse range of items, meticulously curated to meet your needs without compromising on quality. From fashion to electronics, home essentials to accessories, we bring you the best value for your money. Experience the joy of affordable luxury and shop with confidence at Your Online Store.",
    logo: { logo },
    sameAs: [
      "https://www.facebook.com/greenGalaxy",
      "https://www.twitter.com/greenGalaxy",
      "https://www.instagram.com/greenGalaxy",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "00962795035419",
        contactType: "customer service",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Saiegh St",
      addressLocality: "Amman",
      addressRegion: "Abu Alanda",
      postalCode: "11952",
      addressCountry: "Jordan",
    },
  };

  return (
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  );
}

export default JSONLtd;
