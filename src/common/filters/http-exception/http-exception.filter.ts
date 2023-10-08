import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;
    const errorResponse = {
      data: null,
      message: message || '请求出错',
      code: exception.getStatus() || 500, // 自定义code
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 这里可以根据需要将日志记录到日志文件、数据库等
    let errorLogs =
      `


     ---------------------------------------------------------------------------------
     Request URL: ${ctx.getRequest().path}
     Request Time: ${new Date()}
     Status Code: ${status}
     Content: ${exception.stack}
     ---------------------------------------------------------------------------------


    `
    this.logger.log(errorLogs)
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
