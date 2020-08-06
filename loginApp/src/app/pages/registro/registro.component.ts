import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor...",
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(
      (respuesta) => {
        console.log(respuesta);
        form.resetForm();
        Swal.fire({
          allowOutsideClick: false,
          icon: "success",
          text: "Cuenta creada con exito.",
        });
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: "error",
          title: "Error al crear cuenta",
          text: err.error.error.message,
        });
      }
    );
  }
}
