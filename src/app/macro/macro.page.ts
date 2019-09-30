import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MacroService } from '../api/macro.service';
import { ToastController } from '@ionic/angular';
import { PlanningService } from '../api/planning.service';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {
  material: any[] = [];
  macros: any[] = [];
  teamName = JSON.parse(localStorage.getItem('t'));
  planningName: string;
  idPlanning = this.activatedRoute.snapshot.paramMap.get('id');
  macroForm = new FormGroup({
    name: new FormControl("", Validators.required),
    dataInit: new FormControl("", Validators.required),
    dataFinish: new FormControl("", Validators.required),
    material: new FormControl("")
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _serviceMacro: MacroService,
    public _servicePlanning: PlanningService,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.showMacro();
    this.onlyPlanning();
    this.materialMacro();
  }
  onlyPlanning(){
    this._servicePlanning.onlyPlanning(this.idPlanning).subscribe(data => {
      this.planningName = data.planning;
    })
  }
   showMacro(){
    this._serviceMacro.getMacro().subscribe(data => {
      let macro = [...data];
      let ma = macro.filter(m => {
        if(m.id_planning === this.idPlanning){
          return m
        }
      });
      this.macros = ma;
    });
  }
  
  materialMacro() {
    this._serviceMacro.getMaterialMacro().subscribe(data => {
      this.material = [...data];
    });
  }
  onMicro(macro: any){
    let id = macro.id_planning;
    let macroName = macro.macro;
    console.log(macro)
    localStorage.setItem('ma', macroName);
    this.router.navigate(['/micro', id]);
  }
  onSubmit(e: any) {
    if (this.macroForm.valid) {
      let macro = {
        macro: this.macroForm.value.name,
        dateInit: this.macroForm.value.dataInit,
        dateFinish: this.macroForm.value.dataFinish,
        material: this.macroForm.value.material,
        idPlanning: this.idPlanning
      };
      this._serviceMacro.insertMacro(macro).subscribe();
      setTimeout(() => {
        this.showMacro();
      }, 1000);
      this.macroForm.reset();
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
