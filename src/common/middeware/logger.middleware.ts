import { Inject, Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      // 这里可以根据需要将日志记录到日志文件、数据库等
      let message =
        `
       ---------------------------------------------------------------------------------
       Request URL: ${req.originalUrl}
       Request Time: ${new Date()}
       Status Code: ${statusCode}
       ---------------------------------------------------------------------------------
      `
      this.logger.log(message)
    });
    next();
  }
}
