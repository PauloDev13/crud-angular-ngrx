import { AssociateModel } from '../model/associate.model';

export const associateState: AssociateModel = {
  list: [],
  errorMessage: '',
  associateObject: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'COSTUMER',
    address: '',
    associateGroup: 'level1',
    status: true,
  },
};
