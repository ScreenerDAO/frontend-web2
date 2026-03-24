import * as React from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import ICompanyData from 'src/types/ICompanyData';
// import { Alert, Step, StepContent, StepLabel, Stepper } from '@mui/material';

// // import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
// import { setCompanyData } from 'src/features/companyDataSlice';
// import { IGeneral } from 'src/features/general';
// import { useMutation } from 'react-query';

// const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
// const registriesContractAddress = process.env.NEXT_PUBLIC_REGISTRIES_CONTRACT_ADDRESS
// const registriesContractABI = process.env.NEXT_PUBLIC_REGISTRIES_CONTRACT_ABI
// const backendEndpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT
// const azureFunctionsEndpoint = process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_ENDPOINT

// interface ISaveDataModalProps {
//     handleClose: () => void
// }

// const SaveDataModal = (props: ISaveDataModalProps) => {
//     const [errors, setErrors] = React.useState<React.ReactElement[] | null>(null)
//     const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

//     React.useEffect(() => {
//         const callback = async () => {
//             const localErrors: React.ReactElement[] = []

//             if (!newCompanyData.Name || newCompanyData.Name == "") {
//                 localErrors.push(<Alert key="1" severity='error' style={{ marginBottom: '10px' }}>Company name must be set</Alert>)
//             }

//             if (!newCompanyData.IsDelisted && (!newCompanyData.Ticker || newCompanyData.Ticker == "")) {
//                 localErrors.push(<Alert key="2" severity='error' style={{ marginBottom: '10px' }}>Company ticker must be set</Alert>)
//             }

//             if (!newCompanyData.Country || newCompanyData.Country == "") {
//                 localErrors.push(<Alert key="3" severity='error' style={{ marginBottom: '10px' }}>Company country must be set</Alert>)
//             }

//             if (!newCompanyData.Currency || newCompanyData.Country == "") {
//                 localErrors.push(<Alert key="4" severity='error' style={{marginBottom: '10px'}}>Company currency must be set</Alert>)
//             }

//             // if (newCompanyData.financialStatements == undefined || getYearsArray(newCompanyData.financialStatements).length == 0) {
//             //     localErrors.push(<Alert key="4" severity='warning' style={{ marginBottom: '10px' }}>Company doesn't have any financials</Alert>)
//             // }

//             setErrors(localErrors)
//         }

//         callback()
//     }, [newCompanyData])

//     return (
//         <Dialog
//             open={true}
//             onClose={props.handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//         >
//             <DialogTitle id="alert-dialog-title">Saving data...</DialogTitle>

//             <DialogContent>
//                 {(errors == null || errors!.length > 0) ?
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                         {<>{errors}</>}
//                     </Box>
//                     :
//                     <SaveDataStepper newCompanyData={newCompanyData} />
//                 }
//             </DialogContent>

//             <DialogActions>
//                 <Button onClick={props.handleClose} autoFocus>Close</Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

// interface ISaveDataStepperState {
//     activeStep: number
//     cid: string
// }

// const SaveDataStepper = ({newCompanyData}: { newCompanyData: ICompanyData }) => {
//     const [state, setState] = React.useState<ISaveDataStepperState>({
//         activeStep: 0,
//         cid: ""
//     })

//     return (
//         <>
//             <Stepper activeStep={state.activeStep} orientation="vertical">
//                 <Step key='Saving data on Filecoin network'>
//                     <StepLabel>Saving data on Filecoin network</StepLabel>

//                     <StepContent>
//                         <SaveDataToFilecoinStep
//                             newCompanyData={newCompanyData}
//                             state={state}
//                             setState={(newState: ISaveDataStepperState) => setState(newState)}
//                         />
//                     </StepContent>
//                 </Step>

//                 <Step key='Updating company status on Ethereum network'>
//                     <StepLabel>Updating company status on Ethereum network</StepLabel>

