import { Image } from './image';
import { ResourceList } from './resource-list';

export interface Character {
  id?: number;
  name?: string;
  description?: string;
  thumbnail?: Image;
  resourceURI?: string;
  comics?: ResourceList;
  series?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
}
