import AppError from "./appError";

export default class NotFoundError extends AppError {
  constructor(error?: string) {
    super(error ?? "Resource not found", 404);
  }
}