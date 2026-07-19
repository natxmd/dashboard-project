export interface IServiceContent {
  subtitle: string;
  description: string;
  targetAudience: string[];
  workTopics: string[];
  buttonText: string;
  icon: string;
  color: string;
}

export interface IService {
  id: string;
  type: string;
  name: string;
  price: number;
  active: boolean;
  content: IServiceContent;
}

export interface ICreateServiceRequest {
  type: string;
  name: string;
  price: number;
  active: boolean;
  content: IServiceContent;
}

export interface IUpdateServiceRequest {
  name: string;
  price: number;
  active: boolean;
  content: IServiceContent;
}

export interface IGetServicesResponse {
  message: string;
  data: IService[];
}

export interface IServiceMutationResponse {
  message?: string;
  data?: IService;
}

export interface IServiceForm {
  type: string;
  name: string;
  price: number;
  active: boolean;
  subtitle: string;
  description: string;
  targetAudience: string[];
  workTopics: string[];
  buttonText: string;
  icon: string;
  color: string;
}