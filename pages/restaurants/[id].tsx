import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { fetchAPI } from "../../lib/strapi"

export default function Post({
  restaurantData
}: {
  restaurantData: {
    id: string
    name: string
    updatedAt: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{restaurantData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{restaurantData.name}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={restaurantData.updatedAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: restaurantData.name }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const restaurantsRes = await fetchAPI("/restaurants");
  const allIds= restaurantsRes.data.map(r => r.id);  
  const paths = allIds.map(id => { return { params: { id: id.toString() } } });	
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const restaurantsRes = await fetchAPI("/restaurants"+`/${params?.id}`);
  const restaurantData = {
    id: restaurantsRes.data.id,
    name: restaurantsRes.data.attributes.name,
    updatedAt: restaurantsRes.data.attributes.updatedAt
  }
  return {
    props: {
      restaurantData
    }
  }
}