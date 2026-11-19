import ContactLocation from './sections/ContactLocation/ContactLocation'
import Faq from './sections/Faq/Faq'
import FeaturedCuts from './sections/FeaturedCuts/FeaturedCuts'
import Hero from './sections/Hero/Hero'
import Services from './sections/Services/Services'

/**
 * Composición de la landing. Acá vive el orden de las secciones y nada más.
 * Cada sección resuelve su propio contenido y layout.
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturedCuts />
      <Services />
      <Faq />
      <ContactLocation />
    </>
  )
}
