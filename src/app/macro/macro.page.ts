import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MacroService } from '../api/macro.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {
  currentTeam: any = JSON.parse(localStorage.getItem('t'));
  currentPlanning: any = JSON.parse(localStorage.getItem('p'));
  macros: any[] = [];
  materialMacro: any[] = [];
  macroForm = new FormGroup({
    macro: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: MacroService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.showMacro();
    this.getMaterialMacro();
  }
  showMacro() {
    this.service.getMacro().subscribe(data => {
      let macro = [...data];
      let ma = macro.filter(m => {
        if (m.id_planning === this.currentPlanning.id) {
          return m;
        }
      });
      this.macros = [...ma];
    })
  }
  onMicro(m: any) {
    // this.router.navigate(['/micro']);
  }
  getMaterialMacro() {
    this.service.getMaterialMacro().subscribe(data => {
      this.materialMacro = [...data];
    })
  }
  onSubmit(e: any) {
    if (this.macroForm.valid) {
      let macro = {
        macro: this.macroForm.value.macro,
        dateInit: this.macroForm.value.dateInit,
        dateFinish: this.macroForm.value.dateFinish,
        material: this.macroForm.value.material,
        idPlanning: this.currentPlanning.id
      }
      localStorage.setItem("ma", JSON.stringify({ macro: this.macroForm.value.macro, material: this.macroForm.value.material, idPlanning: this.macroForm.value.idPlanning }));
      this.service.insertMacro(macro).subscribe();
      setTimeout(() => {
        this.showMacro();
      }, 1000);
    } else {
      this.toast("Todos los campos deven ser rellenados");
    }
  }
  async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

}
