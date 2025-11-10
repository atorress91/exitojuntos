export class CreateChannelResponse {
  public data?: ChannelData;
  public statusCode: number;
  public idTypeStatusCode: number;
  public message?: string;
}

export class ChannelData {
  public id: number;
  public idExternalIdentification: number;
  public tagName?: string;
  public currency?: Currency;
  public address?: string;
}

export class Currency {
  public id: number;
  public name?: string;
  public code?: string;
}
