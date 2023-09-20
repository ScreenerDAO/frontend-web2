interface IModificationType {
    [key: number]: string
}

const ModificationTypes: IModificationType = {
    0: "Add",
    1: "Update"
}

export default ModificationTypes