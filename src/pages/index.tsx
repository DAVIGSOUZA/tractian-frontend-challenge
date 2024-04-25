import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/jaguar',
      permanent: true,
    },
  }
}

export default function Home() {
  return null
}
