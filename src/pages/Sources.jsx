import InformationPage from '../components/common/InformationPage'
import { footerPages } from '../data/footerPages'
import ImageCredits from "../components/common/ImageCredits"

function Sources() {
  return (
    <InformationPage page={footerPages.sources}>
      <ImageCredits />
    </InformationPage>
  )
}

export default Sources
