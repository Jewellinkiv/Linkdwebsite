import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.repairs;
export const metadata = createSeoLandingMetadata(page);

export default function RepairsPage() {
  return <SeoLandingPage page={page} />;
}
