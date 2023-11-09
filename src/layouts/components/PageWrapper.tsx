import React from "react"
import store from '../../store'
import { selectCompany } from 'src/lib/generalMethods'
import { setCompanies, setCompanyLoading, setIdToCompany } from 'src/features/general'
import ICompanyEthData from 'src/types/ICompanyEthData'
import { useBeforeunload } from 'react-beforeunload';
import { useAppSelector } from "src/hooks"
import ICompanyData from "src/types/ICompanyData"

const PageWrapper = ({companies, children}: {
    companies: ICompanyEthData[]
    children: React.ReactNode
}) => {
    React.useEffect(() => {
        const callback = async () => {
            store.dispatch(setCompanyLoading(true))

            const searchParams = new URLSearchParams(window.location.search)
            const companyId = searchParams.get('id')
            const isNewCompany = searchParams.get('isNewCompany')

            if (!isNewCompany) {
                // if (!companyId && !store.getState().newCompanyData.id) {
                if (!companyId) {
                    selectCompany(companies[0], store.dispatch)
                }
                else {
                    const company = companies.find(company => company.Id == companyId)

                    selectCompany(company!, store.dispatch)
                }
            }
            else {
                store.dispatch(setCompanyLoading(false))
            }
            
            store.dispatch(setCompanies(companies))

            const idToCompany: { [key: string]: ICompanyEthData } = {}

            for (const company of companies) {
                idToCompany[company.Id] = company
            }

            store.dispatch(setIdToCompany(idToCompany))
        }

        callback()
    }, [])

    const companyData = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)
    const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

    useBeforeunload(ev => {
        if (JSON.stringify(companyData) !== JSON.stringify(newCompanyData)){
            ev.preventDefault()
        }
    })

    return <>{children}</>
}

export default PageWrapper