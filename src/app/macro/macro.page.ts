import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../api/team.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanningService } from '../api/planning.service';
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
    name: new FormControl('', Validators.required),
    dataInit: new FormControl('', Validators.required),
    dataFinish: new FormControl('', Validators.required),
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
    this.showMaterialMacro();
  }
  showMacro(){
    this.service.getMacro().subscribe(data => {
      this.macros = [...data]
    })
  }
  showMaterialMacro(){
    this.service.getMaterialMacro().subscribe(data => {
      this.materialMacro = [...data];
    })
  }
  onMicro(m: any){
    let macro = {
      macro: m.macro
    }
    localStorage.setItem("ma", JSON.stringify(macro));
    this.router.navigate(['/micro']);
  }
  
  onSubmit(e: any){
    if (this.macroForm.valid) {
      let macro = {
        macro: this.macroForm.value.name,
        dateInit: this.macroForm.value.dataInit,
        dateFinish: this.macroForm.value.dataFinish,
        material: this.macroForm.value.material,
        idPlanning: this.currentPlanning.id
      }
      this.service.insertMacro(macro).subscribe();
      setTimeout(() => {
        this.showMacro();
      }, 1000);
    }else {
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
