export const DbConfig = {
    name: "TripDb",
    version: 1,
    objectStoresMeta: [
        {
            store: "trips",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "name", keypath: "name", options: { unique: false } },
                { name: "destination", keypath: "destination", options: { unique: false } },
                { name: "date", keypath: "date", options: { unique: false } },
                { name: "description", keypath: "description", options: { unique: false } },
                { name: "duration", keypath: "duration", options: { unique: false } },
                { name: "riskAssessment", keypath: "riskAssessment", options: { unique: false } },
            ]
        },
        {
            store: "expenses",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "type", keypath: "type", options: { unique: false } },
                { name: "amount", keypath: "amount", options: { unique: false } },
                { name: "date", keypath: "date", options: { unique: false } },
                { name: "comment", keypath: "comment", options: { unique: false } },
                { name: "tripId", keypath: "tripId", options: { unique: false } },
            ]
        },
    ]
}