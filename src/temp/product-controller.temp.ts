// @Post()
//   create(/*@Body() createProductDto: CreateProductDto*/) {
//     data1.filterModel.listDefault.list.forEach(async (e) => {
//       const product = await this.productService.create(e);

//       // get attr of product
//       const attributeSpecItemData = data1.filterModel.attributeSpecItems.filter(
//         (attr) => e.id === attr.productID,
//       );

//       attributeSpecItemData.forEach(async (attr) => {
//         const newAttr = { ...attr, productID: product };
//         await this.attributeSpecItemService.create(newAttr);
//       });

//       //get promotion of products
//       const promotions = data1.filterModel.promotionItems.filter(
//         (promotion) => promotion.sku === e.productVariant.sku,
//       );

//       promotions.forEach(async (promotion) => {
//         const newPromo = { ...promotion, productID: product };
//         await this.promotionItemService.create(newPromo);
//       });
//     });

//     data2.filterModel.listDefault.list.forEach(async (e) => {
//       const product = await this.productService.create(e);

//       // get attr of product
//       const attributeSpecItemData = data2.filterModel.attributeSpecItems.filter(
//         (attr) => e.id === attr.productID,
//       );

//       attributeSpecItemData.forEach(async (attr) => {
//         const newAttr = { ...attr, productID: product };
//         await this.attributeSpecItemService.create(newAttr);
//       });

//       //get promotion of products
//       const promotions = data2.filterModel.promotionItems.filter(
//         (promotion) => promotion.sku === e.productVariant.sku,
//       );

//       promotions.forEach(async (promotion) => {
//         const newPromo = { ...promotion, productID: product };
//         await this.promotionItemService.create(newPromo);
//       });
//     });

//     data3.filterModel.listDefault.list.forEach(async (e) => {
//       const product = await this.productService.create(e);

//       // get attr of product
//       const attributeSpecItemData = data3.filterModel.attributeSpecItems.filter(
//         (attr) => e.id === attr.productID,
//       );

//       attributeSpecItemData.forEach(async (attr) => {
//         const newAttr = { ...attr, productID: product };
//         await this.attributeSpecItemService.create(newAttr);
//       });

//       //get promotion of products
//       const promotions = data3.filterModel.promotionItems.filter(
//         (promotion) => promotion.sku === e.productVariant.sku,
//       );

//       promotions.forEach(async (promotion) => {
//         const newPromo = { ...promotion, productID: product };
//         await this.promotionItemService.create(newPromo);
//       });
//     });

//     data4.filterModel.listDefault.list.forEach(async (e) => {
//       const product = await this.productService.create(e);

//       // get attr of product
//       const attributeSpecItemData = data4.filterModel.attributeSpecItems.filter(
//         (attr) => e.id === attr.productID,
//       );

//       attributeSpecItemData.forEach(async (attr) => {
//         const newAttr = { ...attr, productID: product };
//         await this.attributeSpecItemService.create(newAttr);
//       });

//       //get promotion of products
//       const promotions = data4.filterModel.promotionItems.filter(
//         (promotion) => promotion.sku === e.productVariant.sku,
//       );

//       promotions.forEach(async (promotion) => {
//         const newPromo = { ...promotion, productID: product };
//         await this.promotionItemService.create(newPromo);
//       });
//     });

//     return;
//   }
