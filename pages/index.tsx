import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import DateCompo from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import Timer from '../components/timer'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from "../lib/strapi"
import utilStyles from '../styles/utils.module.css'

export default function Home({
  allPostsData,restaurants, date
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[],
  restaurants: []
  date:  string,
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <div>{date }</div>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Restaurants</h2>
        {/* <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateCompo dateString={date} />
              </small>
            </li>
          ))}
        </ul> */}
        <ul>
          {restaurants.map(({ name,id }) => (
            <li className={utilStyles.listItem} key={name}>
              <Link href={`/restaurants/${id}`}>{name}</Link>
              <br />
              
            </li>
          ))}
        </ul>
        <Timer />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  // const [restaurantsRes, categoriesRes] = await Promise.all([
  //   fetchAPI("/restaurants"),
  //   fetchAPI("/categories")    
  // ]);

  const restaurantsRes = await fetchAPI("/restaurants");

  const date = new Date();
  console.log(restaurantsRes.data.map(r => r.attributes));
  return {
    props: {
      restaurants: restaurantsRes.data.map(r => {
        return {
          name: r.attributes.name,
          id: r.id,
          updatedAt: r.attributes.updatedAt
        }
      }),
      date: date.toDateString() + ' ' + date.toLocaleTimeString()
    }
  }
}
