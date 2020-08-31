import { ResourceList } from './resource-list';
import { Image } from './image';

export interface Story {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  thumbnail?: Image;
  comics?: ResourceList;
  series?: ResourceList;
  events?: ResourceList;
  characters?: ResourceList;
}
