import { FavoriteBorder, Favorite } from "@mui/icons-material"
import { Checkbox } from "@mui/material"
import { IGeneral, setUserFavoriteCompanies } from "src/features/general"
import { useAppSelector, useAppDispatch } from "src/hooks"
import ICompanyData from "src/types/ICompanyData"

const FavoriteCompanyCheckbox = ({data}:{data: ICompanyData}) => {
    const userFavoriteCompanies = useAppSelector((state: { general: IGeneral }) => state.general.userFavoriteCompanies)
    const dispatch = useAppDispatch()
    const bearerToken = useAppSelector((state: { general: IGeneral }) => state.general.googleOauthToken)

    if (bearerToken !== null) {
        return ( 
            <Checkbox 
                icon={<FavoriteBorder />} 
                checkedIcon={<Favorite />} 
                checked={userFavoriteCompanies !== null && userFavoriteCompanies.some(item => item.CompanyId == data.id)}
                onChange={async(ev) => {
                    if (!ev.target.checked) {
                        const id = userFavoriteCompanies?.find(e => e.CompanyId == data.id)?.Id

                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}UsersFavoriteCompanies/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${bearerToken}`
                            }
                        })

                        if (response.ok) {
                            let newUserFavoriteCompanies = userFavoriteCompanies ? [...userFavoriteCompanies] : []
                            newUserFavoriteCompanies = newUserFavoriteCompanies.filter(entity => entity.CompanyId !== data.id)

                            dispatch(setUserFavoriteCompanies(newUserFavoriteCompanies))
                        }
                    }
                    else {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}UsersFavoriteCompanies/`, {
                            method: 'POST', 
                            body: JSON.stringify({
                                'CompanyId': data.id
                            }),
                            headers: {
                                'Authorization': `Bearer ${bearerToken}`,
                                'Content-Type': 'application/json'
                            }
                        })

                        const newEntity = JSON.parse(await response.json())

                        const newUserFavoriteCompanies = userFavoriteCompanies ? [...userFavoriteCompanies] : []
                        newUserFavoriteCompanies.push(newEntity)

                        dispatch(setUserFavoriteCompanies(newUserFavoriteCompanies))
                    }
                }}
            />
        )
    }

    return null
}

export default FavoriteCompanyCheckbox