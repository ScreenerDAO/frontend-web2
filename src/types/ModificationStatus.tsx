interface Type {
    [key: number]: string
}

const ModificationStatus: Type = {
    0: "Accepted",
    1: "Discarded",
    2: "Pending",
    3: "Rejected"
}

export default ModificationStatus