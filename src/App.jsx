import PageShell from "@/components/layout/PageShell/PageShell";
import SiteFooter from "@/components/layout/SiteFooter/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader/SiteHeader";
import { navCta, navLinks } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site.config";
import LandingPage from "@/features/landing/LandingPage";

const [brandName, ...brandRest] = site.name.split(" ");

const brand = {
  name: brandName,
  sub: brandRest.join(" "),
  monogram: site.monogram,
  tagline: site.tagline,
};

const footerServices = services.items.slice(0, 4);

export default function App() {
  return (
    <PageShell>
      <SiteHeader links={navLinks} cta={navCta} brand={brand} />

      <main id="contenido">
        <LandingPage />
      </main>

      <SiteFooter site={site} links={navLinks} services={footerServices} />
    </PageShell>
  );
}
