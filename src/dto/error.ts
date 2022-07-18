export class ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export class DbConcurrencyError implements ErrorResponse {
  constructor(public message: string, public status: number) {}
}

export class InternalServerError implements ErrorResponse {
  constructor(public message: string, public status: number) {}
}
