import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.multiStore;
export const metadata = createSeoLandingMetadata(page);

export default function MultiStorePage() {
  return <SeoLandingPage page={page} />;
}
