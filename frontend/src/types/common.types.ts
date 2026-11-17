export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export type NotificationColor = 'green' | 'red' | 'blue' | 'orange' | string;
