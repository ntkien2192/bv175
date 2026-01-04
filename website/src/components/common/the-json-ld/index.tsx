import Script from 'next/script';
const JsonLDProvider = ({ pageSchema }: { pageSchema: any }) => {
  if (!pageSchema) return null;
  if (Array.isArray(pageSchema)) {
    return pageSchema.map((json: any, index: number) => (
      <Script
        id={'jsonld-' + index}
        key={'jsonld-' + index}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(json),
        }}
      ></Script>
    ));
  }

  return (
    <Script
      id="single-jsonld"
      key="single-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pageSchema),
      }}
    ></Script>
  );
};
export default JsonLDProvider;
