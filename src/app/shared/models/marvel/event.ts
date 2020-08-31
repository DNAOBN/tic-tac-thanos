import { Image } from './image';
import { ResourceList } from './resource-list';

export interface Event {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  thumbnail?: Image;
  comics?: ResourceList;
  stories?: ResourceList;
  series?: ResourceList;
  characters?: ResourceList;
}
