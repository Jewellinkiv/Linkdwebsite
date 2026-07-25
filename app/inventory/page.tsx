import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.inventory;
export const metadata = createSeoLandingMetadata(page);

export default function InventoryPage() {
  return <SeoLandingPage page={page} />;
}
