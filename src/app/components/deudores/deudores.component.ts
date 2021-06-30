import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deudor } from '../../models/deudor';
import { DeudoresService } from '../../services/deudores.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {

  Titulo = 'Deudores';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };
  
  FormRegistro: FormGroup;
  submitted = false;

  AccionABMC = 'L';
  Items: Deudor[] = null;

  OpcionesIncobrable = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' }
  ];

  constructor(public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private deudoresService: DeudoresService) { }

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      DeudorId: [0],
      DeudorApeNom: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      DeudorMonto: [null, [Validators.required, Validators.pattern('[0-9]{1,7}')]],
      DeudorIncobrable: [
        '',
        [
          Validators.required
        ]
      ]
    });

    this.Buscar();
  }

  Buscar() {
    this.deudoresService.get().subscribe((res: any) => {
      this.Items = res;
      this.AccionABMC = 'L';
    });
  }

  Agregar(){
    this.AccionABMC = 'A';
  }

  Grabar(){
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }
    const itemCopy = { ...this.FormRegistro.value };

    this.deudoresService
      .post(itemCopy)
      .subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
  }

  Volver(){
    this.AccionABMC = 'L';
    this.FormRegistro.reset();
  }

}