export interface IUserService {
  updateLocation(lat: number, lng: number): Promise<void>;
  registerFcmToken(fcmToken: string, deviceModel?: string): Promise<void>;
}
