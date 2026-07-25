import SeoLandingPage from "../components/SeoLandingPage";
import { createSeoLandingMetadata, seoLandingPages } from "../seoLandingPages";

const page = seoLandingPages.jewelryPos;
export const metadata = createSeoLandingMetadata(page);

export default function JewelryPosPage() {
  return <SeoLandingPage page={page} />;
}
