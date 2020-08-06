import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  // Los formularios reactivos a diferencias de los template,
  //se los trabaja directamante en el componente TS

  // Creando una instancia de FormGroup
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.initFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {}

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellidoNoValido() {
    return (
      this.form.get('apellido').invalid && this.form.get('apellido').touched
    );
  }
  get correoNoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get usuarioNoValido() {
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  get distritoNoValido() {
    return (
      this.form.get('direccion.distrito').invalid &&
      this.form.get('direccion.distrito').touched
    );
  }
  get ciudadNoValido() {
    return (
      this.form.get('direccion.ciudad').invalid &&
      this.form.get('direccion.ciudad').touched
    );
  }
  get pass1NoValido() {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }
  get pass2NoValido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  get pasatiemposArray() {
    return this.form.get('pasatiempos') as FormArray;
  }

  initFormulario() {
    // .group recibe un objeto, (tipo modelo de los campos del formulario)
    this.form = this.formBuilder.group(
      {
        // en cada propiedad se define un []
        // el primer parametro es el VALOR, el segundo paramtro es VALIDACIONES SINCRONAS y el tercero es VALIDACIONES ASINCRONAS
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        usuario: ['', , this.validadores.existeUsuarioAsincrono],
        direccion: this.formBuilder.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.formBuilder.array([]),
      },
      {
        validators: this.validadores.passwordsIguales('pass1', 'pass2'),
      }
    );
  }

  agregarPasatiempo() {
    this.pasatiemposArray.push(
      this.formBuilder.control('' /*Validators.required*/)
    );
  }
  borrarPasatiempo(index: number) {
    this.pasatiemposArray.removeAt(index);
  }

  cargarDataAlFormulario() {
    // setValue --> OBLIGATORIO MANDAR TODOS LOS CAMPOS, SINO ERROR
    // si se desea enviar solo algunos se puede usar el reset
    // this.form.setValue({
    this.form.reset({
      nombre: 'Juann',
      apellido: 'Perez',
      correo: 'juan@gmail.com',
      direccion: {
        distrito: 'ontario',
        ciudad: 'otagua',
      },
    });
  }

  crearListeners() {
    // this.form.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });
    this.form.get('nombre').valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    console.log(this.form.value);
    this.form.reset();
    // Tambien se puede setear valores en el reset
    // tal como en el setValue, a diferencia que aqui no es obligatorio mandar todos los campos
  }
}
