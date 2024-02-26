import { UserType } from "./userType";
import { PermissionType } from "./permissionType";

export interface AssetType {
  id: string;
  path: string;
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
  path: string;
  data: AssetType
}

export interface AssetTypeCell extends AssetType {
    isFrozen: boolean;
}
