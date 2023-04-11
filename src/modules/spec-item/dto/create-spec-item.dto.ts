import { AttributeItem } from 'src/modules/attribute-item/entities/attribute-item.entity';

export class CreateSpecItemDto {
  attrCusGroupLevelOrder: number;
  displayOrder: number;
  name: string;
  nameAscii: string;
  attrCusGroupName: string;
  attrCusGroupNameAscii: string;
  attributeID: AttributeItem;
}
