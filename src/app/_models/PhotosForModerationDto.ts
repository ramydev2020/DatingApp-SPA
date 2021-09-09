export interface PhotosForModerationDto {
    Id: number;
    UserName: string;
    Url: string;
    IsApproved: boolean;
  }
  export class ResponsePhotosResult<T> {
    result: T;
    PhotosForModerationDto: PhotosForModerationDto;
}
