// @Post()
// async create(/*@Body() createProductDto: CreateProductDto*/) {
//   data1.filterModel.listDefault.list.forEach(async (e) => {
//     const product = await this.productService.create(e);

//     // get attr of product
//     const attributeSpecItemData = data1.filterModel.attributeSpecItems.filter(
//       (attr) => e.id === attr.productID,
//     );

//     attributeSpecItemData.forEach(async (attr) => {
//       const newAttr = { ...attr, productID: product };
//       await this.attributeSpecItemService.create(newAttr);
//     });

//     //get promotion of products
//     const promotions = data1.filterModel.promotionItems.filter(
//       (promotion) => promotion.sku === e.productVariant.sku,
//     );

//     promotions.forEach(async (promotion) => {
//       const newPromo = { ...promotion, productID: product };
//       await this.promotionItemService.create(newPromo);
//     });
//   });

//   data1.filterModel.navFilterAttributeItem.attributeItems.forEach(
//     async (attr) => {
//       const attributeItem = await this.attributeItemService.create(attr);

//       // get spec items of attribute
//       const specItemsData =
//         data1.filterModel.navFilterAttributeItem.specItems.filter(
//           (specItem) => {
//             return specItem.attributeID === attr.id;
//           },
//         );

//       // insert spec item to database
//       specItemsData.forEach(async (specItem) => {
//         const newSpecItem = {
//           ...specItem,
//           attributeID: attributeItem,
//         };
//         this.specItemService.create(newSpecItem);
//       });
//     },
//   );

//   // insert category
//   const parentCategoryInit = {
//     name: 'Hãng sản xuất',
//     nameAscii: 'hang-san-xuat',
//     parentID: new Types.ObjectId(),
//     order: 1,
//     isShowInTab: true,
//     isShowInNavFilter: true,
//     imageCateUrl: '',
//     shareImageUrl: '',
//   };

//   const parentCategory = await this.categoryService.create(
//     parentCategoryInit,
//   );

//   const categories = data1.filterModel.navFilter.listCategory.filter(
//     (e) => e.parentID === 299,
//   );

//   categories.forEach(async (e) => {
//     const newCategory = {
//       ...e,
//       parentID: parentCategory._id,
//     };
//     await this.categoryService.create(newCategory);
//   });
//   return 'insert data success';
// }
