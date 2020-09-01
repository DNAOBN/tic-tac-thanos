import { Character } from './character';
import { Event } from './event';
import { Series } from './series';
import { Story } from './story';

export interface DefaultResponse {
  code?: number;
  status?: string;
  data?: {
    total?: number;
    count?: number;
    results?: (Character | Event | Series | Story)[];
  };
}
