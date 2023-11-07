import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import ICompanyEthData from 'src/types/ICompanyEthData'
import type IEvent from 'src/types/IEvent'

// const query = gql`
//     query Data {
//         companies(orderBy: iId) {
//             id
//             name
//             ticker
//             dataHash
//         },
//         events(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
//             id
//             companyId
//             blockTimestamp
//             eventType
//         }
//     }
// `

// const client = new ApolloClient({
//     uri: process.env.THEGRAPH_API_URL,
//     cache: new InMemoryCache()
// })

interface IGetStaticPropsResult {
    companies: ICompanyEthData[]
    events: IEvent[]
}

const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

export async function getStaticProps(): Promise<{
    props: IGetStaticPropsResult | null,
    revalidate: number
}> {
    // const companies: IGetStaticPropsResult = (await client.query({ query: query })).data
    let data: IGetStaticPropsResult | null = null
    const response = await fetch(`${backendEndpoint}/CompaniesAndEvents`)

    if (response.ok) {
        data = (await response.json()) as any
    }
    else {
        console.log(response.text())
    }

    return {
        props: data,
        revalidate: 60
    }
}

export type {
    IGetStaticPropsResult
}