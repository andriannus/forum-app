import type { FC } from "react";
import { Helmet } from "react-helmet-async";

import type { SEOProps } from "./seo.model";

const SEO: FC<Partial<SEOProps>> = ({
  description = "We The Thread",
  title = "We The Thread",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
