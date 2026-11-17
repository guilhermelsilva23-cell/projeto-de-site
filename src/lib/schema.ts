import { SITE } from "@/config/site";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.NOME_EMPRESA,
  ...(SITE.EMAIL_RFQ ? { email: SITE.EMAIL_RFQ } : {}),
};

export function serviceLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "Adequação de máquinas à NR-12",
    areaServed: "BR",
    provider: { "@type": "Organization", name: SITE.NOME_EMPRESA },
  };
}

export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
