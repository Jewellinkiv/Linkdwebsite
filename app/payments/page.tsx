import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.payments;
export const metadata = createSeoLandingMetadata(page);

export default function PaymentsPage() {
  return <SeoLandingPage page={page} />;
}
