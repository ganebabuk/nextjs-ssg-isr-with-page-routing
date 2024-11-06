import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import CommonHeader from '@/components/header';
import CommonFooter from '@/components/footer';

interface PageProps {
  head: string | null;
  content: string | TrustedHTML;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { page: 'about-us' } },
    { params: { page: 'our-products' } },
    { params: { page: 'who-we-are' } },
  ];

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page as string;
  let data: PageProps | null = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      head: data?.head || null,
      content: data?.content || null,
    }
  };
};

export default function Page({ head, content }: PageProps) {

  return (
    <div className="container mx-auto">
      <Head>
        <title>Welcome to P&G | {head}</title>
        <meta name="description" content={`Welcome to P&G | ${head}`} />
        <meta name="keywords" content="P&G" />
        <meta name="author" content="P&G" />
        <link rel="icon" href="/images/P_G_Logo_RGB.svg" />
      </Head>
      <CommonHeader />
      {head ? (
        <>
          <h1 className="text-3xl font-bold dark:text-white">{head}</h1>
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      ) : (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Something wrong!</span> Please try after
            sometime
          </div>
        </div>
      )}
      <CommonFooter />
    </div>
  );
}
