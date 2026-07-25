import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.integrations;
export const metadata = createSeoLandingMetadata(page);

export default function IntegrationsPage() {
  return <SeoLandingPage page={page} />;
}
