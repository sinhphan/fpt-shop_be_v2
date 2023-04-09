import { Request } from 'express';
import { QueryParseType } from '../types/query-parse.type';
import { APP_CONFIG } from 'src/config/app.config';

export const queryParse = (req: Request): QueryParseType => {
  const pageTemp = req.query.page;
  const isPage = pageTemp && Number.isInteger(+pageTemp) && +pageTemp > 0;
  const page = isPage ? +pageTemp : 1;

  return {
    pagination: {
      limit: APP_CONFIG.queryLimit,
      page: page,
    },
  };
};
