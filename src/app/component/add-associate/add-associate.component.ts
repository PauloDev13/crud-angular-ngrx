import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  addAssociate,
  updateAssociate,
} from '../../store/associate/associate.action';
import { selectAssociate } from '../../store/associate/associate.selectors';
import { Associate } from '../../store/model/associate.model';

type typeDialogData = {
  title: string;
};

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css'],
})
export class AddAssociateComponent implements OnInit {
  title = 'Create Associate';
  isEdit = false;
  dialogData!: typeDialogData;

  associateForm = this.formBuilder.group({
    id: this.formBuilder.control(0, Validators.required),
    name: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control(
      '',
      Validators.compose([Validators.required, Validators.email]),
    ),
    phone: this.formBuilder.control('', Validators.required),
    address: this.formBuilder.control('', Validators.required),
    type: this.formBuilder.control('COSTUMER'),
    group: this.formBuilder.control('level1'),
    status: this.formBuilder.control(true),
  });

  constructor(
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<AddAssociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: typeDialogData,
    private store: Store,
  ) {}

  closePopup() {
    this.ref.close();
  }

  saveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        associateGroup: this.associateForm.value.group as string,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean,
      };

      if (_obj.id === 0) {
        this.store.dispatch(addAssociate({ inputData: _obj }));
      } else {
        this.store.dispatch(updateAssociate({ inputData: _obj }));
      }
      this.closePopup();
    }
  }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.data.title;
    const selectedItems$ = this.store.select(selectAssociate);
    selectedItems$.subscribe({
      next: value => {
        this.associateForm.patchValue({
          id: value.id,
          name: value.name,
          email: value.email,
          phone: value.phone,
          address: value.address,
          type: value.type,
          group: value.associateGroup,
          status: value.status,
        });
      },
    });
  }
}
