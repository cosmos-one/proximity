import { UserType } from './userType';
import { PermissionType } from './permissionType';

export interface AssetType {
    id: string;
    file: string;
    name: string;
    type: string;
    heroImage: string;
    source: string;
    status: boolean;
    lastModified: string;
}

export interface AssetTypeExtended extends AssetType {
    notes: string | null;
    addedBy: string;
    createdAt: string;
    user: UserType;
    assetFolderId: string | null;
    collections: any[];
    userPermissions: PermissionType[]
    heroImage: string;
}

export interface AssetTypeCell extends AssetType {
    isFrozen: boolean;
}

export interface AssetFolderType {
    id: string;
    name: string;
    assets: [{
        id: string;
        assetId: string;
        asset: AssetTypeExtended;
    }];
}