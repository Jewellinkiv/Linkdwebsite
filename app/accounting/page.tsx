import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.accounting;
export const metadata = createSeoLandingMetadata(page);

export default function AccountingPage() {
  return <SeoLandingPage page={page} />;
}