//                     <StepContent>
//                         <SaveDataBackend cid={state.cid} setState={setState} />
//                         {/* <SaveDataToEthereumStep cid={state.cid} setState={setState} /> */}
//                     </StepContent>
//                 </Step>
//             </Stepper>

//             {state.activeStep == 2 &&
//                 <Alert severity="success" sx={{ marginTop: '20px' }}>Company successfully saved!</Alert>
//             }
//         </>
//     )
// }

// const SaveDataToFilecoinStep = ({newCompanyData, state, setState}: {
//     newCompanyData: ICompanyData
//     state: ISaveDataStepperState
//     setState: (newState: ISaveDataStepperState) => void
// }) => {
//     const [error, setError] = React.useState(false)

//     React.useEffect(() => {
//         const callback = async() => {
//             // const response = await fetch(`${azureFunctionsEndpoint}/SaveCompanyData`, {
//             //     method: 'POST',
//             //     headers: {
//             //         'Content-Type': 'application/json',
//             //     },
//             //     body: JSON.stringify(newCompanyData) 
//             // })

//             const formData = new FormData()
//             formData.append('file', new Blob([JSON.stringify(newCompanyData)]))

//             const response = await fetch(`${backendEndpoint}/Files`, {
//                 method: 'POST',
//                 body: formData
//             })

//             if (response.ok) {
//                 setState({
//                     activeStep: 1,
//                     cid: await response.text()
//                 })
//             }
//             else {
//                 setError(true)
//             }
//         }

//         if (state.activeStep === 0) {
//             callback()
//         }
//     }, [state.activeStep])

//     if (error) {
//         return <ErrorSavingFilecoin retry={() => {
//             setState({...state, })
//             setError(false)
//         }} />
//     }

//     return <StepSpinner />
// }

// const ErrorSavingFilecoin = ({retry}: {retry: () => void}) => {
//     return (
//         <>
//             <Alert severity='error' style={{ marginBottom: '10px' }}>Error saving company data!</Alert>
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <Button variant='contained' onClick={retry}>Try again</Button>
//             </div>
//         </>
//     )
// }

// // const SaveDataToEthereumStep = (props: {
// //     cid: string,
// //     setState: React.Dispatch<React.SetStateAction<{
// //         activeStep: number;
// //         cid: string;
// //     }>>
// // }) => {
// //     const companyId = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.Id)
// //     const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.Name)
// //     const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.Ticker)
// //     const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

// //     const dispatch = useAppDispatch()
// //     const { isConnected } = useAccount()
// //     const { chain } = useNetwork()
// //     const {
// //         config,
// //         error: prepareError,
// //         isError: isPrepareError
// //     } = usePrepareContractWrite({
// //         address: registriesContractAddress as any,
// //         abi: JSON.parse(registriesContractABI ?? ""),
// //         functionName: companyId ? 'editCompanyData' : 'addNewCompany',
// //         args: companyId ? [companyId, props.cid] : [companyName, companyTicker, props.cid],
// //         overrides: {
// //             gasLimit: 100000
// //         }
// //     })
// //     const { data, error, isError, write } = useContractWrite(config)
// //     const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

// //     const calledOnce = React.useRef(false)

// //     React.useEffect(() => {
// //         if (!(!write || isLoading)) {
// //             if (calledOnce.current) return

// //             if (!isConnected || chain?.id != chainId || (isPrepareError || isError)) return

// //             calledOnce.current = true

// //             write?.()
// //         }
// //     }, [isConnected, chain, isPrepareError, isError, write, isLoading])

// //     React.useEffect(() => {
// //         if (isSuccess) {
// //             props.setState(prevState => ({
// //                 ...prevState,
// //                 activeStep: 2
// //             }))

// //             dispatch(setCompanyData(newCompanyData))
// //         }
// //     }, [isSuccess])

// //     // if (!isConnected) {
// //     //     return <WalletNotConnected />
// //     // }

// //     if (chain?.id != chainId) {
// //         return <WrongChain />
// //     }

