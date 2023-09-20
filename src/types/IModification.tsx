export default interface IModification {
    Id: string,
    CompanyId: number,
    UserId: string,
    DataHash: string,
    CreationTime: string,
    ModificationType: number,
    ModificationStatus: number,
    DiscardReason: string
}