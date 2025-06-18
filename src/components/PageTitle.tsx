import { Helmet } from 'react-helmet';

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>DevBoard | {title}</title>
    </Helmet>
  );
}

export default PageTitle;