// //     if (isPrepareError || isError) {
// //         return (
// //             <>
// //                 <Alert severity='error' style={{ marginBottom: '10px' }}>{(prepareError || error)?.message}</Alert>
// //                 <div style={{ display: 'flex', justifyContent: 'center' }}>
// //                     <Button variant='contained' onClick={() => write?.()}>Try again</Button>
// //                 </div>
// //             </>
// //         )
// //     }

// //     return <StepSpinner />
// // }

// const SaveDataBackend = (props: {
//     cid: string,
//     setState: React.Dispatch<React.SetStateAction<{
//         activeStep: number;
//         cid: string;
//     }>>
// }) => {
//     const companyId = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.Id)
//     const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)
//     const bearerToken = useAppSelector((state: { general: IGeneral }) => state.general.googleOauthToken)

//     const dispatch = useAppDispatch()

//     const calledOnce = React.useRef(false)

//     const mutationAddCompany = useMutation({
//         mutationFn: () => {
//             calledOnce.current = true

//             return fetch(`${backendEndpoint}Modifications`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${bearerToken}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     DataHash: props.cid
//                 })
//             })
//         },
//     })

//     const mutationUpdateCompany = useMutation({
//         mutationFn: () => {
//             calledOnce.current = true

//             const body = JSON.stringify({
//                 DataHash: props.cid,
//                 CompanyId: companyId
//             })

//             return fetch(`${backendEndpoint}Modifications`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${bearerToken}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: body
//             })
//         }
//     })

//     React.useEffect(() => {
//         if (calledOnce.current == false && bearerToken && bearerToken !== "") {
//             console.log(companyId)

//             if (companyId){
//                 mutationUpdateCompany.mutate()
//             }
//             else{
//                 mutationAddCompany.mutate()
//             }
//         }
//     }, [])

//     React.useEffect(() => {
//         if (
//                 (mutationAddCompany.isSuccess && mutationAddCompany?.data?.status === 200)
//                 ||
//                 (mutationUpdateCompany.isSuccess && mutationUpdateCompany?.data?.status === 200)
//             ) {
//             props.setState(prevState => ({
//                 ...prevState,
//                 activeStep: 2
//             }))

//             dispatch(setCompanyData(newCompanyData))
//         }
//     }, [mutationAddCompany.isSuccess, mutationUpdateCompany])

//     if (
//         (mutationAddCompany.isError || (mutationAddCompany.isSuccess && mutationAddCompany?.data?.status !== 200))
//         ||
//         (mutationUpdateCompany.isError || (mutationUpdateCompany.isSuccess && mutationUpdateCompany?.data?.status !== 200))
//     ) {
//         return (
//             <>
//                 <Alert severity='error' style={{ marginBottom: '10px' }}>There was an error</Alert>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button variant='contained' onClick={() => companyId ? mutationAddCompany.mutate() : mutationUpdateCompany.mutate()}>Try again</Button>
//                 </div>
//             </>
//         )
//     }

//     return <StepSpinner />
// }

// // const WalletNotConnected = () => {
// //     return (
// //         <>
// //             <Alert severity='error' style={{ marginBottom: '10px' }}>Wallet not connected!</Alert>
// //             <div style={{ display: 'flex', justifyContent: 'center' }}>
// //                 <ConnectButton />
// //             </div>
// //         </>
// //     )
// // }

// // const WrongChain = () => {
// //     const { switchNetwork } = useSwitchNetwork({
// //         chainId: Number(chainId)
// //     })

// //     return (
// //         <>
// //             <Alert severity='error' style={{ marginBottom: '10px' }}>Wrong network!</Alert>
// //             <div style={{ display: 'flex', justifyContent: 'center' }}>
// //                 <Button variant='contained' onClick={() => switchNetwork?.()}>Switch network</Button>
// //             </div>
// //         </>
// //     )
// // }

// const StepSpinner = () => {
//     return (
//         <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: '10px'
//         }}>
//             <CircularProgress />
//         </Box>
//     )
// }

// export default SaveDataModal
