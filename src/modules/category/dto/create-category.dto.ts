import { Types } from 'mongoose';

export class CreateCategoryDto {
  name: string;
  nameAscii: string;
  imageCateUrl: string;
  shareImageUrl: string;
  parentID: Types.ObjectId;
  order: number;
  isShowInTab: boolean;
  isShowInNavFilter: boolean;
}
