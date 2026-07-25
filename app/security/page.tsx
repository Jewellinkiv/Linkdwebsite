import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.security;
export const metadata = createSeoLandingMetadata(page);

export default function SecurityPage() {
  return <SeoLandingPage page={page} />;
}
