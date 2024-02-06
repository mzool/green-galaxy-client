import { Helmet } from "react-helmet";
import logo from "../../assets/Green Galaxy.png"
function TagsForSEO({
  title,
  descriptionOfThePage,
  urlToImageDescripeThePage,
  pageURL,
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={descriptionOfThePage} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* for how contents appear when share on social media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={descriptionOfThePage} />
      <meta property="og:image" content={urlToImageDescripeThePage} />
      <meta property="og:url" content={pageURL} />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/png" href={logo} sizes="16x16 32x32 48x48" />
    </Helmet>
  );
}

export default TagsForSEO;
