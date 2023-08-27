export interface Associate {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  associateGroup: string;
  status: boolean;
}

export interface AssociateModel {
  list: Associate[];
  associateObject: Associate;
  errorMessage: string;
}
