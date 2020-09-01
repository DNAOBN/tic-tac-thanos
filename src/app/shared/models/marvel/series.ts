import { Image } from './image';
import { ResourceList } from './resource-list';

export interface Series {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  thumbnail?: Image;
  comics?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
  characters?: ResourceList;
}
