import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyEthData from 'src/types/ICompanyEthData'
import IUserFavoriteCompany from 'src/types/IUserFavoriteCompany'

interface IGeneral {
    companyLoading: boolean
    valuesAsMillions: boolean
    logarithmicScale: boolean
    companies: ICompanyEthData[] | null
    idToCompany: {[key: number]: ICompanyEthData} | null,
    googleOauthToken: string | null,
    userFavoriteCompanies: IUserFavoriteCompany[] | null
}

const initialState: IGeneral = {
    companyLoading: false,
    valuesAsMillions: true,
    logarithmicScale: false,
    companies: null,
    idToCompany: null,
    googleOauthToken: null,
    userFavoriteCompanies: null
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCompanyLoading: (state, action: PayloadAction<boolean>) => {
            state.companyLoading = action.payload
        },
        changeValuesAsMillions: (state) => {
            state.valuesAsMillions = !state.valuesAsMillions
        },
        changeLogarithmicScale: (state) => {
            state.logarithmicScale = !state.logarithmicScale
        },
        setCompanies: (state, action: PayloadAction<ICompanyEthData[]>) => {
            state.companies = action.payload
        },
        setIdToCompany: (state, action: PayloadAction<{[key: number]: ICompanyEthData}>) => {
            state.idToCompany = action.payload
        },
        setGoogleOauthToken: (state, action: PayloadAction<string>) => {
            state.googleOauthToken = action.payload
        },
        setUserFavoriteCompanies: (state, action: PayloadAction<IUserFavoriteCompany[]>) => {
            state.userFavoriteCompanies = action.payload
        }
    }
})

export const {
    setCompanyLoading: setCompanyLoading,
    changeValuesAsMillions: changeValuesAsMillions,
    changeLogarithmicScale: changeLogarithmicScale,
    setCompanies: setCompanies,
    setIdToCompany: setIdToCompany,
    setGoogleOauthToken: setGoogleOauthToken,
    setUserFavoriteCompanies: setUserFavoriteCompanies
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer