import { Image } from './image';
import { ResourceList } from './resource-list';

export interface Comic {
  id?: number;
  title?: string;
  description?: string;
  format?: string;
  resourceURI?: string;
  thumbnail?: Image;
  characters?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
}
