export interface CollectionType {
    // define the properties of `collection` object
    id: string;
    name: string;
    createdBy: string;
    lastModified: string;
    status: boolean;
}

export interface CollectionTypeExtended extends CollectionType {
    collectionX: number;
    collectionY: number;
    description: string;
    content: any[][];
    layouts: CollectionLayoutType[];
    createdAt: string;
    user: UserType;
    gate: GateType;
    userPermissions: UserPermissionType[];
}

export interface CollectionFolderType {
    id: string;
    name: string;
    collections: [{
        id: string;
        collectionId: string;
        collection: CollectionType;
    }];
}

export interface CollectionLayoutType {
    id: string;
    name: string;
    layout: any[][];
    default: boolean;
    createdBy: string;
    createdAt: string;
    user: UserType;
}