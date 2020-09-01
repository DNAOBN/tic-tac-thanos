import { Resource } from './resource';

export interface ResourceList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Resource[];
}
