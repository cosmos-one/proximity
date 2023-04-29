import { UserType } from "./userType";
import { PermissionType } from "./permissionType";

export interface AssetType {
  id: string;
  file: string;
  fileData: Buffer;
  heroImage: Buffer;
  meta: AssetMetaType;
}

interface AssetMetaType {
  body: AssetBodyType;
  name: string;
  type: string;
  version: string;
}

interface AssetBodyType {
  id: string;
  createdAt: string;
  lastModified: string;
  name: string;
  notes: string;
  source: string;
  type: string;
}

//Asset format inside Collection Content
interface AssetContentType {
  id: string;
  file: string;
  heroImage: string;
  createdAt: string;
  lastModified: string;
  name: string;
  notes: string;
  source: string;
  type: string;
}

export interface AssetTypeCell extends AssetType {
    isFrozen: boolean;
}
