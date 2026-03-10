import ICompanyEthData from 'src/types/ICompanyEthData'
import type IEvent from 'src/types/IEvent'
import fs from 'fs'
import path from 'path'

interface IGetStaticPropsResult {
    Companies: ICompanyEthData[]
    Events: IEvent[]
}

const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

const companiesPath = path.join(process.cwd(), 'public', 'data', 'companies.json')
const companiesDir = '/data/companies/'

export async function getStaticProps(): Promise<{
    props: IGetStaticPropsResult | null,
    revalidate: number
}> {
    let data: IGetStaticPropsResult | null = null
    let companies: ICompanyEthData[] = []
    const events: IEvent[] = []

    try {
        const companiesRaw = fs.readFileSync(companiesPath, 'utf-8')
        companies = JSON.parse(companiesRaw)

        // Optionally, load events from another local file if needed
    } catch (e) {
        console.log('Error reading companies.json', e)
    }
    data = { Companies: companies, Events: events }
    
    return {
        props: data,
        revalidate: 60
    }
}

export type {
    IGetStaticPropsResult
}