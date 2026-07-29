export default function DynamicMeta({ structuredData = [], lineScripts = [] }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          id={`schema-${index}`}
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {/* Inline & External Scripts */}
      {lineScripts.map((script, index) => {
        if (script.type === "inline") {
          return (
            <script
              key={`inline-${index}`}
              dangerouslySetInnerHTML={{ __html: script.content }}
              {...(script.async ? { async: true } : {})}
              {...(script.defer ? { defer: true } : {})}
            />
          );
        }

        if (script.type === "external") {
          return (
            <script
              key={`external-${index}`}
              src={script.src}
              {...(script.async ? { async: true } : {})}
              {...(script.defer ? { defer: true } : {})}
            />
          );
        }

        return null;
      })}
    </>
  );
}
